import { apiService } from "./ApiBaseService";

class AuthService {
  async login(credentials) {
    try {
      const { data } = await apiService
        .getApiClient()
        .post(`/login`, credentials);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await apiService.getApiClient().post("/logout", {});
    } catch (error) {
      console.log(error);
    }
  }

  async register(newUserData) {
    try {
      const { data } = await apiService
        .getApiClient()
        .post(`/register`, newUserData);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const authService = new AuthService();
