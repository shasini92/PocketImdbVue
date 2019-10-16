import Vuex from "vuex";
import Vue from "vue";
import movies from "./modules/movies";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    movies,
    user
  }
});
