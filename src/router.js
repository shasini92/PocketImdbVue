import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login";
import PageNotFound from "./views/PageNotFound";
// import Todo from "./views/Todo";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: Todo
    // },
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
