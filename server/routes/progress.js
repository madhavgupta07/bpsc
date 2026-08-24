const router = require('express').Router();
const { getProgress, updateProgress, getStats } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getProgress);
router.post('/', protect, updateProgress);
router.get('/stats', protect, getStats);

module.exports = router;
