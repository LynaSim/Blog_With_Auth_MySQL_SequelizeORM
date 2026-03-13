const router = require('express').Router();

const { Category, Post } = require('../models'); // Imports the Category and Post models

// Route to get all categories
router.get("/", async (req, res) => {
  try {
    console.log("Getting all categories");
    const categories = await Category.findAll();
    console.log(categories);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error adding categories", error: error });
  }
});

// Get all posts for a specific category
// http://localhost:3001/api/categories/:id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Post }] 
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this ID.' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;