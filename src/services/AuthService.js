import { apiService } from "./ApiBaseService";

const ENDPOINTS = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register"
};

class AuthService {
  async login(credentials) {
    try {
      const { data } = await apiService
        .getApiClient()
        .post(ENDPOINTS.LOGIN, credentials);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await apiService.getApiClient().post(ENDPOINTS.LOGOUT, {});
    } catch (error) {
      console.log(error);
    }
  }

  async register(newUserData) {
    try {
      const { data } = await apiService
        .getApiClient()
        .post(ENDPOINTS.REGISTER, newUserData);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const authService = new AuthService();
