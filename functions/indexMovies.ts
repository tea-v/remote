import { DynamoDB, DynamoDBStreams } from 'aws-sdk';

import elasticsearch from ':clients/aws/elasticsearch';

const { unmarshall } = DynamoDB.Converter;

const index = 'movies';
const type = 'movie';

async function createIndexTemplate() {
  await elasticsearch.indices.putTemplate({
    body: {
      index_patterns: [index],
      mappings: {
        _doc: {
          properties: {
            title: {
              analyzer: 'autocomplete',
              type: 'text',
            },
          },
        },
      },
      settings: {
        analysis: {
          analyzer: {
            autocomplete: {
              filter: ['lowercase', 'autocomplete_filter'],
              tokenizer: 'standard',
              type: 'custom',
            },
          },
          filter: {
            autocomplete_filter: {
              max_gram: 20,
              min_gram: 1,
              type: 'edge_ngram',
            },
          },
        },
        number_of_shards: 1,
      },
    },
    create: true,
    name: index,
  });
}

async function processRecord({ dynamodb, eventName }: DynamoDBStreams.Record) {
  const { SequenceNumber, SizeBytes, StreamViewType, ...body } = unmarshall(
    dynamodb!.NewImage!
  );
  const { id } = body;
  switch (eventName) {
    case 'INSERT':
    case 'MODIFY':
      await elasticsearch.index({ body, id, index, type });
      break;
    case 'REMOVE':
      const exists = await elasticsearch.exists({ id, index, type });
      if (exists) {
        await elasticsearch.delete({ id, index, type });
      }
      break;
    default:
      throw new Error(`${eventName} is not a valid event`);
  }
}

export const handler = async (
  event: DynamoDBStreams.GetRecordsOutput,
  _context: unknown,
  callback: (error: Error | null, result: string | null) => any
) => {
  const { Records } = event;
  try {
    await createIndexTemplate();
    Records!.forEach(processRecord);
    callback(null, `Successfully processed ${Records!.length} records`);
  } catch (error) {
    callback(error, null);
  }
};
