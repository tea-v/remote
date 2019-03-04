import { pushStream } from 'dynamodb-stream-elasticsearch';

const { ELASTICSEARCH_ENDPOINT } = process.env;

export const handler = async (
  event: { [key: string]: any },
  _context: unknown,
  callback: (error: Error | null, result: string | null) => any
) => {
  try {
    await pushStream({
      endpoint: ELASTICSEARCH_ENDPOINT,
      event,
      refresh: false,
      type: 'movie',
    });
    callback(null, `Successfully indexed ${event.Records.length} records.`);
  } catch (error) {
    callback(error, null);
  }
};
