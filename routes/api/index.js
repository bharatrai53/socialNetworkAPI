const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');

// Add `/users` to created routes 
router.use('/users', userRoutes);

// Add `/thoughts` to created routes 
// router.use('/thoughts', thoughtsRoutes);

// Export Module Router
module.exports = router;