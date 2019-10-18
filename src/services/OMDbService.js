import axios from "axios";

const ENDPOINTS = {
  OMDB: title => `http://www.omdbapi.com/?apikey=715ca298&t=${title}`
};

class OMDbService {
  async fetchFromOMDb(title) {
    try {
      const { data } = await axios.get(ENDPOINTS.OMDB(title));

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const omdbService = new OMDbService();
