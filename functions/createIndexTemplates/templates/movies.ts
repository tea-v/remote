/* eslint-disable @typescript-eslint/camelcase */

export default {
  body: {
    index_patterns: ['movies'],
    mappings: {
      _doc: {
        properties: {
          title: {
            analyzer: 'autocomplete',
            type: 'text',
          },
        },
      },
    },
    settings: {
      analysis: {
        analyzer: {
          autocomplete: {
            filter: ['lowercase', 'autocomplete_filter'],
            tokenizer: 'standard',
            type: 'custom',
          },
        },
        filter: {
          autocomplete_filter: {
            max_gram: 20,
            min_gram: 1,
            type: 'edge_ngram',
          },
        },
      },
      number_of_shards: 1,
    },
  },
  name: 'movies',
};
