import client from './client';

const getMovies = (args) => {
  return [];
};

export default {
  Query: {
    movies: (_, args) => getMovies(args),
  },
};
