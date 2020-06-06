const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Get One post
router.get("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  res.status(200).send(
    await posts
      .find({
        _id: new mongodb.ObjectID(req.params.id),
      })
      .toArray()
  );
});

// Add post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.send(201).send();
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id),
  });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://root:tiger1@ds063715.mlab.com:63715/fullstack_0",
    {
      useUnifiedTopology: true,
    }
  );
  return client.db("fullstack_0").collection("posts");
}
module.exports = router;
