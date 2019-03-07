import { IFieldResolver } from 'graphql-tools';

import elasticsearch from ':clients/aws/elasticsearch';
import {
  MoviesConnection,
  MoviesEdge,
  MoviesQueryArgs,
  PageInfo,
} from ':types/schema';

const resolver: IFieldResolver<any, any, MoviesQueryArgs> = async (
  _source,
  args
): Promise<MoviesConnection> => {
  const { after, first = 20 } = args;
  const {
    hits: { hits, total },
  } = await elasticsearch.search({
    body: {
      query: {
        match_all: {},
      },
      search_after: after && +after,
    },
    index: 'movies',
    size: first,
    sort: 'createdAt:desc',
  });
  const edges: MoviesEdge[] = hits.map(({ _source }) => {
    const { createdAt, id, title } = _source as Model.Movie;
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
  const pageInfo: PageInfo = {
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
