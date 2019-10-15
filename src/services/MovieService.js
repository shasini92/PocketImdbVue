import { apiService } from "./ApiBaseService";

class MovieService {
  async fetchMovies() {
    try {
      const {
        data: { data: allMovies }
      } = await apiService.getApiClient().get("/movies");
      return allMovies;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchSingleMovie(id) {
    try {
      const { data } = await apiService.getApiClient().get(`/movies/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addMovie(newMovie) {
    try {
      const { data } = await axios.post(`/movies`, newMovie);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const movieService = new MovieService();
