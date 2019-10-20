import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;
Vue.component("pagination", require("laravel-vue-pagination"));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
