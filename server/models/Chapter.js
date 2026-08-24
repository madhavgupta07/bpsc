const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  chapterNumber: { type: Number, required: true, unique: true },
  title_en: { type: String, required: true },
  title_hi: { type: String, required: true },
  description_en: { type: String, default: '' },
  description_hi: { type: String, default: '' },
  icon: { type: String, default: '📖' },
  section: { type: String, enum: ['subject', 'pedagogy'], required: true },
  weightage: { type: Number, default: 0 },
  order: { type: Number, required: true },
});

chapterSchema.virtual('topics', {
  ref: 'Topic',
  localField: '_id',
  foreignField: 'chapter',
});

chapterSchema.set('toJSON', { virtuals: true });
chapterSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Chapter', chapterSchema);
