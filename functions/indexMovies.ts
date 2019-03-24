/* eslint-disable import/prefer-default-export */

import { DynamoDB } from 'aws-sdk';
import { DynamoDBRecord, DynamoDBStreamHandler } from 'aws-lambda';

import elasticsearch from ':clients/aws/elasticsearch';

const { unmarshall } = DynamoDB.Converter;

const index = 'movies';
const type = 'movie';

async function processRecord({ dynamodb, eventName }: DynamoDBRecord) {
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

export const handler: DynamoDBStreamHandler = async ({ Records }) => {
  Records.forEach(processRecord);
};
