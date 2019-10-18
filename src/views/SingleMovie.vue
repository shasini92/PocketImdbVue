<template>
  <div class="row">
    <div class="col-sm-9 mt-2 px-0">
      <div class="card">
        <div class="card-body">
          <h3>{{singleMovie.title}}</h3>
          <br />
          <h4>Genre</h4>
          <br />
          <button class="btn-outline-success">
            <span class="badge badge-pill badge-success">{{singleMovie.likes}}</span>
          </button>
          <button class="ml-3 btn-outline-danger">
            <span class="badge badge-pill badge-danger">{{singleMovie.dislikes}}</span>
          </button>
          <br />
          <br />
          <button
            class="like"
            @click.prevent="handleReact('liked')"
            :disabled="singleMovie.disableLike"
          >
            <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
          </button>
          <button
            class="dislike ml-4"
            @click.prevent="handleReact('disliked')"
            :disabled="singleMovie.disableDislike"
          >
            <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
          </button>
          <br />
          <div class="card mb-2 mt-4">
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

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["singleMovie"])
  },

  methods: {
    ...mapActions(["getSingleMovie", "react"]),

    handleReact(reactionType) {
      let data = {
        reactionType,
        id: this.singleMovie.id
      };

      if (reactionType == "liked") {
        this.singleMovie.disableLike = true;
        this.singleMovie.disableDislike = false;
      }
      if (reactionType == "disliked") {
        this.singleMovie.disableLike = false;
        this.singleMovie.disableDislike = true;
      }

      this.react(data);
    }
  },

  created() {
    let id = this.$route.params.id;

    this.getSingleMovie(id);
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

button.like {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border-radius: 50%;
  color: rgba(0, 150, 136, 1);
  background-color: rgba(38, 166, 154, 0.3);
  border-color: rgba(0, 150, 136, 1);
  border-width: 1px;
  font-size: 15px;
}

button.like:hover {
  width: 35px;
  height: 35px;
}

button.dislike {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border-radius: 50%;
  color: rgba(255, 82, 82, 1);
  background-color: rgba(255, 138, 128, 0.3);
  border-color: rgba(255, 82, 82, 1);
  border-width: 1px;
  font-size: 15px;
}

button.dislike:hover {
  width: 35px;
  height: 35px;
}

button.learnmore {
  width: 100%;
  padding: 10px;
  border: none;
  background: rgba(0, 151, 167, 1);
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 16px;
  color: #fff;
  letter-spacing: 1px;
}
</style>