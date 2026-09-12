const mongoose = require('mongoose');
const UserProgress = require('../models/UserProgress');

/**
 * Shared ranking aggregation — used by the public top-N endpoint and the
 * admin full-leaderboard view. Returns every user with activity, sorted by
 * total score desc (+ accuracy as tiebreaker). No rank is attached here.
 *
 * @param {boolean} isWeekly restrict entries to the last 7 days
 * @returns {Promise<Array>} ranked rows
 */
async function buildRanks(isWeekly) {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const withinWindow = (field) => ({
    $filter: {
      input: { $ifNull: [field, []] },
      cond: isWeekly ? { $gte: ['$$this.date', since] } : true,
    },
  });

  return UserProgress.aggregate([
    {
      $project: {
        user: 1,
        quizzes: withinWindow('$quizHistory'),
        mocks: withinWindow('$mockTestHistory'),
      },
    },
    {
      $project: {
        user: 1,
        quizzesTaken: { $size: '$quizzes' },
        testsTaken: { $size: '$mocks' },
        quizScore: { $sum: '$quizzes.score' },
        quizTotal: { $sum: '$quizzes.total' },
        mockScore: { $sum: '$mocks.score' },
        mockTotal: { $sum: '$mocks.total' },
      },
    },
    {
      $group: {
        _id: '$user',
        quizzesTaken: { $sum: '$quizzesTaken' },
        testsTaken: { $sum: '$testsTaken' },
        totalScore: { $sum: { $add: ['$quizScore', '$mockScore'] } },
        totalQuestions: { $sum: { $add: ['$quizTotal', '$mockTotal'] } },
      },
    },
    { $match: { totalQuestions: { $gt: 0 } } },
    {
      $addFields: {
        accuracy: {
          $round: [
            { $multiply: [{ $divide: ['$totalScore', '$totalQuestions'] }, 100] },
            1,
          ],
        },
      },
    },
    { $sort: { totalScore: -1, accuracy: -1 } },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
        pipeline: [
          { $match: { isDeleted: { $ne: true } } },
          { $project: { name: 1, avatar: 1, 'stats.streakDays': 1, email: 1 } },
        ],
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        name: '$user.name',
        avatar: '$user.avatar',
        email: '$user.email',
        streakDays: '$user.stats.streakDays',
        quizzesTaken: 1,
        testsTaken: 1,
        totalScore: 1,
        totalQuestions: 1,
        accuracy: 1,
      },
    },
  ]);
}

/**
 * Aggregates quizHistory + mockTestHistory into per-user totals.
 *
 * GET /api/leaderboard?scope=overall|weekly&limit=10
 *   overall — all-time totals
 *   weekly  — entries from the last 7 days only
 *
 * If the request carries a valid JWT (via optionalAuth middleware),
 * the response includes a `currentUser` object with the caller's
 * rank and stats — even when they fall outside the top N.
 */
