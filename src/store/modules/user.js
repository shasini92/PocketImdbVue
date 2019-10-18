import { authService } from "../../services/AuthService";

const state = {
  userLoggedIn: false,
  user: {}
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

const mutations = {
  SET_USER: (state, data) => {
    localStorage.setItem("access_token", JSON.stringify(data.access_token));
    state.userLoggedIn = true;
    state.user = data;
  },

  LOGOUT_USER: state => {
    localStorage.removeItem("access_token");
    state.userLoggedIn = false;
    state.user = {};
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
