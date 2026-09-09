const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/forumController');
const { protect, optionalAuth } = require('../middleware/auth');

// Public reads (optionalAuth personalises upvote state for logged-in users)
router.get('/', optionalAuth, ctrl.list);
router.get('/:id', optionalAuth, ctrl.get);

// Authenticated mutations
router.post('/', protect, ctrl.create);
router.post('/:id/upvote', protect, ctrl.toggleUpvote);
router.post('/:id/answers', protect, ctrl.addAnswer);
router.post('/:id/answers/:answerId/upvote', protect, ctrl.toggleAnswerUpvote);
router.post('/:id/solved', protect, ctrl.toggleSolved);
router.delete('/:id', protect, ctrl.remove);

module.exports = router;