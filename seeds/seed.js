const sequelize = require("../config/connection");

// Import models from models directory
const { Category, User, Post } = require("../models");

const postData = require("./posts.json");
const categoryData = require("./categories.json");
const userData = require("./users.json");

// Function to seed the database
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Category.bulkCreate(categoryData); 
    await User.bulkCreate(userData);
    await Post.bulkCreate(postData);

    process.exit(0);
};

seedDatabase();