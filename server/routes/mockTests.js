const router = require('express').Router();
const { getAllMockTests, getMockTestById, submitMockTest, generateMockTest } = require('../controllers/mockTestController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAllMockTests);
router.get('/:id', protect, getMockTestById);
router.post('/:id/submit', protect, submitMockTest);
router.post('/generate', protect, generateMockTest);

module.exports = router;
