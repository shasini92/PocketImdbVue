<template>
  <div class="col-sm-3 mt-2 pr-0">
    <div class="card">
      <div class="card-body">
        <h4>Related Movies</h4>
        <ul class="navbar-nav ml-auto" v-for="movie in relatedMovies.slice(0,10)" :key="movie.id">
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
import { movieService } from "../services/MovieService";

export default {
  name: "RelatedMovies",

  data() {
    return {
      relatedMovies: []
    };
  },

  computed: {
    ...mapGetters(["singleMovie"])
  },

  watch: {
    singleMovie(newVal, oldVal) {
      if (typeof newVal == null || typeof newVal == undefined) return;
      let params = {
        genreId: newVal.genre_id
      };
      this.getRelatedMovies(params);
    }
  },

  methods: {
    async getRelatedMovies(params) {
      const { data } = await movieService.fetchMovies(params);
      this.relatedMovies = data.filter(
        movie => movie.id != this.singleMovie.id
      );
    }
  }
};
</script>

<style>
</style>