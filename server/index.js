const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Handling Production
if (process.env.NODE_ENV === "production") {
  //static folder
  app.use(express.static(__dirname + "/public/"));

  // Handling Single Page Application
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// setting API route with Express
const posts = require("./routes/api/posts");
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
