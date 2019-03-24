/* eslint-disable @typescript-eslint/camelcase */

import Model from ':types/model';
import elasticsearch from ':clients/aws/elasticsearch';
import { QueryResolvers } from ':types/schema';

const resolver: QueryResolvers['movies'] = async (_source, args) => {
  const { after, first = 20, titleMatch } = args;
  const {
    hits: { hits, total },
  } = await elasticsearch.search({
    body: {
      query: {
        ...(titleMatch ? { match: { title: titleMatch } } : { match_all: {} }),
      },
      search_after: after && +after,
    },
    index: 'movies',
    size: first,
    sort: 'createdAt:desc',
  });
  const edges = hits.map(({ _source: movie }) => {
    const { createdAt, id, title } = movie as Model['Movie'];
    return {
      cursor: `${createdAt}`,
      node: {
        createdAt,
        id,
        title,
      },
    };
  });
  const endEdge = edges[edges.length - 1];
  const pageInfo = {
    endCursor: endEdge && endEdge.cursor,
    hasNextPage: first < total,
    hasPreviousPage: !!after && after.length > 0,
    startCursor: after,
  };
  return {
    edges,
    pageInfo,
  };
};

export default resolver;
