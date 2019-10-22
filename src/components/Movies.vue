<template>
  <div class="col-sm-9 mt-2 px-0">
    <div class="card mr-auto">
      <div class="card-body">
        <div v-for="movie in allMovies.data" :key="movie.id">
          <div class="card my-3 hoverable" @click="handleRouting(movie.id)">
            <div class="card-header py-0">
              <div class="my-1">
                <p class="float-left my-1">{{movie.title}}</p>
                <button type="button" class="btn btn-sm btn-info float-right my-1">
                  Visits
                  <span class="badge badge-light">{{movie.visits}}</span>
                </button>
                <h5>
                  <span
                    v-if="movie.watched"
                    class="btn btn-success btn-sm float-right my-1 mr-2"
                  >Watched!</span>
                </h5>
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
            <div class="card-footer">
              <button
                class="btn btn-primary btn-sm float-right"
                @click.prevent.stop="addToWatchlist(movie.id)"
              >Add to watchlist</button>
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
    ...mapActions(["getAllMovies", "addToWatchlist"]),

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