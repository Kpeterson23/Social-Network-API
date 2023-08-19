// Import required modules from mongoose and other files
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction"); // Import the reactionSchema

// Define the user schema
const userSchema = new Schema(
  {
    // Username of the user
    username: {
      type: String,
      unique: true, // Ensure usernames are unique
      required: "Username is Required", // Error message if username is missing
      trim: true, // Remove whitespace from the beginning and end
    },
    // Email of the user
    email: {
      type: String,
      unique: true, // Ensure emails are unique
      required: "Email is Required", // Error message if email is missing
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"], // Validate email format
    },
    // Array of thought references associated with the user
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought", // Reference the Thought model
      },
    ],
    // Array of user references representing friends
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference the User model (self-reference)
      },
    ],
    // Array of reactions associated with the user
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

// Create a virtual field called friendCount
userSchema.virtual("friendCount").get(function () {
  // Return the length of the friends array
  return this.friends.length;
});

// Create a model named 'User' using the userSchema
const User = model("User", userSchema);

// Export the User model to use in other files
module.exports = User;
