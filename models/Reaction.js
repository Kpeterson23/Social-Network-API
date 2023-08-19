// Import the required modules from mongoose and dateFormat utility
const { Schema, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// Define the reaction schema
const reactionSchema = new Schema(
  {
    // Unique ID for the reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Generate a new ObjectId
    },
    // Content of the reaction
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, // Maximum character limit
    },
    // Username of the user who created the reaction
    username: {
      type: String,
      required: true,
    },
    // Date and time when the reaction was created
    createdAt: {
      type: Date,
      default: Date.now, // Current date and time
      get: (timestamp) => dateFormat(timestamp), // Format the date using dateFormat utility
    },
  },
  {
    // Define options for serialization
    toJSON: {
      getters: true, // Include virtual getters when converting to JSON
    },
    id: false, // Exclude id field from JSON output
  }
);

// Export the reaction schema to use in other files
module.exports = reactionSchema;
