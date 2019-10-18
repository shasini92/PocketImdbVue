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
            <select class="form-control ml-3" id="genre" style="width:50%">
              <option selected>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "FilterByGenre",

  data() {
    return {
      showBack: false
    };
  },

  methods: {
    ...mapMutations(["SHOW_CREATE_FORM"]),

    goBack() {
      this.SHOW_CREATE_FORM(false);
      this.showBack = false;
    },

    showCreate() {
      this.SHOW_CREATE_FORM(true);
      this.showBack = true;
    }
  }
};
</script>

<style>
</style>