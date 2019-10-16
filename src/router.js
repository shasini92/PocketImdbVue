import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login";
import PageNotFound from "./views/PageNotFound";
import Home from "./views/Home";
import SingleMovie from "./views/SingleMovie";
import Register from "./views/Register";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/movies/:id",
      name: "singleMovie",
      component: SingleMovie
    },

    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "*",
      component: PageNotFound
    },
    {
      path: "/register",
      name: "register",
      component: Register
    }
  ]
});

export default router;
