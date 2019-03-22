import https from 'https';
import { DynamoDB } from 'aws-sdk';

const agent = new https.Agent({
  keepAlive: true,
});

const client = new DynamoDB.DocumentClient({
  httpOptions: {
    agent,
  },
});

export const getItem = (params: DynamoDB.DocumentClient.GetItemInput) =>
  new Promise<DynamoDB.DocumentClient.GetItemOutput>((resolve, reject) => {
    client.get(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

export const query = (params: DynamoDB.DocumentClient.QueryInput) =>
  new Promise<DynamoDB.DocumentClient.QueryOutput>((resolve, reject) => {
    client.query(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
