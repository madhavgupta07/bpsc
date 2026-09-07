const router = require('express').Router();
const { getLeaderboard, getMockLeaderboard, getUserProfile } = require('../controllers/leaderboardController');
const { optionalAuth } = require('../middleware/auth');

router.get('/', optionalAuth, getLeaderboard);
router.get('/user/:userId', getUserProfile);
router.get('/mock/:testId', getMockLeaderboard);

module.exports = router;
