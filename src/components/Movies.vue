<template>
  <div class="col-sm-9 mt-2 px-0">
    <div class="card mr-auto">
      <div class="card-body">
        <div v-for="movie in allMovies.data" :key="movie.id">
          <div class="card my-2 hoverable" @click="handleRouting(movie.id)">
            <div class="card-header py-0">
              <div class="my-1">
                <p class="float-left my-1">{{movie.title}}</p>
                <p class="float-right my-1">Rating 4.5</p>
              </div>
            </div>
            <div class="card-horizontal">
              <div class="my-auto">
                <img :src="movie.image_url" alt="Card image cap" />
              </div>
              <div class="card-body">
                <p class="card-text">{{movie.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <pagination :data="allMovies" @pagination-change-page="getAllMovies({page:$event})"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Movies",

  computed: {
    ...mapGetters(["allMovies"])
  },

  methods: {
    ...mapActions(["getAllMovies"]),

    handleRouting(id) {
      this.$router.push({ name: "movie", params: { id } });
    }
  },

  created() {
    let data = {
      page: 1,
      searchQuery: ""
    };
    this.getAllMovies(data);
  }
};
</script>

<style scoped>
.card-horizontal {
  display: flex;
  flex: 1 1 auto;
}
img {
  max-height: 240px;
  max-width: 240px;
}
.hoverable:hover {
  background: #e1e1e1;
  cursor: pointer;
}
</style>