import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import PageNotFound from "./views/PageNotFound";
import Home from "./views/Home";
import SingleMovie from "./views/SingleMovie";

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
      name: "Register",
      component: () => import("./views/Register.vue")
    }
  ]
});

export default router;
