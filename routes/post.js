// create a new router
const router = require("express").Router();

const { Post, Category, User } = require("../models/index");

// Route to add a new post
router.post("/", async (req, res) => {
  try {
    const { title, content, postedBy , categoryId, userId } = req.body;
    const post = await Post.create({ title, content, postedBy, categoryId, userId });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error adding post" });
  }
});

// Route to get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts", error });
  }
});

// Route to perform a join between Post and Category to get posts with category names
router.get("/with-details", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
        model: Category,
        attributes: ["categoryName"]
      },
      {
        model: User,
        attributes: ["username"]
      }
    ]
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts with categories", error });
  }
});


// export the router
module.exports = router;
