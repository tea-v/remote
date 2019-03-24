/* eslint-disable import/prefer-default-export */

import { DynamoDB, DynamoDBStreams } from 'aws-sdk';

import elasticsearch from ':clients/aws/elasticsearch';

const { unmarshall } = DynamoDB.Converter;

const index = 'movies';
const type = 'movie';

async function processRecord({ dynamodb, eventName }: DynamoDBStreams.Record) {
  if (dynamodb && dynamodb.NewImage) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { SequenceNumber, SizeBytes, StreamViewType, ...body } = unmarshall(
      dynamodb.NewImage
    );
    const { id } = body;
    switch (eventName) {
      case 'INSERT':
      case 'MODIFY':
        await elasticsearch.index({ body, id, index, type });
        break;
      case 'REMOVE':
        if (await elasticsearch.exists({ id, index, type })) {
          await elasticsearch.delete({ id, index, type });
        }
        break;
      default:
        throw new Error(`${eventName} is not a valid event`);
    }
  }
}

export const handler = async (
  event: DynamoDBStreams.GetRecordsOutput,
  _context: unknown,
  callback: (error: Error | null, result: string | null) => unknown
) => {
  const { Records } = event;
  if (Records) {
    try {
      Records.forEach(processRecord);
      callback(null, `Successfully processed ${Records.length} records`);
    } catch (error) {
      callback(error, null);
    }
  } else {
    callback(null, 'Stream contained no records');
  }
};
