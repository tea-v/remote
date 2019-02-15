export default `
type Query {
  movies() MoviesConnection
}

schema {
  query: Query
}
`;
