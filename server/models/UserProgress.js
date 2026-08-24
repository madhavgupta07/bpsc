const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  chapterProgress: [
    {
      chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
      attempted: { type: Number, default: 0 },
      correct: { type: Number, default: 0 },
      completed: { type: Boolean, default: false },
    },
  ],
  quizHistory: [
    {
      topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
      chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
      score: Number,
      total: Number,
      date: { type: Date, default: Date.now },
      timeTaken: Number,
      answers: [
        {
          question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
          selected: Number,
          correct: Boolean,
        },
      ],
    },
  ],
  mockTestHistory: [
    {
      test: { type: mongoose.Schema.Types.ObjectId, ref: 'MockTest' },
      score: Number,
      total: Number,
      date: { type: Date, default: Date.now },
      timeTaken: Number,
    },
  ],
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
