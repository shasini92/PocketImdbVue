<template>
  <div>
    <div class="row">
      <FilterByGenre />
    </div>
    <div class="row">
      <Movies v-if="!showCreateForm" />
      <CreateMovie v-if="showCreateForm" />
      <PopularMovies />
    </div>
  </div>
</template>

<script>
import FilterByGenre from "../components/FilterByGenre";
import Movies from "../components/Movies";
import PopularMovies from "../components/PopularMovies";
import CreateMovie from "../components/CreateMovie";
import { mapGetters } from "vuex";

export default {
  components: { FilterByGenre, Movies, PopularMovies, CreateMovie },

  computed: {
    ...mapGetters(["showCreateForm"])
  }
};
</script>

<style>
</style>