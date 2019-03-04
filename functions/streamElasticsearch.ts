import { pushStream } from 'dynamodb-stream-elasticsearch';

const { ELASTICSEARCH_ENDPOINT } = process.env;

export const handler = async (
  event: { [key: string]: any },
  _context: unknown,
  callback: (error: Error | null, result: string | null) => any
) => {
  try {
    pushStream({ event, endpoint: ELASTICSEARCH_ENDPOINT, refresh: false });
    callback(null, `Successfully processed ${event.Records.length} records.`);
  } catch (error) {
    callback(error, null);
  }
};
