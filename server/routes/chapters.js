const router = require('express').Router();
const { getAllChapters, getChapterById, getChapterTopics } = require('../controllers/chapterController');

router.get('/', getAllChapters);
router.get('/:id', getChapterById);
router.get('/:id/topics', getChapterTopics);

module.exports = router;
