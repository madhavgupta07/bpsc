const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    body_en: { type: String, trim: true, maxlength: 5000 },
    body_hi: { type: String, trim: true, maxlength: 5000 },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isAccepted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const forumPostSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title_en: { type: String, required: true, trim: true, maxlength: 200 },
    title_hi: { type: String, trim: true, maxlength: 200 },
    body_en: { type: String, required: true, trim: true, maxlength: 10000 },
    body_hi: { type: String, trim: true, maxlength: 10000 },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', default: null },
    tags: [{ type: String, trim: true, lowercase: true, maxlength: 30 }],
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    views: { type: Number, default: 0 },
    isResolved: { type: Boolean, default: false },
    answers: [answerSchema],
  },
  { timestamps: true },
);

forumPostSchema.index({ createdAt: -1 });
forumPostSchema.index({ chapter: 1, createdAt: -1 });

module.exports = mongoose.model('ForumPost', forumPostSchema);