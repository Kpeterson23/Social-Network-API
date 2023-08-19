// Import the necessary functions from the thoughtController
const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// Route to get all thoughts and create a new thought
router
  .route("/")
  .get(getAllThoughts) // Handle GET request to fetch all thoughts
  .post(createThought); // Handle POST request to create a new thought

// Route to get, update, or delete a single thought by its id
router
  .route("/:thoughtId")
  .get(getThoughtById) // Handle GET request to fetch a single thought by its id
  .put(updateThought) // Handle PUT request to update a thought
  .delete(deleteThought); // Handle DELETE request to delete a thought

// Route to add a reaction to a thought
router.route("/:thoughtId/reactions").post(addReaction); // Handle POST request to add a reaction to a thought

// Route to delete a reaction from a thought
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction); // Handle DELETE request to delete a reaction from a thought

// Export the router to make it available for use in other files
module.exports = router;
