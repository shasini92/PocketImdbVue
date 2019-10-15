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
                      @keyup="validate($event)"
                      @keydown="validate($event)"
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
                      @keyup="validate($event)"
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
                      @keyup="validate($event)"
                    />
                  </div>
                  <small v-if="errors.password" class="text-danger">{{errors.password}}</small>
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
import { mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      userInfo: {
        name: "",
        email: "",
        password: ""
      },
      errors: {
        username: "Make sure the username is not empty.",
        email: "Make sure to enter a valid email address.",
        password: "Password must be at least 6 characters long."
      },
      isDisabled: true
    };
  },
  methods: {
    ...mapActions(["register"]),
    validateUsername(element) {
      if (!this.userInfo.name) {
        this.errors.username = "Name is required.";
        element.srcElement.classList.add("is-invalid");
      } else {
        this.errors.username = "";
        element.srcElement.classList.remove("is-invalid");
        element.srcElement.classList.add("is-valid");
      }
    },
    validateEmail(element) {
      let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      let { email } = this.userInfo;
      if (!email || !reg.test(email)) {
        this.errors.email = "Please enter a valid email.";
        element.srcElement.classList.add("is-invalid");
      } else {
        this.errors.email = "";
        element.srcElement.classList.remove("is-invalid");
        element.srcElement.classList.add("is-valid");
      }
    },
    validatePassword(element) {
      let { password } = this.userInfo;
      if ((password = "" || password.length < 6)) {
        this.errors.password = "Password must be at least 6 characters long.";
        element.srcElement.classList.add("is-invalid");
      } else {
        this.errors.password = "";
        element.srcElement.classList.remove("is-invalid");
        element.srcElement.classList.add("is-valid");
      }
    },
    validate(element) {
      let { type } = element.srcElement;

      if (type == "text") {
        this.validateUsername(element);
      } else if (type == "password") {
        this.validatePassword(element);
      } else {
        this.validateEmail(element);
      }

      let { email, username, password } = this.errors;
      if (email == "" && username == "" && password == "") {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    async onRegister(e) {
      await this.register(this.userInfo);
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
.register-link {
  float: right;
  margin-top: 15px;
}
</style>


