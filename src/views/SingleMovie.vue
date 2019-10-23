<template>
  <div class="row">
    <div class="col-sm-9 mt-2 px-0">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <h3>{{singleMovie.title}}</h3>
            </div>
            <div class="col-md-6">
              <p class="float-right">Visits: {{singleMovie.visits}}</p>
            </div>
          </div>
          <br />
          <h4>Genre: {{singleMovie.genre && singleMovie.genre.name}}</h4>
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
            <div class="card-footer">
              <button
                class="btn btn-primary btn-sm float-right"
                @click.prevent.stop="addToWatchlist(singleMovie.id)"
              >Add to watchlist</button>
              <h5>
                <span
                  v-if="singleMovie.watched"
                  class="btn btn-success btn-sm float-right mr-2"
                >Watched!</span>
              </h5>
            </div>
          </div>
          <br />
          <div class="card my-2">
            <div class="card-header">Comments</div>
            <div class="card-horizontal">
              <div class="card-body">
                <div v-for="comment in comments.data" :key="comment.id">
                  <div class="card mb-2">
                    <div class="card-body">
                      <p class="card-text">{{comment.comment_body}}</p>
                    </div>
                    <div class="card-footer small">{{comment.created_at}}</div>
                  </div>
                </div>
                <button
                  v-if="moreCommentsAvailable"
                  class="btn btn-info btn-block"
                  @click.prevent="loadMoreComments"
                >Load more comments</button>
                <div class="card mt-3">
                  <div class="card-body">
                    <form @submit.prevent="addComment">
                      <p class="mt-0">Leave a comment:</p>
                      <div class="form-group mt-3">
                        <div class="input-group input-group-alternative">
                          <textarea
                            rows="4"
                            class="form-control"
                            v-model="commentBody"
                            placeholder="Enter your comment here.."
                          ></textarea>
                        </div>
                      </div>
                      <div>
                        <button
                          :disabled="isDisabled"
                          type="submit"
                          class="btn btn-primary btn-round btn-block"
                        >Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
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
import { movieService } from "../services/MovieService";
import {
  MOVIE_REACTION_DISLIKED,
  MOVIE_REACTION_LIKED
} from "../constants/reactions";

export default {
  components: { PopularMovies },

  data() {
    return {
      comments: [],
      moreCommentsAvailable: false,
      commentBody: "",
      id: this.$route.params.id
    };
  },

  computed: {
    ...mapGetters(["singleMovie"]),

    isDisabled: function() {
      if (this.commentBody) {
        return false;
      } else {
        return true;
      }
    }
  },

  watch: {
    $route(to, from) {
      this.getSingleMovie(this.$route.params.id);
    }
  },

  methods: {
    ...mapActions(["getSingleMovie", "react", "addToWatchlist"]),

    handleReact(reactionType) {
      let data = {
        reactionType,
        id: this.singleMovie.id
      };

      if (reactionType == MOVIE_REACTION_LIKED) {
        this.singleMovie.disableLike = true;
        this.singleMovie.disableDislike = false;
      }
      if (reactionType == MOVIE_REACTION_DISLIKED) {
        this.singleMovie.disableLike = false;
        this.singleMovie.disableDislike = true;
      }

      this.react(data);
    },

    async getComments(id) {
      this.comments = await movieService.fetchComments(id);
      this.checkMoreComments();
    },

    async loadMoreComments() {
      this.comments.current_page++;
      let nextPage = this.comments.current_page;
      const { data } = await movieService.fetchComments(this.id, nextPage);
      this.comments.data.push(...data);
      this.checkMoreComments();
    },

    checkMoreComments() {
      if (this.comments.current_page < this.comments.last_page) {
        this.moreCommentsAvailable = true;
      } else {
        this.moreCommentsAvailable = false;
      }
    },

    async addComment() {
      const comment = await movieService.addComment(this.id, this.commentBody);
      this.comments.data.push(comment);
      this.commentBody = "";
    }
  },

  created() {
    this.getSingleMovie(this.id);
    this.getComments(this.id);
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