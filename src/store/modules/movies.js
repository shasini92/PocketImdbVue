import { movieService } from "../../services/MovieService";

const state = {
  movies: [],
  movie: {}
};

const getters = {
  allMovies: state => state.movies,
  singleMovie: state => state.movie
};

const actions = {
  async getAllMovies({ commit }) {
    try {
      const allMovies = await movieService.fetchMovies();
      commit("SET_MOVIES", allMovies);
    } catch (error) {
      console.log(error);
    }
  },

  async getSingleMovie({ commit }, id) {
    try {
      const movie = await movieService.fetchSingleMovie(id);
      commit("SET_SINGLE_MOVIE", movie);
    } catch (error) {
      console.log(error);
    }
  },

  async addMovie({ commit }, data) {
    try {
      const newMovie = await movieService.addMovie(data);

      commit("NEW_MOVIE", newMovie);
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  SET_MOVIES: (state, movies) => {
    state.movies = movies;
  },

  SET_SINGLE_MOVIE: (state, movie) => {
    state.movie = movie;
  },

  NEW_MOVIE: (state, movie) => {
    state.todos.unshift(movie);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
