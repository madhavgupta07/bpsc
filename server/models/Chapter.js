const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  chapterNumber: { type: Number, required: true, unique: true },
  title_en: { type: String, required: true },
  title_hi: { type: String, required: true },
  slug: { type: String, unique: true, sparse: true },
  description_en: { type: String, default: '' },
  description_hi: { type: String, default: '' },
  icon: { type: String, default: '📖' },
  section: { type: String, enum: ['subject', 'pedagogy'], required: true },
  weightage: { type: Number, default: 0 },
  order: { type: Number, required: true },
});

/** Auto-generate slug from title_en if not already set. */
chapterSchema.pre('save', function (next) {
  if (!this.slug && this.title_en) {
    this.slug = this.title_en
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

/** Find a chapter by slug OR by ObjectId (for backward compatibility). */
chapterSchema.statics.findBySlugOrId = function (identifier) {
  if (mongoose.Types.ObjectId.isValid(identifier)) {
    return this.findById(identifier);
  }
  return this.findOne({ slug: identifier });
};

chapterSchema.virtual('topics', {
  ref: 'Topic',
  localField: '_id',
  foreignField: 'chapter',
});

chapterSchema.set('toJSON', { virtuals: true });
chapterSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Chapter', chapterSchema);

