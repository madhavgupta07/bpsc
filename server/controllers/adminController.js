const mongoose = require('mongoose');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Question = require('../models/Question');
const MockTest = require('../models/MockTest');
const User = require('../models/User');
const UserProgress = require('../models/UserProgress');

/* ---------------- Dashboard stats ---------------- */

exports.getStats = async (_, res) => {
  try {
    const [users, chapters, topics, questions, mockTests] = await Promise.all([
      User.countDocuments(),
      Chapter.countDocuments(),
      Topic.countDocuments(),
      Question.countDocuments(),
      MockTest.countDocuments(),
    ]);

    const attemptAgg = await UserProgress.aggregate([
      {
        $project: {
          quizzes: { $size: { $ifNull: ['$quizHistory', []] } },
          mocks: { $size: { $ifNull: ['$mockTestHistory', []] } },
        },
      },
      {
        $group: {
          _id: null,
          quizAttempts: { $sum: '$quizzes' },
          mockAttempts: { $sum: '$mocks' },
        },
      },
    ]);

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role createdAt stats.streakDays');

    res.json({
      counts: { users, chapters, topics, questions, mockTests },
      attempts: attemptAgg[0] || { quizAttempts: 0, mockAttempts: 0 },
      recentUsers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- Users ---------------- */

exports.listUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const filter = {};
    if (req.query.search) {
      const rx = new RegExp(req.query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ name: rx }, { email: rx }];
    }
    const [users, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('name email role avatar createdAt stats.streakDays'),
      User.countDocuments(filter),
    ]);
    res.json({ users, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.setUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot change your own role' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true },
    ).select('name email role');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- Chapters CRUD ---------------- */

exports.listChapters = async (_, res) => {
  try {
    const chapters = await Chapter.find().sort({ order: 1, chapterNumber: 1 }).lean();
    const counts = await Question.aggregate([
      { $group: { _id: '$chapter', count: { $sum: 1 } } },
    ]);
    const byChapter = Object.fromEntries(counts.map((c) => [c._id.toString(), c.count]));
    res.json(
      chapters.map((c) => ({ ...c, questionCount: byChapter[c._id.toString()] || 0 })),
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createChapter = async (req, res) => {
  try {
    const chapter = await Chapter.create(req.body);
    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    res.json(chapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    // Cascade: remove dependent content so orphan docs don't linger.
    await Promise.all([
      Topic.deleteMany({ chapter: chapter._id }),
      Question.deleteMany({ chapter: chapter._id }),
      MockTest.deleteMany({ chapterRef: chapter._id }),
    ]);
    res.json({ message: 'Chapter and related topics/questions/tests removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- Questions CRUD ---------------- */

exports.listQuestions = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const filter = {};
    if (req.query.chapter && mongoose.isValidObjectId(req.query.chapter)) {
      filter.chapter = req.query.chapter;
    }
    if (['easy', 'medium', 'hard'].includes(req.query.difficulty)) {
      filter.difficulty = req.query.difficulty;
    }
    const [questions, total] = await Promise.all([
      Question.find(filter)
        .sort({ _id: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('chapter', 'title_en chapterNumber')
        .populate('topic', 'name_en'),
      Question.countDocuments(filter),
    ]);
    res.json({ questions, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    await syncTopicCount(question.topic);
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    const prevTopic = question.topic;
    Object.assign(question, req.body);
    await question.save();
    if (String(prevTopic) !== String(question.topic)) {
      await syncTopicCount(prevTopic);
      await syncTopicCount(question.topic);
    }
    res.json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    if (question.topic) await syncTopicCount(question.topic);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** Keeps Topic.questionCount accurate after question writes. */
async function syncTopicCount(topicId) {
  if (!topicId) return;
  const count = await Question.countDocuments({ topic: topicId });
  await Topic.findByIdAndUpdate(topicId, { questionCount: count }).catch(() => {});
}

/* ---------------- Mock tests CRUD ---------------- */

exports.listMockTests = async (_, res) => {
  try {
    const tests = await MockTest.find()
      .sort({ createdAt: -1 })
      .populate('chapterRef', 'title_en chapterNumber')
      .select('title_en title_hi description_en description_hi duration totalMarks type section chapterRef isActive questions createdAt')
      .lean();
    res.json(tests.map((t) => ({ ...t, questionCount: t.questions?.length || 0, questions: undefined })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Creates a mock test. Question pool can be chosen two ways:
 *  - { questionIds: [...] }          — explicit selection
 *  - { sampleCount: n, chapterId? }  — random sample (optionally per-chapter)
 */
exports.createMockTest = async (req, res) => {
  try {
    const {
      title_en,
      title_hi,
      description_en = '',
      description_hi = '',
      duration,
      totalMarks,
      type = 'full',
      section = null,
      chapterRef = null,
      isActive = true,
      questionIds,
      sampleCount,
    } = req.body;

    let questions = [];
    if (Array.isArray(questionIds) && questionIds.length > 0) {
      questions = await Question.find({ _id: { $in: questionIds } }).select('_id');
    } else if (sampleCount > 0) {
      const match = chapterRef ? { chapter: chapterRef } : {};
      questions = await Question.aggregate([
        { $match: match },
        { $sample: { size: Math.min(Number(sampleCount), 200) } },
        { $project: { _id: 1 } },
      ]);
    }
    if (questions.length === 0) {
      return res.status(400).json({ message: 'No questions selected — add questionIds or a sampleCount' });
    }

    const qIds = questions.map((q) => q._id);
    const test = await MockTest.create({
      title_en,
      title_hi: title_hi || title_en,
      description_en,
      description_hi,
      questions: qIds,
      duration: duration || qIds.length,
      totalMarks: totalMarks || qIds.length,
      type,
      section,
      chapterRef: chapterRef || null,
      isActive,
    });
    res.status(201).json(test);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMockTest = async (req, res) => {
  try {
    const test = await MockTest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!test) return res.status(404).json({ message: 'Mock test not found' });
    res.json(test);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMockTest = async (req, res) => {
  try {
    const test = await MockTest.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: 'Mock test not found' });
    res.json({ message: 'Mock test deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
