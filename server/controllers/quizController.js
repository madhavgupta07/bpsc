const Question = require('../models/Question');

exports.getQuizByChapter = async (req, res) => {
  try {
    const count = Math.min(parseInt(req.query.count) || 10, 50);
    const questions = await Question.aggregate([
      { $match: { chapter: require('mongoose').Types.ObjectId.createFromHexString(req.params.id) } },
      { $sample: { size: count } },
    ]);
    const safe = questions.map(({ correctAnswer, explanation_en, explanation_hi, ...rest }) => rest);
    res.json({ questions: safe, total: questions.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuizByTopic = async (req, res) => {
  try {
    const count = Math.min(parseInt(req.query.count) || 10, 50);
    const questions = await Question.aggregate([
      { $match: { topic: require('mongoose').Types.ObjectId.createFromHexString(req.params.id) } },
      { $sample: { size: count } },
    ]);
    const safe = questions.map(({ correctAnswer, explanation_en, explanation_hi, ...rest }) => rest);
    res.json({ questions: safe, total: questions.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRandomQuiz = async (req, res) => {
  try {
    const count = Math.min(parseInt(req.query.count) || 10, 50);
    const questions = await Question.aggregate([{ $sample: { size: count } }]);
    const safe = questions.map(({ correctAnswer, explanation_en, explanation_hi, ...rest }) => rest);
    res.json({ questions: safe, total: questions.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers array required' });
    }

    let score = 0;
    const results = [];
    for (const ans of answers) {
      const q = await Question.findById(ans.questionId);
      if (q) {
        const isCorrect = q.correctAnswer === ans.selected;
        if (isCorrect) score++;
        results.push({
          question: q._id,
          correct: isCorrect,
          correctAnswer: q.correctAnswer,
          explanation_en: q.explanation_en,
          explanation_hi: q.explanation_hi,
        });
      }
    }
    res.json({ score, total: answers.length, results });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
