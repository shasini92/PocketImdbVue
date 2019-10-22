<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link class="navbar-brand" :to="{name:'home'}">PocketIMDb</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <form class="form-inline my-2 my-lg-0 mr-2" v-if="userLoggedIn">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchTerm"
          />
        </form>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'login'}" v-if="!userLoggedIn">Login</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-item nav-link button" v-if="userLoggedIn" @click="onLogout">Logout</a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'register'}" v-if="!userLoggedIn">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export default {
  name: "Header",

  data() {
    return {
      searchTerm: ""
    };
  },

  computed: {
    ...mapGetters(["userLoggedIn"])
  },

  watch: {
    searchTerm() {
      let data = {
        page: 1,
        searchQuery: this.searchTerm
      };
      this.getAllMovies(data);
    }
  },

  methods: {
    ...mapActions(["logout", "getAllMovies"]),

    onLogout() {
      this.logout();
    },

    ...mapMutations(["SET_USER_LOGGED_IN"])
  },

  created() {
    this.getAllMovies = debounce(this.getAllMovies.bind(this), 750);
    if (localStorage.getItem("access_token") === null) {
      this.SET_USER_LOGGED_IN(false);
    } else {
      this.SET_USER_LOGGED_IN(true);
    }
  }
};
</script>

<style scoped>
.nav-item {
  font-size: 1.3rem;
}
.nav-brand {
  font-size: 1.3rem;
}

.button:hover {
  cursor: pointer;
}
</style>
