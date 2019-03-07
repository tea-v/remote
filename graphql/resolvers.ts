import Query from './Query';

const Node = {
  __resolveType() {
    return 'Movie';
  },
};

export default {
  Node,
  Query,
};
