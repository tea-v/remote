export type Maybe<T> = T | null;

// ====================================================
// Interfaces
// ====================================================

export interface Connection {
  pageInfo: PageInfo;
}

export interface Edge {
  cursor: string;
}

export interface Node {
  id: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  movies: MoviesConnection;
}

export interface MoviesConnection extends Connection {
  edges: (Maybe<MoviesEdge>)[];
}

export interface PageInfo {
  endCursor?: Maybe<string>;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

  startCursor?: Maybe<string>;
}

export interface MoviesEdge extends Edge {
  node: Movie;
}

export interface Movie extends Node {
  createdAt: number;

  title: string;
}

// ====================================================
// Arguments
// ====================================================

export interface MoviesQueryArgs {
  after?: Maybe<string>;

  first?: Maybe<number>;

  releaseYear?: Maybe<number>;
}
