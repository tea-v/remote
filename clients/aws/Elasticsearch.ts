import Elasticsearch from 'elasticsearch';
import connectionClass from 'http-aws-es';

const { ELASTICSEARCH_ENDPOINT } = process.env;

const client = new Elasticsearch.Client({
  connectionClass,
  host: ELASTICSEARCH_ENDPOINT,
});
