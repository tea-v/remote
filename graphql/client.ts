import AWS from 'aws-sdk';

let client;
if (process.env.NODE_ENV === 'production') {
  client = new AWS.DynamoDB.DocumentClient();
} else {
  client = new AWS.DynamoDB.DocumentClient({
    endpoint: 'http://localhost:8000',
    region: 'localhost',
  });
}

export default client;
