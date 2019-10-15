import { authService } from "../../services/AuthService";

const state = {
  userLoggedIn: false
};

const getters = {
  userLoggedIn: store => store.userLoggedIn
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const data = await authService.login(credentials);
      commit("setUser", data);
    } catch (error) {
      console.log(error);
    }
  },
  async logout({ commit }) {
    try {
      await authService.logout();
      commit("logoutUser");
    } catch (error) {
      console.log(error);
    }
  },
  async register({ commit }, newUser) {
    try {
      const createdUser = await authService.register(newUser);
      commit("register", createdUser);
    } catch (error) {
      console.log(error);
    }
  }
};

const localStorageLogin = data => {
  localStorage.setItem("access_token", JSON.stringify(data.access_token));
};

const localStorageLogout = () => {
  localStorage.removeItem("access_token");
};

const mutations = {
  setUser: (state, data) => {
    localStorageLogin(data);
    state.userLoggedIn = true;
  },
  logoutUser: state => {
    localStorageLogout();
    state.userLoggedIn = false;
  },
  register: (state, data) => {
    localStorageLogin(data);
    state.userLoggedIn = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
