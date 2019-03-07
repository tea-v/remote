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
  edges: MoviesEdge[];

  pageInfo: PageInfo;
}

export interface PageInfo {
  endCursor?: Maybe<string>;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

  startCursor?: Maybe<string>;
}

export interface MoviesEdge extends Edge {
  cursor: string;

  node: Movie;
}

export interface Movie extends Node {
  createdAt: number;

  id: string;

  title: string;
}

// ====================================================
// Arguments
// ====================================================

export interface MoviesQueryArgs {
  after?: Maybe<string>;

  first?: number;
}
