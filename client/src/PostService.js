import axios from "axios";

const url = "http://localhost:5000/api/posts/";

class PostService {
  // Get Single Post
  static getSinglePosts(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}${id}`)
        .then((res) => {
          const data = res.data;
          resolve(
            data.map((post) => ({
              ...post,
              createdAt: new Date(post.createdAt),
            }))
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Get All Posts
  static getPosts() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${url}`)
        .then((res) => {
          const data = res.data;
          resolve(
            data.map((post) => ({
              ...post,
              createdAt: new Date(post.createdAt),
            }))
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Create Post
  static createPost(text) {
    return axios.post(url, {
      text,
    });
  }

  // Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
