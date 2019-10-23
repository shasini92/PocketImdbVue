<template>
  <div>
    <div class="row">
      <FilterByGenre />
    </div>
    <div class="row">
      <Movies v-if="!showCreateForm && !showWatchlist " />
      <CreateMovie v-if="showCreateForm" />
      <Watchlist v-if="showWatchlist" />
      <PopularMovies />
    </div>
  </div>
</template>

<script>
import FilterByGenre from "../components/FilterByGenre";
import Movies from "../components/Movies";
import PopularMovies from "../components/PopularMovies";
import CreateMovie from "../components/CreateMovie";
import Watchlist from "../components/Watchlist";
import { mapGetters } from "vuex";

export default {
  components: { FilterByGenre, Movies, PopularMovies, CreateMovie, Watchlist },

  computed: {
    ...mapGetters(["showCreateForm", "showWatchlist"])
  }
};
</script>

<style>
</style>