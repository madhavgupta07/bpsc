const mongoose = require('mongoose');
const ForumPost = require('../models/ForumPost');

const PAGE_SIZE = 20;

/** Escape user input before using it in a RegExp (mongoose.escape does not exist). */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Pick the language-aware field name (client sends which language a body is in). */
function lf(lang, base) {
  return lang === 'hi' ? `${base}_hi` : `${base}_en`;
}

/** Promote a lean post to include the booleans the UI needs. */
function decorate(post, userId) {
  if (!post) return post;
  const uid = userId ? String(userId) : null;
  post.upvotedByMe = uid ? (post.upvotes || []).some((v) => String(v) === uid) : false;
  post.upvoteCount = (post.upvotes || []).length;
  post.answerCount = (post.answers || []).length;
  for (const a of post.answers || []) {
    a.upvotedByMe = uid ? a.upvotes.some((v) => String(v) === uid) : false;
    a.upvoteCount = (a.upvotes || []).length;
  }
  return post;
}

/* ---------------------------- Read ---------------------------- */

/** Paginated list with chapter filter + keyword search + latest/top sorting. */
exports.list = async (req, res) => {
  try {
    const { chapter, sort = 'latest', q = '', page = 1 } = req.query;
    const currentPage = Math.max(1, parseInt(page, 10) || 1);

    const viewer = req.user?._id ? new mongoose.Types.ObjectId(req.user._id) : null;
    const match = {};
    if (chapter && mongoose.Types.ObjectId.isValid(chapter)) match.chapter = new mongoose.Types.ObjectId(chapter);
    const qs = q.trim();
    if (qs) {
      const r = new RegExp(escapeRegExp(qs), 'i');
      match.$or = [{ title_en: r }, { title_hi: r }, { body_en: r }, { body_hi: r }];
    }

    const sortStage =
      sort === 'top'
        ? { score: -1, createdAt: -1 }
        : { createdAt: -1 };

    const [result] = await ForumPost.aggregate([
      { $match: match },
      {
        $addFields: {
          score: { $size: { $ifNull: ['$upvotes', []] } },
          answerCount: { $size: { $ifNull: ['$answers', []] } },
          upvotedByMe: viewer ? { $in: [viewer, { $ifNull: ['$upvotes', []] }] } : false,
        },
      },
      { $sort: sortStage },
      {
        $facet: {
          data: [{ $skip: (currentPage - 1) * PAGE_SIZE }, { $limit: PAGE_SIZE }],
          total: [{ $count: 'n' }],
        },
      },
    ]);

    const data = (result?.data || []).map((p) => {
      p.upvoteCount = p.score;
      return p;
    });
    const posts = await ForumPost.populate(data, [
      { path: 'author', select: 'name avatar' },
      { path: 'chapter', select: 'chapterNumber title_en title_hi' },
    ]);
    const total = result?.total?.[0]?.n ?? 0;

    res.json({ posts, total, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/** Single post (increments views) with full populated answers. */
exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Post not found' });

    const post = await ForumPost.findById(id)
      .populate('author', 'name avatar')
      .populate('chapter', 'chapterNumber title_en title_hi')
      .populate('answers.author', 'name avatar')
      .lean();

    if (!post) return res.status(404).json({ message: 'Post not found' });

    ForumPost.updateOne({ _id: id }, { $inc: { views: 1 } }).catch(() => {});
    post.views += 1;

    res.json({ post: decorate(post, req.user?._id) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------------------- Write ---------------------------- */

exports.create = async (req, res) => {
  try {
    const { title, body, chapter = null, tags = [], lang = 'en' } = req.body;
    if (!title?.trim() || !body?.trim()) {
      return res.status(400).json({ message: 'Title and body are required' });
    }
    const post = await ForumPost.create({
      author: req.user._id,
      [lf(lang, 'title')]: title.trim().slice(0, 200),
      [lf(lang, 'body')]: body.trim().slice(0, 10000),
      chapter: chapter && mongoose.Types.ObjectId.isValid(chapter) ? chapter : null,
      tags: (tags || []).map((s) => String(s).trim().replace(/^#/, '').slice(0, 30)).filter(Boolean).slice(0, 6),
    });
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleUpvote = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await ForumPost.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const idx = post.upvotes.findIndex((v) => String(v) === String(req.user._id));
    if (idx >= 0) post.upvotes.splice(idx, 1);
    else post.upvotes.push(req.user._id);
    await post.save();

    res.json({ upvoted: idx < 0, count: post.upvotes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, lang = 'en' } = req.body;
    if (!body?.trim()) return res.status(400).json({ message: 'Answer body is required' });

    const post = await ForumPost.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const answer = {
      author: req.user._id,
      [lf(lang, 'body')]: body.trim().slice(0, 5000),
      upvotes: [],
    };
    post.answers.push(answer);
    await post.save();

    await post.populate('answers.author', 'name avatar');
    res.status(201).json({ answer: decorate(post, req.user._id).answers[post.answers.length - 1] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleAnswerUpvote = async (req, res) => {
  try {
    const { id, answerId } = req.params;
    const post = await ForumPost.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const answer = post.answers.id(answerId);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    const idx = answer.upvotes.findIndex((v) => String(v) === String(req.user._id));
    if (idx >= 0) answer.upvotes.splice(idx, 1);
    else answer.upvotes.push(req.user._id);
    await post.save();

    res.json({ upvoted: idx < 0, count: answer.upvotes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleSolved = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await ForumPost.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (String(post.author) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only the author can mark this resolved' });
    }
    post.isResolved = !post.isResolved;
    await post.save();
    res.json({ isResolved: post.isResolved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await ForumPost.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (String(post.author) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only delete your own posts' });
    }
    await post.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};