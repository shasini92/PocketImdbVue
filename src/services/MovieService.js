import { apiService } from "./ApiBaseService";

const ENDPOINTS = {
  MOVIES: "/movies",
  MOVIE: id => `/movies/${id}`,
  GENRES: "/genres"
};

class MovieService {
  async fetchMovies(searchQuery) {
    try {
      const {
        data: { data: allMovies }
      } = await apiService.getApiClient().get(ENDPOINTS.MOVIES, {
        params: {
          searchTerm: searchQuery
        }
      });
      return allMovies;
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
}

export const movieService = new MovieService();
