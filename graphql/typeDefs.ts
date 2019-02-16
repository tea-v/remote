import { gql } from 'apollo-server-lambda';

export default gql`
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }

  interface Connection {
    pageInfo: PageInfo!
  }

  interface Edge {
    cursor: String!
  }

  interface Node {
    id: ID!
  }

  type Movie implements Node {
    createdAt: Int!
    title: String!
  }

  type MoviesEdge implements Edge {
    node: Movie!
  }

  type MoviesConnection implements Connection {
    edges: [MoviesEdge]!
  }

  type Query {
    movies(after: String, first: Int, releaseYear: Int): MoviesConnection!
  }

  schema {
    query: Query
  }
`;
