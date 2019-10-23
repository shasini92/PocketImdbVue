import { movieService } from "../../services/MovieService";
import {
  MOVIE_REACTION_LIKED,
  MOVIE_REACTION_DISLIKED
} from "../../constants/reactions";

const state = {
  movies: {},
  movie: {},
  popularMovies: {},
  showCreateForm: false,
  showWatchlist: false,
  genres: [],
  watchlist: []
};

const getters = {
  allMovies: state => state.movies,
  singleMovie: state => state.movie,
  popularMovies: state => state.popularMovies,
  showCreateForm: state => state.showCreateForm,
  showWatchlist: state => state.showWatchlist,
  genres: state => state.genres,
  watchlist: state => state.watchlist
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

  async getAllMovies({ commit, dispatch }, fetchData) {
    try {
      await dispatch("getWatchlist");

      const data = await movieService.fetchMovies(fetchData);

      commit("SET_MOVIES", data);
    } catch (error) {
      console.log(error);
    }
  },

  async getPopularMovies({ commit, dispatch }, fetchData) {
    try {
      await dispatch("getWatchlist");

      const movies = await movieService.fetchMovies(fetchData);

      commit("SET_POPULAR_MOVIES", movies);
    } catch (error) {
      console.log(error);
    }
  },

  async getWatchlist({ commit }, fetchData) {
    try {
      const data = await movieService.fetchWatchlistMovies(fetchData);

      commit("SET_WATCHLIST", data);
    } catch (error) {
      console.log(error);
    }
  },

  async addToWatchlist({ commit }, id) {
    try {
      await movieService.addToWatchlist(id);
    } catch (error) {
      console.log(error);
    }
  },

  async markAsWatched({ commit }, id) {
    try {
      await movieService.markAsWatched(id);

      commit("SET_AS_WATCHED", id);
    } catch (error) {
      console.log(error);
    }
  },

  async removeFromWatchlist({ commit }, id) {
    try {
      await movieService.removeFromWatchlist(id);

      commit("REMOVE_FROM_WATCHLIST", id);
    } catch (error) {
      console.log(error);
    }
  },

  async getSingleMovie({ commit, rootState, dispatch }, id) {
    try {
      await dispatch("getWatchlist");

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

  async addMovie({ commit }, data) {
    try {
      const newMovie = await movieService.addMovie(data);
    } catch (error) {
      console.log(error);
    }
  }
};

const mutations = {
  SET_MOVIES: (state, movies) => {
    const watchedIDs = state.watchlist.map(movie => movie.id);
    movies.data.forEach(movie => {
      if (watchedIDs.includes(movie.id)) {
        let watchedMovie = state.watchlist.find(
          element => element.id == movie.id
        );
        movie.watched = watchedMovie.pivot.watched;
      }
    });
    state.movies = movies;
  },

  SET_WATCHLIST: (state, movies) => {
    state.watchlist = movies;
  },

  SET_GENRES: (state, genres) => {
    state.genres = genres;
  },

  SET_POPULAR_MOVIES: (state, movies) => {
    state.popularMovies = movies;
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

    const watchedIDs = state.watchlist.map(movie => movie.id);
    if (watchedIDs.includes(movie.id)) {
      let watchedMovie = state.watchlist.find(
        element => element.id == movie.id
      );
      movie.watched = watchedMovie.pivot.watched;
    }
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
  },

  SHOW_WATCHLIST: (state, data) => {
    state.showWatchlist = data;
  },

  SET_AS_WATCHED: (state, id) => {
    state.watchlist.map(movie => {
      if (movie.id == id) {
        movie.pivot.watched = 1;
        return movie;
      }
      return movie;
    });
  },

  REMOVE_FROM_WATCHLIST: (state, id) => {
    state.watchlist = state.watchlist.filter(movie => movie.id != id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
