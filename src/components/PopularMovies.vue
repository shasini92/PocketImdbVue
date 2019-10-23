<template>
  <div class="col-sm-3 mt-2 pr-0">
    <div class="card">
      <div class="card-body">
        <h4>Popular Movies</h4>
        <ul class="navbar-nav ml-auto" v-for="movie in popularMovies" :key="movie.id">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'movie', params: { id:movie.id } }"
            >{{movie.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PopularMovies",

  computed: {
    ...mapGetters(["popularMovies"])
  },

  methods: {
    ...mapActions(["getPopularMovies"])
  },

  created() {
    let data = {
      sortBy: "likes"
    };

    this.getPopularMovies(data);
  }
};
</script>

<style>
</style>