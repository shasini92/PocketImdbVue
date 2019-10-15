<template>
  <div>
    <section class="section pb-0 bg-gradient-info main-section">
      <div class="container">
        <div class="row row-grid align-items-center justify-content-md-center">
          <div class="col-lg-8 order-lg-1 mt-0">
            <div class="card bg-gradient-secondary shadow shadow-lg--hover mt-5">
              <form class="card-body p-lg-5 pt-0" @submit.prevent="onLogin">
                <h4 class="mb-1">Login</h4>
                <p class="mt-0">To access the best Todos app ever.</p>

                <div class="form-group mt-3">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Your Email address"
                      name="email"
                      type="email"
                      @keyup="validate"
                      v-model="userInfo.email"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Your Password"
                      name="password"
                      type="password"
                      @keyup="validate"
                      v-model="userInfo.password"
                    />
                  </div>
                </div>
                <div>
                  <button
                    :disabled="isDisabled"
                    type="submit"
                    class="btn btn-primary btn-round btn-block btn-lg"
                  >Login</button>
                </div>
                <router-link to="/register" class="register-link float-right mt-2">
                  <span class="nav-link-inner--text">Not a member?</span>
                </router-link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import VueRouter from "vue-router";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: function() {
    return {
      userInfo: {
        email: "",
        password: ""
      },
      isDisabled: true
    };
  },
  methods: {
    ...mapActions(["login"]),
    validate() {
      if (this.userInfo.email && this.userInfo.password) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    async onLogin() {
      let credentials = {
        email: this.userInfo.email,
        password: this.userInfo.password
      };

      await this.login(credentials);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
section.main-section {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.section {
  padding-top: 0;
}
</style>


