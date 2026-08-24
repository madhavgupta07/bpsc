const MockTest = require('../models/MockTest');
const Question = require('../models/Question');

exports.getAllMockTests = async (req, res) => {
  try {
    const tests = await MockTest.find({ isActive: true }).select('-questions');
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMockTestById = async (req, res) => {
  try {
    const test = await MockTest.findById(req.params.id).populate('questions', '-correctAnswer -explanation_en -explanation_hi');
    if (!test) return res.status(404).json({ message: 'Mock test not found' });
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitMockTest = async (req, res) => {
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

exports.generateMockTest = async (req, res) => {
  try {
    const { type, chapterId, count } = req.body;
    const questionCount = Math.min(count || 150, 150);
    let match = {};
    if (type === 'chapter' && chapterId) {
      match.chapter = chapterId;
    }
    const questions = await Question.aggregate([
      { $match: match },
      { $sample: { size: questionCount } },
    ]);
    const safe = questions.map(({ correctAnswer, explanation_en, explanation_hi, ...rest }) => rest);
    res.json({ questions: safe, total: questions.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
