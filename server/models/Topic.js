const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name_en: { type: String, required: true },
  name_hi: { type: String, required: true },
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  description_en: { type: String, default: '' },
  description_hi: { type: String, default: '' },
  subtopics: [{ type: String }],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  questionCount: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Topic', topicSchema);
