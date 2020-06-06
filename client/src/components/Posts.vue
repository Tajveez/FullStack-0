<template>
  <div class="container">
    <h2>Latest Posts</h2>
    <!-- Create New Post -->
    <div class="create-post">
      <label for="create-post"></label>
      <input
        type="text"
        id="create-post"
        v-model="text"
        maxlength="200"
        @keydown.enter.prevent="newPost()"
        placeholder="Add new post"
      />
      <button @click.prevent="newPost()" class="submit">
        Create
      </button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="post-container" v-if="posts.length > 0">
      <div class="post" v-for="post in posts" v-bind:key="post._id">
        <p class="text">{{ post.text }}</p>
        <div class="actions">
          <div class="date">
            {{ getDate(post.createdAt) }}
            <i @click="deletePost(post._id)" class="fas fa-trash-alt"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-else>No Posts Available</div>
  </div>
</template>

<script>
import PostService from "../PostService";
export default {
  name: "Posts",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  computed: {},
  methods: {
    getDate(date) {
      const day = date.getDate();
      const month = this.months[date.getMonth()];
      const fullYear = date.getFullYear();

      return `${day}, ${month} ${fullYear}`;
    },
    async newPost() {
      if (this.text === "") {
        this.error = "Input must not be empty";
        setTimeout(() => {
          this.error = "";
        }, 3500);
      } else {
        PostService.createPost(this.text);
        this.posts = await PostService.getPosts();
        this.text = "";
      }
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post-container {
  display: block;
  /* padding: 5px; */
}
i {
  color: black;
  margin: 5px;
  cursor: pointer;
}
.error {
  background: #f77272;
  height: auto;
  color: white;
  padding: 10px;
}
.post {
  background: #72dded;
  display: block;
  width: auto;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}
.text {
  font-size: 22px;
  font-weight: 900;
  text-align: left;
  padding-left: 15px;
}
.actions {
  text-align: right;
  padding-right: 25px;
  font-size: medium;
}
.date {
  color: gray;
}
form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #72dded;
  width: 70%;
}

button[class="submit"] {
  flex: 2;
  background: #72dded;
  color: #fff;
  border: 1px #72dded solid;
  cursor: pointer;
  height: 35px;
}
</style>
