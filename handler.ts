import { ApolloServer } from 'apollo-server-lambda';

import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

exports.apolloServer = server.createHandler({
  cors: {
    origin: '*',
  },
});
