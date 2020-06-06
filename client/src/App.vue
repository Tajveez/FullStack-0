<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <Posts />
  </div>
</template>

<script>
import Posts from "./components/Posts.vue";

export default {
  name: "App",
  components: {
    Posts,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Source+Sans+Pro&display=swap");
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Dancing Script", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
