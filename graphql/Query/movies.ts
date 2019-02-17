import { IFieldResolver } from 'graphql-tools';

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
  const { after, first } = args;
  const edges: MoviesEdge[] = [];
  const pageInfo: PageInfo = {
    endCursor: null,
    hasNextPage: null,
    hasPreviousPage: null,
    startCursor: null,
  };
  return {
    edges,
    pageInfo,
  };
};

export default resolver;
