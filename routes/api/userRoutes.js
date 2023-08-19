// Import the necessary functions from the userController
const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// Route to get all users and create a new user
router
  .route("/")
  .get(getAllUsers) // Handle GET request to fetch all users
  .post(createUser); // Handle POST request to create a new user

// Route to get, update, or delete a single user by their id
router
  .route("/:userId")
  .get(getUserById) // Handle GET request to fetch a single user by their id
  .put(updateUser) // Handle PUT request to update a user
  .delete(deleteUser); // Handle DELETE request to delete a user

// Route to add a friend or remove a friend for a user
router
  .route("/:userId/friends/:friendId")
  .post(addFriend) // Handle POST request to add a friend to a user
  .delete(removeFriend); // Handle DELETE request to remove a friend from a user

// Export the router to make it available for use in other files
module.exports = router;