exports.getLeaderboard = async (req, res) => {
  try {
    const TOP_N = Math.min(parseInt(req.query.limit) || 10, 100);
    const isWeekly = req.query.scope === 'weekly';

    const allRows = await buildRanks(isWeekly);

    // Public view never exposes emails even though the shared builder
    // fetches them for the admin section.
    const stripEmail = (r) => {
      const { email, ...rest } = r;
      return rest;
    };

    const leaderboard = allRows.slice(0, TOP_N).map(stripEmail);

    // If the caller is authenticated, find their rank in the full list.
    let currentUser = null;
    if (req.user?._id) {
      const uid = req.user._id.toString();
      const idx = allRows.findIndex((r) => r.userId.toString() === uid);
      if (idx !== -1) {
        currentUser = { ...stripEmail(allRows[idx]), rank: idx + 1 };
      }
    }

    res.json({
      scope: isWeekly ? 'weekly' : 'overall',
      leaderboard,
      currentUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Top scorers for one mock test.
 * GET /api/leaderboard/mock/:testId?limit=50
 */
exports.getMockLeaderboard = async (req, res) => {
  try {
    const { testId } = req.params;
    if (!mongoose.isValidObjectId(testId)) {
      return res.status(400).json({ message: 'Invalid test id' });
    }
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);

    const rows = await UserProgress.aggregate([
      { $unwind: '$mockTestHistory' },
      { $match: { 'mockTestHistory.test': new mongoose.Types.ObjectId(testId) } },
      {
        $group: {
          _id: '$user',
          bestScore: { $max: '$mockTestHistory.score' },
          total: { $max: '$mockTestHistory.total' },
          attempts: { $sum: 1 },
          lastDate: { $max: '$mockTestHistory.date' },
        },
      },
      { $sort: { bestScore: -1, lastDate: 1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
          pipeline: [
            { $match: { isDeleted: { $ne: true } } },
            { $project: { name: 1, avatar: 1, 'stats.streakDays': 1 } },
          ],
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          name: '$user.name',
          avatar: '$user.avatar',
          streakDays: '$user.stats.streakDays',
          bestScore: 1,
          total: 1,
          attempts: 1,
        },
      },
    ]);

    res.json({ testId, leaderboard: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Public profile for a leaderboard user — quiz / mock-test stats only.
 * No email or other sensitive data is exposed.
 *
 * GET /api/leaderboard/user/:userId
 */
exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const User = require('../models/User');
    const user = await User.findOne({ _id: userId, isDeleted: { $ne: true } })
      .select('name avatar stats.streakDays stats.longestStreak')
      .lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    const progress = await UserProgress.findOne({ user: userId })
      .populate('quizHistory.chapter', 'title_en title_hi')
      .populate('quizHistory.topic', 'name_en name_hi')
      .populate('mockTestHistory.test', 'title_en title_hi')
      .lean();

    // Aggregate stats
    const quizHistory = progress?.quizHistory ?? [];
    const mockTestHistory = progress?.mockTestHistory ?? [];

    const quizzesTaken = quizHistory.length;
    const testsTaken = mockTestHistory.length;
    const totalQuizScore = quizHistory.reduce((s, q) => s + (q.score || 0), 0);
    const totalQuizQuestions = quizHistory.reduce((s, q) => s + (q.total || 0), 0);
    const totalMockScore = mockTestHistory.reduce((s, q) => s + (q.score || 0), 0);
    const totalMockQuestions = mockTestHistory.reduce((s, q) => s + (q.total || 0), 0);
    const totalScore = totalQuizScore + totalMockScore;
    const totalQuestions = totalQuizQuestions + totalMockQuestions;
    const accuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
    const avgQuizScore = quizzesTaken > 0
      ? Math.round(quizHistory.reduce((s, q) => s + ((q.score / q.total) * 100), 0) / quizzesTaken)
      : 0;

    // Recent entries (last 10, newest first)
    const recentQuizzes = [...quizHistory]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10)
      .map((q) => ({
        chapterTitle_en: q.chapter?.title_en || null,
        chapterTitle_hi: q.chapter?.title_hi || null,
        topicName_en: q.topic?.name_en || null,
        topicName_hi: q.topic?.name_hi || null,
        score: q.score,
        total: q.total,
        date: q.date,
      }));

    const recentMockTests = [...mockTestHistory]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10)
      .map((m) => ({
        testTitle_en: m.test?.title_en || null,
        testTitle_hi: m.test?.title_hi || null,
        score: m.score,
        total: m.total,
        date: m.date,
      }));

    res.json({
      user: { name: user.name, avatar: user.avatar },
      stats: {
        quizzesTaken,
        testsTaken,
        totalScore,
        totalQuestions,
        accuracy,
        avgQuizScore,
        streakDays: user.stats?.streakDays ?? 0,
        longestStreak: user.stats?.longestStreak ?? 0,
      },
      recentQuizzes,
      recentMockTests,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getLeaderboard: exports.getLeaderboard,
  getMockLeaderboard: exports.getMockLeaderboard,
  getUserProfile: exports.getUserProfile,
  buildRanks,
};
