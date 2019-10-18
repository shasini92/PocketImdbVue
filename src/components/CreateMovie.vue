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
              rows="8"
              class="form-control"
              v-model="description"
              placeholder="Add a description..."
            ></textarea>
          </div>
        </div>
        <select class="custom-select custom-select-sm" v-model="genre_id">
          <option selected>Please select a genre:</option>
          <option value="1">Action</option>
          <option value="2">Horror</option>
          <option value="3">Thriller</option>
          <option value="4">Sci-Fi</option>
          <option value="5">Horror</option>
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
import { mapActions, mapMutations } from "vuex";

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
    }
  }
};
</script>

<style>
</style>
