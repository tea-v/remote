import elasticsearch from ':clients/aws/elasticsearch';

import movies from './createIndexTemplates/templates/movies';

export const handler = async (
  _event: unknown,
  _context: unknown,
  callback: (error: Error | null, result: string | null) => any
) => {
  try {
    await elasticsearch.indices.putTemplate(movies);
    callback(null, 'Successfully created index templates');
  } catch (error) {
    callback(error, null);
  }
};
