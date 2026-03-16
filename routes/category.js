const router = require('express').Router();

const { Category, Post } = require('../models'); // Imports the Category and Post models

// Route to get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error adding categories", error: error });
  }
});

module.exports = router;