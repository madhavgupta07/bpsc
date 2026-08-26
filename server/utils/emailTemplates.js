const BRAND = '#4f46e5';

const layout = (title, bodyHtml, cta) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Segoe UI,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(15,23,42,.08);">
        <tr>
          <td style="background:${BRAND};padding:20px 28px;color:#fff;font-size:18px;font-weight:700;">
            🎓 Bihar STET CS
          </td>
        </tr>
        <tr>
          <td style="padding:28px;color:#0f172a;">
            <h2 style="margin:0 0 14px;font-size:20px;">${title}</h2>
            ${bodyHtml}
            ${cta ? `
            <p style="margin:26px 0 6px;">
              <a href="${cta.url}" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 26px;border-radius:10px;">${cta.label}</a>
            </p>` : ''}
          </td>
        </tr>
        <tr>
          <td style="padding:16px 28px;background:#f8fafc;color:#94a3b8;font-size:12px;">
            You are receiving this because you have an account on Bihar STET CS.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const pct = (score, total) => (total > 0 ? Math.round((score / total) * 100) : 0);

exports.welcomeEmail = (user) => ({
  to: user.email,
  subject: 'Welcome to Bihar STET CS 🎓 / स्वागत है',
  html: layout(
    `Welcome, ${user.name}! / स्वागत है`,
    `
    <p style="margin:0 0 12px;line-height:1.6;color:#334155;">
      Your account is ready. Prepare for the Bihar STET Computer Science exam with:
    </p>
    <ul style="margin:0 0 12px;line-height:1.8;color:#334155;">
      <li>📘 Bilingual chapter notes — द्विभाषी नोट्स</li>
      <li>🎯 Chapter & topic quizzes</li>
      <li>📝 Full-length mock tests with exam-style timer</li>
      <li>🔥 Daily streaks and progress tracking</li>
    </ul>
    <p style="margin:0;line-height:1.6;color:#334155;">
      Start today — consistency beats cramming!<br/>आज ही शुरू करें — निरंतरता सफलता की कुंजी है!
    </p>`,
    { url: process.env.CLIENT_URL || '', label: 'Start Learning' },
  ),
});

exports.resultEmail = (user, entry) => {
  const isMock = Boolean(entry.test);
  const percent = pct(entry.score, entry.total);
  const emoji = percent >= 70 ? '🎉' : percent >= 40 ? '💪' : '📚';
  return {
    to: user.email,
    subject: `${emoji} You scored ${entry.score}/${entry.total} (${percent}%)`,
    html: layout(
      `${emoji} Test Result: ${entry.score}/${entry.total}`,
      `
      <p style="margin:0 0 10px;line-height:1.6;color:#334155;">
        Hi ${user.name}, you just completed a <strong>${isMock ? 'mock test' : 'practice quiz'}</strong>.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0;width:100%;">
        <tr>
          <td style="padding:14px 18px;background:${percent >= 70 ? '#ecfdf5' : percent >= 40 ? '#fffbeb' : '#fef2f2'};border-radius:12px;">
            <div style="font-size:30px;font-weight:800;color:${BRAND};">${percent}%</div>
            <div style="font-size:13px;color:#475569;">Score ${entry.score} of ${entry.total}</div>
            ${entry.timeTaken ? `<div style="font-size:13px;color:#475569;margin-top:2px;">Time: ${Math.floor(entry.timeTaken / 60)}m ${entry.timeTaken % 60}s</div>` : ''}
          </td>
        </tr>
      </table>
      <p style="margin:12px 0 0;line-height:1.6;color:#334155;">
        ${percent >= 70
          ? 'Excellent! Keep the momentum going.'
          : 'Review your mistakes and try again — every attempt counts.'}
      </p>`,
      { url: `${process.env.CLIENT_URL || ''}/results`, label: 'View Full Result' },
    ),
  };
};

exports.streakReminderEmail = (user) => ({
  to: user.email,
  subject: `🔥 Don't lose your ${user.stats.streakDays}-day streak!`,
  html: layout(
    `🔥 Your streak needs you!`,
    `
    <p style="margin:0 0 12px;line-height:1.6;color:#334155;">
      Hi ${user.name}, you've built a <strong>${user.stats.streakDays}-day streak</strong> — but it
      resets if you don't practice today!
    </p>
    <p style="margin:0 0 12px;line-height:1.6;color:#334155;">
      आपकी ${user.stats.streakDays}-दिन की लय टूट सकती है। आज ही एक क्विज़ खेलें और इसे बनाए रखें!
    </p>
    <p style="margin:0;line-height:1.6;color:#64748b;">
      Just one quick quiz takes less than 3 minutes.
    </p>`,
    { url: `${process.env.CLIENT_URL || ''}/quiz`, label: 'Keep My Streak 🔥' },
  ),
});
