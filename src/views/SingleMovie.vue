<template>
  <div class="row">
    <div class="col-sm-9 mt-2 px-0">
      <div class="card">
        <div class="card-body">
          <h3>{{singleMovie.title}}</h3>
          <br />
          <h4>Genre</h4>
          <br />
          <p>Likes and Dislikes</p>
          <br />
          <div class="card my-2">
            <div class="card-horizontal">
              <div class="img-square-wrapper my-auto">
                <img class :src="singleMovie.image_url" alt="Card image cap" />
              </div>
              <div class="card-body">
                <p class="card-text">{{singleMovie.description}}</p>
              </div>
            </div>
          </div>
          <br />
          <div class="card my-2">
            <div class="card-header">Comments</div>
            <div class="card-horizontal">
              <div class="card-body">
                <p
                  class="card-text"
                >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem eveniet sit excepturi deleniti laudantium blanditiis ullam? Inventore, aperiam rem! Facilis mollitia ipsum consequuntur laboriosam, quos cum sunt! Dolorum voluptas amet voluptatum quod, soluta numquam, voluptatibus ut exercitationem tempora vero voluptate.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PopularMovies />
  </div>
</template>

<script>
import PopularMovies from "../components/PopularMovies";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { PopularMovies },
  computed: {
    ...mapGetters(["singleMovie"])
  },
  methods: {
    ...mapActions(["getSingleMovie"])
  },
  created() {
    this.getSingleMovie(this.$route.params.id);
  }
};
</script>


<style scoped>
.card-horizontal {
  display: flex;
  flex: 1 1 auto;
}
img {
  max-height: 100%;
  max-width: 240px;
}
</style>