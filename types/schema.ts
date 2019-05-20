import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Connection = {
  __typename?: 'Connection';
  pageInfo: PageInfo;
};

export type Edge = {
  __typename?: 'Edge';
  cursor: Scalars['String'];
};

export type Movie = Node & {
  __typename?: 'Movie';
  createdAt: Scalars['Int'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type MoviesConnection = Connection & {
  __typename?: 'MoviesConnection';
  edges: Array<MoviesEdge>;
  pageInfo: PageInfo;
};

export type MoviesEdge = Edge & {
  __typename?: 'MoviesEdge';
  cursor: Scalars['String'];
  node: Movie;
};

export type Node = {
  __typename?: 'Node';
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
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
  Query: {};
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
  ContextType = any,
  ParentType = ResolversTypes['Connection']
> = {
  __resolveType: TypeResolveFn<'MoviesConnection', ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type EdgeResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Edge']
> = {
  __resolveType: TypeResolveFn<'MoviesEdge', ParentType, ContextType>;
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MovieResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Movie']
> = {
  createdAt: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MoviesConnectionResolvers<
  ContextType = any,
  ParentType = ResolversTypes['MoviesConnection']
> = {
  edges: Resolver<Array<ResolversTypes['MoviesEdge']>, ParentType, ContextType>;
  pageInfo: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
};

export type MoviesEdgeResolvers<
  ContextType = any,
  ParentType = ResolversTypes['MoviesEdge']
> = {
  cursor: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node: Resolver<ResolversTypes['Movie'], ParentType, ContextType>;
};

export type NodeResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Node']
> = {
  __resolveType: TypeResolveFn<'Movie', ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = any,
  ParentType = ResolversTypes['PageInfo']
> = {
  endCursor: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversTypes['Query']
> = {
  movie: Resolver<
    Maybe<ResolversTypes['Movie']>,
    ParentType,
    ContextType,
    QueryMovieArgs
  >;
  movies: Resolver<
    ResolversTypes['MoviesConnection'],
    ParentType,
    ContextType,
    QueryMoviesArgs
  >;
};

export type Resolvers<ContextType = any> = {
  Connection: ConnectionResolvers;
  Edge: EdgeResolvers;
  Movie: MovieResolvers<ContextType>;
  MoviesConnection: MoviesConnectionResolvers<ContextType>;
  MoviesEdge: MoviesEdgeResolvers<ContextType>;
  Node: NodeResolvers;
  PageInfo: PageInfoResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
