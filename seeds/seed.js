const sequelize = require("../config/connection");

// Import models from models directory
const { Category, Post } = require("../models");

const postData = require("./posts.json");
const categoryData = require("./categories.json");

// Function to seed the database
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Category.bulkCreate(categoryData); // Seed categories first so the posts can relat to them
    await Post.bulkCreate(postData);

    process.exit(0);
};

seedDatabase();