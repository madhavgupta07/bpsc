const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');
const admin = require('../controllers/adminController');

router.use(protect, adminOnly);

/* Stats */
router.get('/stats', admin.getStats);

/* Users */
router.get('/users', admin.listUsers);
router.put('/users/:id/role', admin.setUserRole);

/* Chapters */
router.route('/chapters')
  .get(admin.listChapters)
  .post(admin.createChapter);
router.route('/chapters/:id')
  .put(admin.updateChapter)
  .delete(admin.deleteChapter);

/* Questions */
router.get('/questions', admin.listQuestions);
router.post('/questions', admin.createQuestion);
router.route('/questions/:id')
  .put(admin.updateQuestion)
  .delete(admin.deleteQuestion);

/* Mock tests */
router.get('/mock-tests', admin.listMockTests);
router.post('/mock-tests', admin.createMockTest);
router.route('/mock-tests/:id')
  .put(admin.updateMockTest)
  .delete(admin.deleteMockTest);

module.exports = router;
