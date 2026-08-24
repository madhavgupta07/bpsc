const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');

exports.getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find().sort('order');
    const chaptersWithCounts = await Promise.all(
      chapters.map(async (ch) => {
        const topics = await Topic.find({ chapter: ch._id });
        return { ...ch.toObject(), topicCount: topics.length, topics };
      })
    );
    res.json(chaptersWithCounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    const topics = await Topic.find({ chapter: chapter._id }).sort('order');
    res.json({ chapter, topics });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChapterTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ chapter: req.params.id }).sort('order');
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
