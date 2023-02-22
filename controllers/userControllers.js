// Require Users Model
const { Users } = require('../models');

// Set up Users Controller
const usersController = {

  // Create a new User
  async createUsers({ body }, res) {
    try {
      const dbUsersData = await Users.create(body);
      res.json(dbUsersData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Get All Users
  async getAllUsers(req, res) {
    try {
      const dbUsersData = await Users.find({})
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v');
      res.json(dbUsersData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get single user by ID
  async getUsersById({ params }, res) {
    try {
      const dbUsersData = await Users.findOne({ _id: params.id })
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v');
      if (!dbUsersData) {
        res.status(404).json({ message: 'No User with this particular ID!' });
        return;
      }
      res.json(dbUsersData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a current User by ID
  async updateUsers({ params, body }, res) {
    try {
      const dbUsersData = await Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });
      if (!dbUsersData) {
        res.status(404).json({ message: 'No User with this particular ID!' });
        return;
      }
      res.json(dbUsersData);
    } catch (err) {
      res.json(err);
    }
  },

  // Delete a current user by ID
  async deleteUsers({ params }, res) {
    try {
      const dbUsersData = await Users.findOneAndDelete({ _id: params.id });
      if (!dbUsersData) {
        res.status(404).json({ message: 'No User with this particular ID!' });
        return;
      }
      res.json(dbUsersData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Add a new Friend to a User
  async addFriend({ params }, res) {
    try {
      const dbUsersData = await Users.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId } }, { new: true })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v');
      if (!dbUsersData) {
        res.status(404).json({ message: 'No User with this particular ID!' });
        return;
      }
      res.json(dbUsersData);
    } catch (err) {
      res.json(err);
    }
}
}
