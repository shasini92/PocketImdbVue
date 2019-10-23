<template>
  <div class="col-sm-9 mt-2 px-0">
    <div class="card mr-auto">
      <div class="card-body">
        <h1>Watchlist</h1>
        <h4 class="mt-4" v-if="!moviesInWatchlist">You don't have movies in your watchlist.</h4>
        <div v-for="movie in watchlist" :key="movie.id">
          <div class="card my-2 hoverable" @click="handleRouting(movie.id)">
            <div class="card-header py-0">
              <div class="my-1">
                <p class="float-left my-1">{{movie.title}}</p>
                <h5>
                  <span
                    v-if="movie.pivot.watched"
                    class="btn btn-success btn-sm float-right my-1"
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
                class="btn btn-danger btn-sm float-right ml-auto"
                @click.prevent.stop="removeFromWatchlist(movie.id)"
              >Remove</button>
              <button
                v-if="!movie.pivot.watched"
                class="btn btn-primary btn-sm float-right mr-2"
                @click.prevent.stop="markAsWatched(movie.id)"
              >Mark as watched</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { omdbService } from "../services/OMDbService";

export default {
  name: "Watchlist",

  computed: {
    ...mapGetters(["watchlist"]),

    moviesInWatchlist() {
      return this.watchlist.length >= 1;
    }
  },

  methods: {
    ...mapActions(["getWatchlist", "markAsWatched", "removeFromWatchlist"]),

    handleRouting(id) {
      this.$router.push({ name: "movie", params: { id } });
    }
  },

  created() {
    this.getWatchlist();
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
