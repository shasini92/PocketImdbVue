import { apiService } from "./ApiBaseService";

const ENDPOINTS = {
  MOVIES: "/movies",
  MOVIE: id => `/movies/${id}`
};

class MovieService {
  async react(reaction) {
    try {
      console.log(reaction);
      const { data } = await apiService
        .getApiClient()
        .get(`${ENDPOINTS.MOVIE(reaction.id)}/react`, {
          params: {
            reactionType: reaction.reactionType
          }
        });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

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
      console.log(data);
      return data[0];
    } catch (error) {
      console.log(error);
    }
  }

  async addMovie(newMovie) {
    try {
      const { data } = await axios.post(ENDPOINTS.MOVIES, newMovie);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const movieService = new MovieService();
