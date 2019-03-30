import https from 'https';
import { DynamoDB } from 'aws-sdk';

const agent = new https.Agent({
  keepAlive: true,
});

export default new DynamoDB.DocumentClient({
  httpOptions: {
    agent,
  },
});
