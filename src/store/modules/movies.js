import { movieService } from "../../services/MovieService";

const state = {
  movies: [],
  movie: {},
  showCreateForm: false,
  genres: []
};

const getters = {
  allMovies: state => state.movies,
  singleMovie: state => state.movie,
  showCreateForm: state => state.showCreateForm,
  genres: state => state.genres
};

const actions = {
  async getAllMovies({ commit }, searchQuery) {
    try {
      const allMovies = await movieService.fetchMovies(searchQuery);
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

  async getGenres({ commit }) {
    try {
      const genres = await movieService.fetchGenres();

      commit("SET_GENRES", genres);
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

  SET_GENRES: (state, genres) => {
    state.genres = genres;
  },

  SET_SINGLE_MOVIE: (state, movie) => {
    state.movie = movie;
  },

  NEW_MOVIE: (state, movie) => {
    state.movies.unshift(movie);
  },

  SHOW_CREATE_FORM: (state, data) => {
    state.showCreateForm = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
