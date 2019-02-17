import AWS from 'aws-sdk';

const client = new AWS.DynamoDB.DocumentClient();

export const query = (params: AWS.DynamoDB.DocumentClient.QueryInput) =>
  new Promise<AWS.DynamoDB.DocumentClient.QueryOutput>((resolve, reject) => {
    client.query(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
