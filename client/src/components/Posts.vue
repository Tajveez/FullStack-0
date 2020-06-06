<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <!-- Create New Post -->
    <div class="create-post">
      <label for="create-post">Add new post:</label>
      <input
        type="text"
        id="create-post"
        v-bind="text"
        placeholder="Enter something here"
      />
      <button>Create</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="post-container">
      <div class="post" v-for="post in posts" v-bind:key="post._id">
        {{ getDate(post.createdAt) }}
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
