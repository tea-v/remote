/* eslint-disable import/prefer-default-export */

import { Handler } from 'aws-lambda';

import elasticsearch from ':clients/aws/elasticsearch';

import movies from './createIndexTemplates/templates/movies';

export const handler: Handler = async () => {
  await elasticsearch.indices.putTemplate(movies);
};
