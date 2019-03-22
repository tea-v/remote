import connectionClass from 'http-aws-es';
import { Client } from 'elasticsearch';

const { ELASTICSEARCH_ENDPOINT } = process.env;

export default new Client({
  connectionClass,
  host: ELASTICSEARCH_ENDPOINT,
  keepAlive: true,
});
