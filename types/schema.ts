export type Maybe<T> = T | null;

// ====================================================
// Interfaces
// ====================================================

export interface Node {
  id: string;
}

export interface Connection {
  pageInfo: PageInfo;
}

export interface Edge {
  cursor: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  movie?: Maybe<Movie>;

  movies: MoviesConnection;
}

export interface Movie extends Node {
  createdAt: number;

  id: string;

  title: string;
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

// ====================================================
// Arguments
// ====================================================

export interface MovieQueryArgs {
  createdAt: number;

  id: string;
}
export interface MoviesQueryArgs {
  after?: Maybe<string>;

  first?: number;
}
