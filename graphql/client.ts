import AWS from 'aws-sdk';

let client;
if (process.env.NODE_ENV === 'production') {
  client = new AWS.DynamoDB.DocumentClient();
} else {
  client = new AWS.DynamoDB.DocumentClient();
}

export default client;
