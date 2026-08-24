const mongoose = require('mongoose');

const mockTestSchema = new mongoose.Schema({
  title_en: { type: String, required: true },
  title_hi: { type: String, required: true },
  description_en: { type: String, default: '' },
  description_hi: { type: String, default: '' },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  duration: { type: Number, default: 150 },
  totalMarks: { type: Number, default: 150 },
  type: { type: String, enum: ['full', 'section', 'chapter'], required: true },
  section: { type: String, default: null },
  chapterRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', default: null },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MockTest', mockTestSchema);
