const {
  User,
  Category,
  BlogPost,
  PostCategory,
} = require("../../src/database/models");
const { insert, result } = require("./queries");

const registerUser = async () => {
  const { displayName, email, password, image } = insert.user;
  const userCreated = await User.create({
    displayName,
    email,
    password,
    image,
  });

  return userCreated;
};
const registerCategory = () => {};
const registerBlogPosty = () => {};
const registerPostCategory = () => {};

module.exports = {
  registerUser,
  registerCategory,
  registerBlogPosty,
  registerPostCategory,
};
