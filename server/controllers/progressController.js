const UserProgress = require('../models/UserProgress');

exports.getProgress = async (req, res) => {
  try {
    let progress = await UserProgress.findOne({ user: req.user._id })
      .populate('chapterProgress.chapter', 'title_en title_hi chapterNumber')
      .populate('quizHistory.chapter', 'title_en title_hi')
      .populate('quizHistory.topic', 'name_en name_hi')
      .populate('mockTestHistory.test', 'title_en title_hi');
    if (!progress) {
      progress = await UserProgress.create({ user: req.user._id });
    }
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { chapterId, attempted, correct, quizEntry, mockTestEntry } = req.body;
    let progress = await UserProgress.findOne({ user: req.user._id });
    if (!progress) {
      progress = await UserProgress.create({ user: req.user._id });
    }

    if (chapterId !== undefined) {
      const cp = progress.chapterProgress.find(
        (c) => c.chapter.toString() === chapterId
      );
      if (cp) {
        cp.attempted += attempted || 0;
        cp.correct += correct || 0;
        if (cp.attempted >= 10 && cp.correct / cp.attempted >= 0.7) cp.completed = true;
      } else {
        progress.chapterProgress.push({
          chapter: chapterId,
          attempted: attempted || 0,
          correct: correct || 0,
        });
      }
    }

    if (quizEntry) {
      progress.quizHistory.push(quizEntry);
    }

    if (mockTestEntry) {
      progress.mockTestHistory.push(mockTestEntry);
      // Result summary email — mock tests only (quizzes fire too often).
      if (req.user?.email) {
        const { sendMail, configured } = require('../config/mailer');
        const { resultEmail } = require('../utils/emailTemplates');
        if (configured && sendMail) {
          sendMail(resultEmail(req.user, mockTestEntry));
        }
      }
    }

    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const progress = await UserProgress.findOne({ user: req.user._id });
    if (!progress) return res.json({ totalAttempted: 0, totalCorrect: 0, avgScore: 0, quizzesTaken: 0 });

    const totalAttempted = progress.chapterProgress.reduce((s, c) => s + c.attempted, 0);
    const totalCorrect = progress.chapterProgress.reduce((s, c) => s + c.correct, 0);
    const quizzesTaken = progress.quizHistory.length;
    const avgScore = quizzesTaken > 0
      ? progress.quizHistory.reduce((s, q) => s + (q.score / q.total) * 100, 0) / quizzesTaken
      : 0;

    res.json({ totalAttempted, totalCorrect, avgScore: Math.round(avgScore), quizzesTaken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
