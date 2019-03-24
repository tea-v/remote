declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const typeDefs: DocumentNode;

  export = typeDefs;
}
