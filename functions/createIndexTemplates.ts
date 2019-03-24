/* eslint-disable import/prefer-default-export */

import { Handler } from 'aws-lambda';

import elasticsearch from ':clients/aws/elasticsearch';

import movies from './createIndexTemplates/templates/movies';

export const handler: Handler = async (_event, _context, callback) => {
  try {
    await elasticsearch.indices.putTemplate(movies);
    callback(null, 'Successfully created index templates');
  } catch (error) {
    callback(error, null);
  }
};
