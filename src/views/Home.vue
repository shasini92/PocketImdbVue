<template>
  <div>
    <div class="row">
      <FilterByGenre />
    </div>
    <div class="row">
      <Movies />
      <PopularMovies />
    </div>
  </div>
</template>

<script>
import FilterByGenre from "../components/FilterByGenre";
import Movies from "../components/Movies";
import PopularMovies from "../components/PopularMovies";

export default {
  components: { FilterByGenre, Movies, PopularMovies }
};
</script>

<style>
</style>