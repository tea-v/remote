type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Connection = {
  pageInfo: PageInfo;
};

export type Edge = {
  cursor: Scalars['String'];
};

export type Movie = Node & {
  createdAt: Scalars['Int'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type MoviesConnection = Connection & {
  edges: Array<MoviesEdge>;
  pageInfo: PageInfo;
};

export type MoviesEdge = Edge & {
  cursor: Scalars['String'];
  node: Movie;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  endCursor: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Maybe<Scalars['String']>;
};

export type Query = {
  movie: Maybe<Movie>;
  movies: MoviesConnection;
};

export type QueryMovieArgs = {
  createdAt: Scalars['Int'];
  id: Scalars['ID'];
};

export type QueryMoviesArgs = {
  after: Maybe<Scalars['String']>;
  first: Scalars['Int'];
  titleMatch: Maybe<Scalars['String']>;
};

import { GraphQLResolveInfo } from 'graphql';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: Query;
  Int: Scalars['Int'];
  ID: Scalars['ID'];
  Movie: Movie;
  Node: Node;
  String: Scalars['String'];
  MoviesConnection: MoviesConnection;
  Connection: Connection;
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean'];
  MoviesEdge: MoviesEdge;
  Edge: Edge;
};

export type ConnectionResolvers<
  Context = any,
  ParentType = ResolversTypes['Connection']
> = {
  __resolveType: TypeResolveFn<'MoviesConnection', ParentType, Context>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, Context>;
};

export type EdgeResolvers<
  Context = any,
  ParentType = ResolversTypes['Edge']
> = {
  __resolveType: TypeResolveFn<'MoviesEdge', ParentType, Context>;
  cursor: Resolver<ResolversTypes['String'], ParentType, Context>;
};

export type MovieResolvers<
  Context = any,
  ParentType = ResolversTypes['Movie']
> = {
  createdAt: Resolver<ResolversTypes['Int'], ParentType, Context>;
  id: Resolver<ResolversTypes['ID'], ParentType, Context>;
  title: Resolver<ResolversTypes['String'], ParentType, Context>;
};

export type MoviesConnectionResolvers<
  Context = any,
  ParentType = ResolversTypes['MoviesConnection']
> = {
  edges: Resolver<Array<ResolversTypes['MoviesEdge']>, ParentType, Context>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, Context>;
};

export type MoviesEdgeResolvers<
  Context = any,
  ParentType = ResolversTypes['MoviesEdge']
> = {
  cursor: Resolver<ResolversTypes['String'], ParentType, Context>;
  node: Resolver<ResolversTypes['Movie'], ParentType, Context>;
};

export type NodeResolvers<
  Context = any,
  ParentType = ResolversTypes['Node']
> = {
  __resolveType: TypeResolveFn<'Movie', ParentType, Context>;
  id: Resolver<ResolversTypes['ID'], ParentType, Context>;
};

export type PageInfoResolvers<
  Context = any,
  ParentType = ResolversTypes['PageInfo']
> = {
  endCursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>;
  hasNextPage: Resolver<ResolversTypes['Boolean'], ParentType, Context>;
  hasPreviousPage: Resolver<ResolversTypes['Boolean'], ParentType, Context>;
  startCursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, Context>;
};

export type QueryResolvers<
  Context = any,
  ParentType = ResolversTypes['Query']
> = {
  movie: Resolver<
    Maybe<ResolversTypes['Movie']>,
    ParentType,
    Context,
    QueryMovieArgs
  >;
  movies: Resolver<
    ResolversTypes['MoviesConnection'],
    ParentType,
    Context,
    QueryMoviesArgs
  >;
};

export type Resolvers<Context = any> = {
  Connection: ConnectionResolvers;
  Edge: EdgeResolvers;
  Movie: MovieResolvers<Context>;
  MoviesConnection: MoviesConnectionResolvers<Context>;
  MoviesEdge: MoviesEdgeResolvers<Context>;
  Node: NodeResolvers;
  PageInfo: PageInfoResolvers<Context>;
  Query: QueryResolvers<Context>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<Context = any> = Resolvers<Context>;
