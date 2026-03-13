// import all models
const Post = require("./post");
const Category = require("./category");
const User = require("./user");

// mapping all relationships between models

User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "userId",
});

Category.hasMany(Post, {
  foreignKey: 'categoryId',
});

Post.belongsTo(Category, {
  foreignKey: 'categoryId',
}); 

// export models
module.exports = {
  Post,
  Category,
  User,
};