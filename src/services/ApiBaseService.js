import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api";

class ApiBaseService {
  constructor() {
    this.client = axios.create({
      baseURL
    });
    this.setInterceptor();
  }

  setInterceptor = () => {
    this.client.interceptors.request.use(config => {
      const token = JSON.parse(window.localStorage.getItem("access_token"));

      if (!!token) {
        Object.assign(config.headers, {
          Authorization: `Bearer ${token}`
        });
      }

      return config;
    });
  };

  attachHeaders(headers) {
    Object.assign(this.client.defaults.headers, headers);
  }

  detachHeader(headerKey) {
    delete this.client.defaults.headers[headerKey];
  }

  getApiClient() {
    return this.client;
  }
}

export const apiService = new ApiBaseService();
