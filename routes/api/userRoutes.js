const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
  } = require('../../controllers/userControllers');

//find users and create users
router.route('/').get(getAllUsers).post(createUsers);

//add and delete users
router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

// Module export router
module.exports = router; 