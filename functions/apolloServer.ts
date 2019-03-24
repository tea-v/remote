/* eslint-disable import/prefer-default-export */

import { ApolloServer } from 'apollo-server-lambda';

import resolvers from ':graphql/resolvers';
import typeDefs from ':graphql/schema.graphql';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export const handler = server.createHandler({
  cors: {
    origin: '*',
  },
});
