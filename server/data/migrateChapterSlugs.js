/**
 * One-time migration: populate slug field on all existing chapters.
 * Run with: node server/data/migrateChapterSlugs.js
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Chapter = require('../models/Chapter');
const connectDB = require('../config/db');

async function migrate() {
  await connectDB();

  const chapters = await Chapter.find({});
  let updated = 0;

  for (const chapter of chapters) {
    if (!chapter.slug && chapter.title_en) {
      chapter.slug = chapter.title_en
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      await chapter.save();
      console.log(`  ✓ Chapter ${chapter.chapterNumber}: "${chapter.title_en}" → slug: "${chapter.slug}"`);
      updated++;
    } else if (chapter.slug) {
      console.log(`  — Chapter ${chapter.chapterNumber}: already has slug "${chapter.slug}"`);
    }
  }

  console.log(`\nDone. Updated ${updated} of ${chapters.length} chapters.`);
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
