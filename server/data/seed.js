require('dotenv').config();
const dns = require('dns');
const mongoose = require('mongoose');

// Resolve mongodb+srv:// SRV records via Google DNS.
dns.setServers(['8.8.8.8', '8.8.4.4']);
const { chapters: chapterData, topics: topicData } = require('./chapters');
const questionData = require('./questions');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const Question = require('../models/Question');
const MockTest = require('../models/MockTest');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Chapter.deleteMany({});
    await Topic.deleteMany({});
    await Question.deleteMany({});
    await MockTest.deleteMany({});
    console.log('Cleared existing data');

    const chapterDocs = await Chapter.insertMany(chapterData);
    console.log(`Seeded ${chapterDocs.length} chapters`);

    const topicDocs = [];
    for (const t of topicData) {
      const chapter = chapterDocs[t.chapterIndex - 1];
      if (!chapter) continue;
      const doc = await Topic.create({
        name_en: t.name_en,
        name_hi: t.name_hi,
        chapter: chapter._id,
        description_en: t.description_en || '',
        description_hi: t.description_hi || '',
        subtopics: t.subtopics || [],
        difficulty: t.difficulty || 'medium',
        order: t.order || 0,
      });
      topicDocs.push({ doc, chapterIndex: t.chapterIndex, order: t.order });
    }
    console.log(`Seeded ${topicDocs.length} topics`);

    const topicMap = {};
    topicDocs.forEach(({ doc, chapterIndex, order }) => {
      if (!topicMap[chapterIndex]) topicMap[chapterIndex] = {};
      topicMap[chapterIndex][order] = doc._id;
    });

    let questionCount = 0;
    const questionDocs = [];
    for (const q of questionData) {
      const chapter = chapterDocs[q.chapterIndex - 1];
      if (!chapter) continue;

      let topicId = null;
      if (topicMap[q.chapterIndex]) {
        const keys = Object.keys(topicMap[q.chapterIndex]).map(Number).sort((a, b) => a - b);
        let idx = q.topicIndex - 1;
        if (idx >= keys.length) idx = keys.length - 1;
        if (idx < 0) idx = 0;
        topicId = topicMap[q.chapterIndex][keys[idx]];
      }

      if (!topicId) continue;

      const doc = await Question.create({
        question_en: q.question_en,
        question_hi: q.question_hi,
        options_en: q.options_en,
        options_hi: q.options_hi,
        correctAnswer: q.correctAnswer,
        explanation_en: q.explanation_en || '',
        explanation_hi: q.explanation_hi || '',
        chapter: chapter._id,
        topic: topicId,
        difficulty: q.difficulty || 'medium',
        year: q.year || null,
        tags: q.tags || [],
      });
      questionDocs.push(doc);
      questionCount++;
    }
    console.log(`Seeded ${questionCount} questions`);

    // Update topic question counts
    const topicCounts = {};
    questionDocs.forEach(q => {
      const tid = q.topic.toString();
      topicCounts[tid] = (topicCounts[tid] || 0) + 1;
    });
    for (const [tid, count] of Object.entries(topicCounts)) {
      await Topic.findByIdAndUpdate(tid, { questionCount: count });
    }

    // Create mock tests
    const subjectQuestions = questionDocs.filter(q => {
      const ch = chapterData.find(c => c._id?.toString() === q.chapter.toString() || chapterDocs.indexOf(chapterDocs.find(ch2 => ch2._id.toString() === q.chapter.toString())) < 15);
      return ch;
    });

    const fullTest = await MockTest.create({
      title_en: 'Full Mock Test - 150 Questions',
      title_hi: 'पूर्ण मॉक टेस्ट - 150 प्रश्न',
      description_en: 'Complete mock test simulating the actual Bihar STET CS exam',
      description_hi: 'वास्तविक बिहार STET CS परीक्षा का अनुकरण करने वाला पूर्ण मॉक टेस्ट',
      questions: questionDocs.sort(() => Math.random() - 0.5).slice(0, 150).map(q => q._id),
      duration: 150,
      totalMarks: 150,
      type: 'full',
      isActive: true,
    });

    const sectionTest = await MockTest.create({
      title_en: 'Computer Science Section - 100 Questions',
      title_hi: 'कंप्यूटर विज्ञान अनुभाग - 100 प्रश्न',
      description_en: 'Section 1: Computer Science subject knowledge only',
      description_hi: 'अनुभाग 1: केवल कंप्यूटर विज्ञान विषय ज्ञान',
      questions: questionDocs.sort(() => Math.random() - 0.5).slice(0, 100).map(q => q._id),
      duration: 100,
      totalMarks: 100,
      type: 'section',
      section: 'subject',
      isActive: true,
    });

    // Chapter-wise mini tests for each chapter
    for (let i = 0; i < chapterDocs.length; i++) {
      const ch = chapterDocs[i];
      const chQuestions = questionDocs.filter(q => q.chapter.toString() === ch._id.toString());
      if (chQuestions.length >= 10) {
        await MockTest.create({
          title_en: `${ch.title_en} - Mini Test`,
          title_hi: `${ch.title_hi} - मिनी टेस्ट`,
          description_en: `Quick test on ${ch.title_en}`,
          description_hi: `${ch.title_hi} पर त्वरित परीक्षा`,
          questions: chQuestions.sort(() => Math.random() - 0.5).slice(0, Math.min(chQuestions.length, 30)).map(q => q._id),
          duration: Math.min(chQuestions.length, 30),
          totalMarks: Math.min(chQuestions.length, 30),
          type: 'chapter',
          chapterRef: ch._id,
          isActive: true,
        });
      }
    }

    console.log('Seeded mock tests');
    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
