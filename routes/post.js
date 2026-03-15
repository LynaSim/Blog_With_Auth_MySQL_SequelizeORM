// create a new router
const router = require("express").Router();
const { signToken, authMiddleware } = require("../utils/auth");


const { Post, Category, User } = require("../models/index");

// Route to add a new post
router.post("/", async (req, res) => {
  try {
    const { title, content, categoryId, userId } = req.body; // removed postedBy
    const post = await Post.create({ title, content, categoryId, userId }); // removed postedBy

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

// Route to perform a join between Post, Category, and User to get posts with category name and username
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

// Route to filter posts by a specific user
router.get("/user/:userId", authMiddleware, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: {
        userId: req.params.userId
      },
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

    res.json(userPosts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts with categories", error });
  }
});

// export the router
module.exports = router;
