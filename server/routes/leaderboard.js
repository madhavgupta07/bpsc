const router = require('express').Router();
const { getLeaderboard, getMockLeaderboard } = require('../controllers/leaderboardController');

router.get('/', getLeaderboard);
router.get('/mock/:testId', getMockLeaderboard);

module.exports = router;
