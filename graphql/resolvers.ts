import client from './client';

const getMovies = (args) => {};

export default {
  Query: {
    movies: (_, args) => getMovies(args),
  },
};
