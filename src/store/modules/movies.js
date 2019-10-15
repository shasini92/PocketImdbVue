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
      commit("setMovies", allMovies);
    } catch (error) {
      console.log(error);
    }
  },
  async getSingleMovie({ commit }, id) {
    try {
      const movie = await movieService.fetchSingleMovie(id);
      commit("setSingleMovie", movie);
    } catch (error) {
      console.log(error);
    }
  },

  async addMovie({ commit }, data) {
    try {
      const newMovie = await movieService.addMovie(data);

      commit("newMovie", newMovie);
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  setMovies: (state, movies) => {
    state.movies = movies;
  },
  setSingleMovie: (state, movie) => {
    state.movie = movie;
  },
  setMovies: (state, movies) => {
    state.movies = movies;
  },

  newMovie: (state, movie) => {
    state.todos.unshift(movie);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
