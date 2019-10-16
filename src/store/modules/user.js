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
      commit("SET_USER", data);
    } catch (error) {
      console.log(error);
    }
  },

  async logout({ commit }) {
    try {
      await authService.logout();
      commit("LOGOUT_USER");
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
  SET_USER: (state, data) => {
    localStorageLogin(data);
    state.userLoggedIn = true;
  },

  LOGOUT_USER: state => {
    localStorageLogout();
    state.userLoggedIn = false;
  },

  SET_USER_LOGGED_IN: (state, data) => {
    state.userLoggedIn = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
