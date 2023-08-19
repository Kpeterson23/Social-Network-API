// Import required modules from mongoose and other files
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction"); // Import the reactionSchema
const dateFormat = require("../utils/dateFormat"); // Import the dateFormat utility

// Define the thought schema
const thoughtSchema = new Schema(
  {
    // Text content of the thought
    thoughtText: {
      type: String,
      required: true,
      minlength: 1, // Minimum character limit
      maxlength: 280, // Maximum character limit
    },
    // Date and time when the thought was created
    createdAt: {
      type: Date,
      default: Date.now, // Current date and time
      get: (timestamp) => dateFormat(timestamp), // Format the date using dateFormat utility
    },
    // Username of the user who created the thought
    username: {
      type: String,
      required: true,
    },
    // Array of reactions associated with the thought
    reactions: [reactionSchema], // Use the imported reactionSchema
  },
  {
    // Define options for serialization
    toJSON: {
      virtuals: true, // Include virtual fields when converting to JSON
      getters: true, // Include virtual getters when converting to JSON
    },
    id: false, // Exclude id field from JSON output
  }
);

// Create a virtual field called reactionCount
thoughtSchema.virtual("reactionCount").get(function () {
  // Return the length of the reactions array
  return this.reactions.length;
});

// Create a model named 'Thought' using the thoughtSchema
const Thought = model("Thought", thoughtSchema);

// Export the Thought model to use in other files
module.exports = Thought;
