const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');

exports.getAllChapters = async (req, res) => {
  try {
    const [chapters, allTopics] = await Promise.all([
      Chapter.find().sort('order').lean(),
      Topic.find().sort('order').lean(),
    ]);

    const topicMap = new Map();
    for (const topic of allTopics) {
      const chId = topic.chapter?.toString();
      if (!chId) continue;
      if (!topicMap.has(chId)) topicMap.set(chId, []);
      topicMap.get(chId).push(topic);
    }

    const chaptersWithCounts = chapters.map((ch) => {
      const topics = topicMap.get(ch._id.toString()) || [];
      return { ...ch, topicCount: topics.length, topics };
    });

    res.json(chaptersWithCounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id).lean();
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    const topics = await Topic.find({ chapter: chapter._id }).sort('order').lean();
    res.json({ chapter, topics });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getChapterTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ chapter: req.params.id }).sort('order').lean();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
