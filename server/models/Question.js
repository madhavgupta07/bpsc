const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_en: { type: String, required: true },
  question_hi: { type: String, required: true },
  options_en: { type: [String], required: true, validate: v => v.length === 4 },
  options_hi: { type: [String], required: true, validate: v => v.length === 4 },
  correctAnswer: { type: Number, required: true, min: 0, max: 3 },
  explanation_en: { type: String, default: '' },
  explanation_hi: { type: String, default: '' },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  year: { type: Number, default: null },
  tags: [{ type: String }],
});

questionSchema.index({ chapter: 1, topic: 1 });
questionSchema.index({ difficulty: 1 });

module.exports = mongoose.model('Question', questionSchema);
