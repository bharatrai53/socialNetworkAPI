// Require express router
const router = require('express').Router();

// Set requirements (from thoughts-controller)
const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtsControllers');

// get all thoughts
router.route('/').get(getAllThoughts);

// update and delete thoughts
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts); 

// create a thought
router.route('/:userId').post(createThoughts);

// reaction
router.route('/:thoughtId/reactions').post(addReaction);

// delete the reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export module router
module.exports = router;