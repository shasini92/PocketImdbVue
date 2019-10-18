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
  async react({ commit }, reaction) {
    try {
      const response = await movieService.react(reaction);

      commit("UPDATE_LIKES_AND_DISLIKES", response.reaction_type);
    } catch (error) {
      console.log(error);
    }
  },

  async getAllMovies({ commit }, searchQuery) {
    try {
      const allMovies = await movieService.fetchMovies(searchQuery);

      commit("SET_MOVIES", allMovies);
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

  SET_SINGLE_MOVIE: (state, { movie, user_id }) => {
    state.movie = movie;
    state.movie.dislikes = 0;
    state.movie.likes = 0;
    state.movie.disableLike = false;
    state.movie.disableDislike = false;

    movie.reactions.forEach(reaction => {
      if (reaction.reaction_type == "liked" && reaction.user_id == user_id) {
        console.log("like disabled");
        state.movie.disableLike = true;
      }
      if (reaction.reaction_type == "disliked" && reaction.user_id == user_id) {
        state.movie.disableDislike = true;
        console.log("dislike disabled");
      }
      if (reaction.reaction_type == "disliked") state.movie.dislikes++;
      if (reaction.reaction_type == "liked") state.movie.likes++;
    });
  },

  NEW_MOVIE: (state, movie) => {
    state.todos.unshift(movie);
  },

  UPDATE_LIKES_AND_DISLIKES: (state, type) => {
    if (type == "liked") {
      const newState = { ...state.movie };
      newState.likes++;
      if (newState.dislikes !== 0) newState.dislikes--;
      state.movie = newState;
    }
    if (type == "disliked") {
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
