<template>
  <div class="col-sm-12 px-0">
    <div class="card mt-2">
      <div class="card-body">
        <div class="row justify-content-between">
          <div class="col-md-2">
            <button
              v-if="!showBack"
              class="btn btn-primary"
              @click.prevent="showCreate"
            >Add a new Movie</button>
            <button v-if="showBack" class="btn btn-info" @click.prevent="goBack">Go Back</button>
          </div>
          <div class="form-inline col-md-3">
            <label for="genre">Filter by genre:</label>
            <select
              class="form-control ml-3"
              id="genre"
              style="width:50%"
              @change="onChange({genreId:$event.target.value})"
            >
              <option value selected>All Genres</option>
              <option v-for="genre in genres" :value="genre.id" :key="genre.id">{{genre.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "FilterByGenre",

  computed: {
    ...mapGetters(["showCreateForm", "genres"]),
    showBack() {
      return this.showCreateForm;
    }
  },

  methods: {
    ...mapMutations(["SHOW_CREATE_FORM"]),

    ...mapActions(["getGenres", "getAllMovies"]),

    goBack() {
      this.SHOW_CREATE_FORM(false);
    },

    showCreate() {
      this.SHOW_CREATE_FORM(true);
    },

    onChange(data) {
      this.getAllMovies(data);
    }
  },
  created() {
    this.getGenres();
  }
};
</script>

<style>
</style>