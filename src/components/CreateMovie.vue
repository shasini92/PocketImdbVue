<template>
  <div class="col-sm-9 mt-2 px-0">
    <div class="card mr-auto">
      <div class="card-body">
        <div class="form-group mt-3">
          <div class="input-group input-group-alternative">
            <input
              class="form-control"
              placeholder="Movie Title.."
              name="title"
              type="text"
              v-model="title"
            />
          </div>
        </div>
        <div class="form-group mt-3">
          <div class="input-group input-group-alternative">
            <textarea
              rows="7"
              class="form-control"
              v-model="description"
              placeholder="Add a description..."
            ></textarea>
          </div>
        </div>
        <select class="custom-select custom-select-sm" v-model="genre_id">
          <option selected>Please select a genre:</option>
          <option v-for="genre in genres" :value="genre.id" :key="genre.id">{{genre.name}}</option>
        </select>
        <div class="form-group mt-3">
          <div class="input-group input-group-alternative">
            <input
              class="form-control"
              placeholder="Movie Image URL..."
              name="image_url"
              type="text"
              v-model="image_url"
            />
          </div>
        </div>
        <button class="btn btn-success btn-block" @click.prevent="getFromOMDb">Get data from OMDb</button>
        <button
          type="submit"
          class="btn btn-primary btn-block"
          @click.prevent="handleAddMovie"
        >Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { omdbService } from "../services/OMDbService";

export default {
  name: "CreateMovie",

  data() {
    return {
      title: "",
      description: "",
      genre_id: "Please select a genre:",
      image_url: ""
    };
  },

  computed: {
    ...mapGetters(["genres"])
  },

  methods: {
    ...mapActions(["addMovie"]),

    ...mapMutations(["SHOW_CREATE_FORM"]),

    handleAddMovie() {
      let movie = {
        title: this.title,
        description: this.description,
        genre_id: this.genre_id,
        image_url: this.image_url
      };

      this.addMovie(movie);
      this.SHOW_CREATE_FORM(false);
    },

    async getFromOMDb() {
      const data = await omdbService.fetchFromOMDb(this.title);

      this.title = data.Title;
      this.description = data.Plot;
      this.image_url = data.Poster;
    }
  }
};
</script>

<style>
</style>
