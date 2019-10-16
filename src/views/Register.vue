<template>
  <div>
    <section class="section pb-0 bg-gradient-info main-section">
      <div class="container">
        <div class="row row-grid align-items-center justify-content-md-center mt-5">
          <div class="col-lg-8 order-lg-1 mt-0">
            <div class="card bg-gradient-secondary shadow shadow-lg--hover mt-5">
              <form class="card-body p-lg-5" @submit.prevent="onRegister">
                <h4 class="mb-1">Register</h4>
                <p class="mt-0">To access the best Todos app ever.</p>
                <div class="form-group mt-3">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Your Name"
                      type="text"
                      v-model="userInfo.name"
                    />
                  </div>
                  <small v-if="errors.username" class="text-danger">{{errors.username}}</small>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Your Email address"
                      type="email"
                      v-model="userInfo.email"
                    />
                  </div>
                  <small v-if="errors.email" class="text-danger">{{errors.email}}</small>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Your Password"
                      type="password"
                      v-model="userInfo.password"
                    />
                  </div>
                  <small v-if="errors.password" class="text-danger">{{errors.password}}</small>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <input
                      class="form-control"
                      placeholder="Confirm Password"
                      type="password"
                      v-model="userInfo.password_confirmation"
                    />
                  </div>
                  <small
                    v-if="errors.password_confirmation"
                    class="text-danger"
                  >{{errors.password_confirmation}}</small>
                </div>
                <div>
                  <button
                    :disabled="isDisabled"
                    type="submit"
                    class="btn btn-primary btn-round btn-block btn-lg"
                  >Sign up</button>
                </div>
                <router-link to="/login" class="register-link">
                  <span class="nav-link-inner--text">Already Registered?</span>
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
import { authService } from "../services/AuthService";
export default {
  name: "Register",

  data() {
    return {
      userInfo: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },

      errors: {
        username: "",
        email: "",
        password: "Password must be at least 6 characters long.",
        password_confirmation: "Make sure the passwords match."
      }
    };
  },

  computed: {
    isDisabled() {
      let { email, username, password, password_confirmation } = this.errors;
      if (
        email == "" &&
        username == "" &&
        password == "" &&
        password_confirmation == ""
      ) {
        return false;
      } else {
        return true;
      }
    },

    name() {
      return this.userInfo.name;
    },

    email() {
      return this.userInfo.email;
    },

    password() {
      return this.userInfo.password;
    },

    password_confirmation() {
      return this.userInfo.password_confirmation;
    }
  },
  watch: {
    name() {
      if (!this.userInfo.name) {
        this.errors.username = "Name is required.";
      } else {
        this.errors.username = "";
      }
    },

    email() {
      let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      let { email } = this.userInfo;
      if (!email || !reg.test(email)) {
        this.errors.email = "Please enter a valid email.";
      } else {
        this.errors.email = "";
      }
    },

    password() {
      let { password } = this.userInfo;
      if ((password = "" || password.length < 6)) {
        this.errors.password = "Password must be at least 6 characters long.";
      } else {
        this.errors.password = "";
      }
    },

    password_confirmation() {
      let { password_confirmation, password } = this.userInfo;
      if (password_confirmation !== password) {
        this.errors.password_confirmation = "Passwords do not match.";
      } else {
        this.errors.password_confirmation = "";
      }
    }
  },

  methods: {
    async onRegister(e) {
      await authService.register(this.userInfo);
      this.$router.push("/login");
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
.register-link {
  float: right;
  margin-top: 15px;
}
</style>


