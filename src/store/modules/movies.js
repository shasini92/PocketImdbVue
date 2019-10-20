import { movieService } from "../../services/MovieService";
import {
  MOVIE_REACTION_LIKED,
  MOVIE_REACTION_DISLIKED
} from "../../constants/reactions";

const state = {
  movies: {},
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
  async react({ commit }, reaction) {
    try {
      const response = await movieService.react(reaction);

      commit("UPDATE_LIKES_AND_DISLIKES", response.reaction_type);
    } catch (error) {
      console.log(error);
    }
  },

  async getAllMovies({ commit }, { page, searchQuery }) {
    try {
      const data = await movieService.fetchMovies(page, searchQuery);

      commit("SET_MOVIES", data);
    } catch (error) {
      console.log(error);
    }
  },

  async getSingleMovie({ commit, rootState }, id) {
    try {
      const { user } = rootState;
      const movie = await movieService.fetchSingleMovie(id);

      commit("SET_SINGLE_MOVIE", { movie, user_id: user.user.user_id });
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

  async getMoviesByGenre({ commit }, genreId) {
    try {
      const data = await movieService.fetchMoviesByGenre(genreId);

      commit("SET_MOVIES", data);
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

  SET_SINGLE_MOVIE: (state, { movie, user_id }) => {
    state.movie = movie;
    state.movie.dislikes = 0;
    state.movie.likes = 0;
    state.movie.disableLike = false;
    state.movie.disableDislike = false;

    movie.reactions.forEach(reaction => {
      if (
        reaction.reaction_type == MOVIE_REACTION_LIKED &&
        reaction.user_id == user_id
      ) {
        state.movie.disableLike = true;
      }
      if (
        reaction.reaction_type == MOVIE_REACTION_DISLIKED &&
        reaction.user_id == user_id
      ) {
        state.movie.disableDislike = true;
      }
      if (reaction.reaction_type == MOVIE_REACTION_DISLIKED)
        state.movie.dislikes++;
      if (reaction.reaction_type == MOVIE_REACTION_LIKED) state.movie.likes++;
    });
  },

  NEW_MOVIE: (state, movie) => {
    state.movies.unshift(movie);
  },

  SHOW_CREATE_FORM: (state, data) => {
    state.showCreateForm = data;
  },

  UPDATE_LIKES_AND_DISLIKES: (state, type) => {
    if (type == MOVIE_REACTION_LIKED) {
      const newState = { ...state.movie };
      newState.likes++;
      if (newState.dislikes !== 0) newState.dislikes--;
      state.movie = newState;
    }
    if (type == MOVIE_REACTION_DISLIKED) {
      const newState = { ...state.movie };
      newState.dislikes++;
      if (newState.likes !== 0) newState.likes--;
      state.movie = newState;
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
