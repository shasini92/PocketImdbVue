import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login";
import PageNotFound from "./views/PageNotFound";
import Home from "./views/Home";
import SingleMovie from "./views/SingleMovie";
import Register from "./views/Register";

Vue.use(Router);

function loggedInGuard(to, from, next) {
  if (!localStorage.getItem("access_token")) {
    next({ name: "login" });
  } else {
    next();
  }
}

function loggedOutGuard(to, from, next) {
  if (localStorage.getItem("access_token")) {
    next({ name: "home" });
  } else {
    next();
  }
}

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: loggedInGuard
    },
    {
      path: "/movies/:id",
      name: "movie",
      component: SingleMovie,
      beforeEnter: loggedInGuard
    },

    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: loggedOutGuard
    },
    {
      path: "*",
      component: PageNotFound,
      beforeEnter: loggedInGuard
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      beforeEnter: loggedOutGuard
    }
  ]
});

export default router;
