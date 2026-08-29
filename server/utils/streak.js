/**
 * Streak tracking helper.
 *
 * Tracks a user's daily activity streak from `stats.lastActive`.
 * Rules:
 *  - no prior activity              -> streak becomes 1
 *  - last activity was today        -> streak unchanged (still active)
 *  - last activity was yesterday    -> streak increments by 1
 *  - last activity is older         -> streak resets to 1
 * `longestStreak` is kept at the highest streak ever seen.
 *
 * Mutates the passed `stats` object and returns it.
 */
const DAY = 24 * 60 * 60 * 1000;

function startOfUtcDay(d) {
  const x = d instanceof Date ? d : new Date(d);
  return Date.UTC(x.getUTCFullYear(), x.getUTCMonth(), x.getUTCDate());
}

function wholeDaysBetween(a, b) {
  const A = startOfUtcDay(a);
  const B = startOfUtcDay(b);
  return Math.round((B - A) / DAY);
}

function trackActivity(stats, now = new Date()) {
  const last = stats && stats.lastActive ? new Date(stats.lastActive) : null;
  let streak = stats?.streakDays || 0;

  if (!last) {
    streak = 1;
  } else {
    const diff = wholeDaysBetween(last, now);
    if (diff === 1) {
      streak += 1;
    } else if (diff > 1) {
      streak = 1;
    }
    // diff === 0 (same day) -> streak unchanged
  }

  stats.streakDays = streak;
  stats.longestStreak = Math.max(stats.longestStreak || 0, streak);
  stats.lastActive = now;
  return stats;
}

module.exports = { trackActivity };
