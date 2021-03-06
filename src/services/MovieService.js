import { apiService } from "./ApiBaseService";

const ENDPOINTS = {
  MOVIES: "/movies",
  MOVIE: id => `/movies/${id}`,
  GENRES: "/genres",
  REACTIONS: id => `/movies/${id}/reactions`,
  COMMENTS: id => `/movies/${id}/comments`,
  WATCHLIST: "/watchlist",
  WATCHLIST_MOVIE: id => `/movies/${id}/watchlist`
};

class MovieService {
  async react(reaction) {
    try {
      const { data } = await apiService
        .getApiClient()
        .post(ENDPOINTS.REACTIONS(reaction.id), {
          reactionType: reaction.reactionType
        });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchMovies(fetchData) {
    try {
      const { data } = await apiService.getApiClient().get(ENDPOINTS.MOVIES, {
        params: {
          page: fetchData.page,
          searchTerm: fetchData.searchQuery,
          genreId: fetchData.genreId,
          sortBy: fetchData.sortBy
        }
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchWatchlistMovies() {
    try {
      const { data } = await apiService.getApiClient().get(ENDPOINTS.WATCHLIST);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addToWatchlist(id) {
    try {
      const { data } = await apiService
        .getApiClient()
        .post(ENDPOINTS.WATCHLIST, { id });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async markAsWatched(id) {
    try {
      const { data } = await apiService
        .getApiClient()
        .put(ENDPOINTS.WATCHLIST_MOVIE(id));

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async removeFromWatchlist(id) {
    try {
      const { data } = await apiService
        .getApiClient()
        .delete(ENDPOINTS.WATCHLIST_MOVIE(id));

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchSingleMovie(id) {
    try {
      const { data } = await apiService.getApiClient().get(ENDPOINTS.MOVIE(id));

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchGenres() {
    try {
      const { data } = await apiService.getApiClient().get(ENDPOINTS.GENRES);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addMovie(newMovie) {
    try {
      const { data } = await apiService
        .getApiClient()
        .post(ENDPOINTS.MOVIES, newMovie);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchComments(id, page) {
    try {
      const { data } = await apiService
        .getApiClient()
        .get(ENDPOINTS.COMMENTS(id), {
          params: {
            page: page
          }
        });

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addComment(id, commentBody) {
    try {
      const { data } = await apiService
        .getApiClient()
        .post(ENDPOINTS.COMMENTS(id), {
          commentBody
        });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const movieService = new MovieService();
