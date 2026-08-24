const router = require('express').Router();
const { getQuizByChapter, getQuizByTopic, getRandomQuiz, submitQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/auth');

router.get('/chapter/:id', protect, getQuizByChapter);
router.get('/topic/:id', protect, getQuizByTopic);
router.get('/random', protect, getRandomQuiz);
router.post('/submit', protect, submitQuiz);

module.exports = router;
