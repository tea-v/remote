import { ApolloServer } from 'apollo-server-lambda';

import resolvers from './graphQL/resolvers';
import typeDefs from './graphQL/typeDefs';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

exports.apolloServer = server.createHandler({
  cors: {
    origin: '*',
  },
});
