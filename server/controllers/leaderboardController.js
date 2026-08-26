const mongoose = require('mongoose');
const UserProgress = require('../models/UserProgress');

/**
 * Aggregates quizHistory + mockTestHistory into per-user totals.
 *
 * GET /api/leaderboard?scope=overall|weekly&limit=50
 *   overall — all-time totals
 *   weekly  — entries from the last 7 days only
 */
exports.getLeaderboard = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const isWeekly = req.query.scope === 'weekly';
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const withinWindow = (field) => ({
      $filter: {
        input: { $ifNull: [field, []] },
        cond: isWeekly ? { $gte: ['$$this.date', since] } : true,
      },
    });

    const rows = await UserProgress.aggregate([
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
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
          pipeline: [{ $project: { name: 1, avatar: 1, 'stats.streakDays': 1 } }],
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
          quizzesTaken: 1,
          testsTaken: 1,
          totalScore: 1,
          totalQuestions: 1,
          accuracy: 1,
        },
      },
    ]);

    res.json({ scope: isWeekly ? 'weekly' : 'overall', leaderboard: rows });
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
          pipeline: [{ $project: { name: 1, avatar: 1, 'stats.streakDays': 1 } }],
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
