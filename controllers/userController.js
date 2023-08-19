// Import necessary models
const { User, Thought } = require("../models");

// Define userController object
const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Get a single user by ID
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Update a user by ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Delete a user by ID
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }

        // Remove user from friends' arrays
        User.updateMany(
          { _id: { $in: dbUserData.friends } },
          { $pull: { friends: req.params.userId } }
        )
          .then(() => {
            // Remove user's thoughts
            Thought.deleteMany({ username: dbUserData.username })
              .then(() => {
                res.json({ message: "Successfully deleted user!" });
              })
              .catch((err) => {
                console.log(err);
                res.sendStatus(400);
              });
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Add a friend to user's friends list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }

        // Add user to friend's friends list (both users become friends)
        User.findOneAndUpdate(
          { _id: req.params.friendId },
          { $addToSet: { friends: req.params.userId } },
          { runValidators: true, new: true }
        )
          .then(() => {
            res.json({ message: "Successfully added friend!" });
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Remove a friend from user's friends list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }

        // Remove user from friend's friends list
        User.findOneAndUpdate(
          { _id: req.params.friendId },
          { $pull: { friends: req.params.userId } },
          { runValidators: true, new: true }
        )
          .then(() => {
            res.json({ message: "Successfully removed friend!" });
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};

// Export the userController object
module.exports = userController;
