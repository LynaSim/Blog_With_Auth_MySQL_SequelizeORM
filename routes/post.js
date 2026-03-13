// create a new router
const app = require("express").Router();

const { Post } = require("../models/index");

// Route to add a new post
app.post("/", async (req, res) => {
  try {
    const { title, content, postedBy , categoryId, userId } = req.body;
    const post = await Post.create({ title, content, postedBy, categoryId, userId });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error adding post" });
  }
});

// Route to get all posts
app.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts", error });
  }
});

// export the router
module.exports = app;
