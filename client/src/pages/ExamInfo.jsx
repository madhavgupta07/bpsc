import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  ArrowRight, BadgeInfo, BookOpenText, Calendar, CheckCircle2, Clock3,
  Download, ExternalLink, FileText, GraduationCap, Scale, Target,
} from 'lucide-react';
import Seo from '../components/seo/Seo';
import { chaptersApi } from '../lib/api';
import { asArray } from '../lib/apiClient';
import { useLocalized } from '../hooks/useLocalized';
import { cn } from '../lib/cn';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ---------- Static exam info ---------- */
const EXAM_HIGHLIGHTS = [
  { icon: FileText, label: 'Exam', value: 'Bihar STET Paper II' },
  { icon: GraduationCap, label: 'Subject', value: 'Computer Science (Code 226)' },
  { icon: Target, label: 'Total Questions', value: '150 MCQs' },
  { icon: Scale, label: 'Total Marks', value: '150 Marks' },
  { icon: Clock3, label: 'Duration', value: '150 mins (2.5 hours)' },
  { icon: BadgeInfo, label: 'Negative Marking', value: 'No Negative Marking (0)' },
];

const EXAM_PATTERN = [
  { section: 'Specified Subject: Computer Science (कंप्यूटर साइंस)', questions: 100, marks: 100, percent: '66.7%' },
  { section: 'Art of Teaching (शिक्षण कला)', questions: 30, marks: 30, percent: '20.0%' },
  { section: 'Other Skills: GK, Env, Reasoning, Math (अन्य दक्षता)', questions: 20, marks: 20, percent: '13.3%' },
];

const QUALIFYING_MARKS = [
  { category: 'General (UR)', percent: '50.0%', marks: '75.0 / 150' },
  { category: 'Backward Class (BC)', percent: '45.5%', marks: '68.25 / 150' },
  { category: 'Extremely Backward Class (EBC)', percent: '42.5%', marks: '63.75 / 150' },
  { category: 'SC / ST / Divyang (PwD) / All Women', percent: '40.0%', marks: '60.0 / 150' },
];

const AGE_LIMITS = [
  { category: 'General (UR) Male', limit: '37 Years' },
  { category: 'General (UR) Female', limit: '40 Years' },
  { category: 'BC / EBC (Male & Female)', limit: '40 Years' },
  { category: 'SC / ST (Male & Female)', limit: '42 Years' },
  { category: 'Divyang (PwD Candidates)', limit: '+10 Years Relaxation' },
];

const ELIGIBILITY_PATHWAYS = [
  {
    title: 'B.E. / B.Tech in CS / IT',
    en: 'B.E. or B.Tech in Computer Science / Information Technology or equivalent degree from a recognized university (Min 50% marks).',
    hi: 'मान्यता प्राप्त विश्वविद्यालय से कंप्यूटर साइंस / IT में B.E. या B.Tech या समकक्ष डिग्री (न्यूनतम 50% अंक)।',
  },
  {
    title: 'B.E. / B.Tech (Any Stream) + PGDCA',
    en: 'B.E. or B.Tech in any stream from a recognized university + Post Graduate Diploma in Computer Science / PGDCA (Min 50% marks).',
    hi: 'किसी भी स्ट्रीम में B.E./B.Tech + कंप्यूटर में पोस्ट ग्रेजुएट डिप्लोमा (PGDCA) (न्यूनतम 50% अंक)।',
  },
  {
    title: 'M.Sc (CS) / MCA',
    en: 'M.Sc in Computer Science or MCA from a recognized university (Min 50% marks).',
    hi: 'मान्यता प्राप्त विश्वविद्यालय से कंप्यूटर साइंस में M.Sc या MCA (न्यूनतम 50% अंक)।',
  },
  {
    title: 'B.Sc (CS) / BCA + Post Graduation (Any Stream)',
    en: 'B.Sc in Computer Science or BCA + Post Graduate Degree in any subject from a recognized university (Min 50% marks).',
    hi: 'B.Sc (कंप्यूटर साइंस) या BCA + किसी भी विषय में पोस्ट ग्रेजुएशन (न्यूनतम 50% अंक)।',
  },
  {
    title: 'PGDCA + Post Graduation (Any Stream)',
    en: 'Post Graduate Diploma in Computer (PGDCA) + Post Graduate Degree in any subject (Min 50% marks).',
    hi: 'कंप्यूटर में पोस्ट ग्रेजुएट डिप्लोमा (PGDCA) + किसी भी विषय में पोस्ट ग्रेजुएशन (न्यूनतम 50% अंक)।',
  },
  {
    title: 'DOEACC / NIELIT "B" Level + PG',
    en: 'DOEACC / NIELIT "B" Level Certificate + Post Graduate Degree in any subject (Min 50% marks).',
    hi: 'DOEACC / NIELIT से "B" लेवल + किसी भी विषय में पोस्ट ग्रेजुएशन (न्यूनतम 50% अंक)।',
  },
  {
    title: 'DOEACC / NIELIT "C" Level',
    en: 'DOEACC / NIELIT "C" Level Certificate with Graduation in any stream from a recognized university.',
    hi: 'DOEACC / NIELIT से "C" लेवल प्रमाण पत्र + किसी भी विषय में स्नातक।',
  },
];

const IMPORTANT_LINKS = [
  { label: 'BSEB Official Website (बिहार विद्यालय परीक्षा समिति)', url: 'https://secondary.biharboardonline.com' },
  { label: 'Bihar STET Official Portal & Updates', url: 'https://secondary.biharboardonline.com' },
  { label: 'Official Syllabus (Paper II - Computer Science)', url: 'https://secondary.biharboardonline.com' },
];

/* Detailed syllabus breakdown with topics per chapter */
const SYLLABUS_DETAIL = [
  { ch: 1, en: 'Digital Logic', hi: 'डिजिटल लॉजिक', section: 'subject', topics: 'Number Systems, Boolean Algebra, Logic Gates, Combinational Circuits (MUX, Decoder, Adder), Sequential Circuits (Flip-flops, Counters, Registers)' },
  { ch: 2, en: 'Computer Organization & Architecture', hi: 'कंप्यूटर संगठन और आर्किटेक्चर', section: 'subject', topics: 'CPU Design, ALU, Control Unit, Instruction Cycle, Pipelining, Cache Memory, I/O Organization, RISC vs CISC' },
  { ch: 3, en: 'Programming & Data Structures', hi: 'प्रोग्रामिंग और डेटा स्ट्रक्चर', section: 'subject', topics: 'C/C++ Programming, Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hashing, Sorting & Searching' },
  { ch: 4, en: 'Algorithms', hi: 'एल्गोरिदम', section: 'subject', topics: 'Time & Space Complexity, Divide and Conquer, Greedy, Dynamic Programming, Backtracking, Graph Algorithms (BFS/DFS, Shortest Path)' },
  { ch: 5, en: 'Operating Systems', hi: 'ऑपरेटिंग सिस्टम', section: 'subject', topics: 'Process Management, Scheduling Algorithms, Deadlock, Memory Management (Paging, Segmentation), Virtual Memory, File Systems, I/O Management' },
  { ch: 6, en: 'Database Management System', hi: 'डेटाबेस मैनेजमेंट सिस्टम', section: 'subject', topics: 'ER Model, Relational Algebra, SQL, Normalization (1NF-BCNF), Transactions, ACID Properties, Indexing, Concurrency Control' },
  { ch: 7, en: 'Computer Networks', hi: 'कंप्यूटर नेटवर्क', section: 'subject', topics: 'OSI & TCP/IP Models, Data Link Protocols, IP Addressing, Routing, TCP/UDP, DNS, HTTP, Network Security, Wireless Networks' },
  { ch: 8, en: 'Software Engineering', hi: 'सॉफ्टवेयर इंजीनियरिंग', section: 'subject', topics: 'SDLC Models (Waterfall, Agile, Spiral), Requirements Engineering, UML Diagrams, Testing (Unit, Integration, System), Software Metrics' },
  { ch: 9, en: 'Object-Oriented Programming', hi: 'ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग', section: 'subject', topics: 'OOP Concepts (Encapsulation, Inheritance, Polymorphism, Abstraction), Java/C++ OOP, Interfaces, Exception Handling, Collections' },
  { ch: 10, en: 'Web Technologies', hi: 'वेब टेक्नोलॉजीज', section: 'subject', topics: 'HTML, CSS, JavaScript, XML, PHP, Web Servers, Client-Server Architecture, Cookies, Sessions, Web Security' },
  { ch: 11, en: 'Theory of Computation', hi: 'कंप्यूटेशन का सिद्धांत', section: 'subject', topics: 'Finite Automata (DFA/NFA), Regular Expressions, Context-Free Grammars, Pushdown Automata, Turing Machines, Decidability' },
  { ch: 12, en: 'Internet of Things (IoT)', hi: 'इंटरनेट ऑफ थिंग्स (IoT)', section: 'subject', topics: 'IoT Architecture, Sensors & Actuators, Communication Protocols (MQTT, CoAP), Arduino, Raspberry Pi, Smart Applications' },
  { ch: 13, en: 'Artificial Intelligence', hi: 'आर्टिफिशियल इंटेलिजेंस', section: 'subject', topics: 'Search Algorithms, Knowledge Representation, Expert Systems, Machine Learning Basics, Neural Networks, NLP, Robotics' },
  { ch: 14, en: 'E-Commerce', hi: 'ई-कॉमर्स', section: 'subject', topics: 'E-Commerce Models (B2B, B2C, C2C), Payment Gateways, Digital Marketing, Cyber Laws, Electronic Data Interchange (EDI)' },
  { ch: 15, en: 'Multimedia', hi: 'मल्टीमीडिया', section: 'subject', topics: 'Text, Audio, Image & Video Processing, Compression Techniques (JPEG, MPEG), Animation, Multimedia Authoring Tools' },
  { ch: 16, en: 'Art of Teaching & Pedagogy', hi: 'शिक्षण कला और शिक्षाशास्त्र', section: 'pedagogy', topics: 'Teaching Methods, Lesson Planning, Bloom\'s Taxonomy, Evaluation Techniques, ICT in Education, Inclusive Education, NEP 2020' },
  { ch: 17, en: 'GK, Environment & Reasoning', hi: 'सामान्य ज्ञान, पर्यावरण और तर्कशक्ति', section: 'pedagogy', topics: 'Current Affairs, Indian Polity, Bihar GK, Environmental Studies, Logical Reasoning, Analytical Ability, Data Interpretation' },
];

export default function ExamInfo() {
  const { t } = useTranslation();
  const pick = useLocalized();
  const lang = document.documentElement.lang === 'hi' ? 'hi' : 'en';

  const { data: chapters = [] } = useQuery({
    queryKey: ['chapters'],
    queryFn: chaptersApi.list,
    select: asArray,
  });

  // Compute total weightage to show relative bar widths
  const maxWeightage = Math.max(...chapters.map((c) => c.weightage || 0), 1);

  return (
    <div>
      <Seo
        title="Bihar STET Computer Science Syllabus 2025 — Detailed Chapter-wise Syllabus, Exam Pattern & Notification"
        description="Complete Bihar STET Paper II Computer Science (Code 226) syllabus 2025 with chapter-wise weightage, exam pattern, eligibility criteria, and official notification links. बिहार STET कंप्यूटर साइंस सिलेबस 2025 — पूरा विवरण।"
        path="/exam-info"
        keywords="Bihar STET syllabus 2025, STET Computer Science syllabus, Bihar STET exam pattern, Bihar STET notification, Bihar STET eligibility, STET Paper 2 syllabus, बिहार STET सिलेबस, STET ka syllabus, Bihar STET computer teacher syllabus, STET syllabus pdf in hindi, Bihar STET weightage"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Are B.Tech / B.E. students eligible for Bihar STET Computer Science?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Candidates with B.E. or B.Tech in Computer Science / Information Technology (with at least 50% marks) are fully eligible for Bihar STET Paper II Computer Science. B.Tech in any stream with a PGDCA is also eligible.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is B.Ed compulsory for Bihar STET Computer Science?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. B.Ed is NOT required or mandatory for Computer Science (Subject Code 226) in Bihar STET. Candidates with B.Tech (CS/IT), MCA, M.Sc (CS), or BCA + PG can apply without B.Ed.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there negative marking in Bihar STET?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. There is NO negative marking in Bihar STET. Every correct answer gives +1 mark, and no marks are deducted for incorrect or unanswered questions.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the qualifying / passing marks in Bihar STET?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'General (UR): 50% (75 marks out of 150), Backward Class (BC): 45.5% (68.25 marks), Extremely Backward Class (EBC): 42.5% (63.75 marks), SC / ST / Divyang / All Female Candidates: 40% (60 marks).',
                },
              },
              {
                '@type': 'Question',
                name: 'Bihar STET Computer Science ka syllabus kya hai?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bihar STET Paper II Computer Science (Code 226) mein 17 chapters hain — Digital Logic, Computer Organization, Data Structures, Algorithms, OS, DBMS, Computer Networks, Software Engineering, OOP, Web Technologies, Theory of Computation, IoT, AI, E-Commerce, Multimedia, Art of Teaching (Pedagogy) aur GK/Reasoning. Total 150 questions, 150 marks, 2.5 hours.',
                },
              },
            ],
          },
        ]}
      />

      {/* ========== Hero ========== */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50/40 to-white dark:border-zinc-800 dark:from-brand-500/5 dark:to-zinc-950">
        <div className="container-app py-12 sm:py-16">
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
            Bihar STET · Paper II · Computer Science · Subject Code 226
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl dark:text-zinc-50">
            {lang === 'hi' ? 'बिहार STET कंप्यूटर साइंस — परीक्षा जानकारी, पात्रता व सिलेबस' : 'Bihar STET Computer Science — Exam Info, Eligibility & Detailed Syllabus'}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-zinc-400">
            {lang === 'hi'
              ? 'आधिकारिक पात्रता नियम (B.Tech / MCA / BCA मान्य, B.Ed अनिवार्य नहीं), परीक्षा पैटर्न, न्यूनतम उत्तीर्णांक, अध्यायवार भारांक और संपूर्ण सिलेबस।'
              : 'Official eligibility criteria (B.Tech/MCA/BCA eligible, B.Ed exempted), exam pattern, qualifying cutoff marks, chapter-wise weightage and detailed syllabus.'}
          </motion.p>
        </div>
      </section>

      {/* ========== Exam Highlights ========== */}
      <section className="container-app py-10 sm:py-12">
        <h2 className="text-xl font-extrabold tracking-tight">
          {lang === 'hi' ? 'मुख्य परीक्षा विवरण' : 'Exam Highlights'}
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EXAM_HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.label}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i % 3}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-zinc-400">{item.label}</p>
                <p className="text-sm font-bold text-slate-900 dark:text-zinc-100">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== Eligibility Section with B.Ed Exemption Alert ========== */}
      <section className="border-t border-slate-200 bg-white py-10 sm:py-12 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="container-app">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-extrabold tracking-tight">
              {lang === 'hi' ? 'शैक्षणिक योग्यता एवं पात्रता (Eligibility Criteria)' : 'Educational Eligibility Criteria'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              {lang === 'hi'
                ? 'कंप्यूटर साइंस शिक्षक (कक्षा 11-12) के लिए निम्नलिखित में से कोई एक योग्यता अनिवार्य है (न्यूनतम 50% अंक, आरक्षित वर्ग को 5% छूट):'
                : 'Candidates must possess ANY of the following qualifications with at least 50% marks (5% relaxation for SC/ST/EBC/BC/PwD candidates):'}
            </p>
          </div>

          {/* B.Ed Exemption Banner */}
          <div className="mt-5 flex items-start gap-3.5 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-500/30 dark:bg-emerald-500/10">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                {lang === 'hi'
                  ? 'विशेष सूचना: कंप्यूटर साइंस के लिए B.Ed अनिवार्य नहीं है (B.Ed Exemption)'
                  : 'Important: B.Ed is NOT mandatory for Computer Science (Paper II - Code 226)'}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-emerald-800/90 dark:text-emerald-300/90">
                {lang === 'hi'
                  ? 'BSEB बिहार STET नियमावली के अनुसार कंप्यूटर साइंस विषय के शिक्षकों के लिए B.Ed की डिग्री अनिवार्य नहीं है। B.Tech (CS/IT), MCA, M.Sc (CS), BCA + PG आदि अभ्यर्थी सीधे आवेदन के पात्र हैं।'
                  : 'As per official BSEB rules, B.Ed is not required for Computer Science. Candidates holding B.E./B.Tech (CS/IT), MCA, M.Sc (CS), or BCA+PG are directly eligible.'}
              </p>
            </div>
          </div>

          {/* Eligibility Pathways */}
          <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
            {ELIGIBILITY_PATHWAYS.map((pathway, idx) => (
              <div
                key={pathway.title}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-brand-200 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500/30"
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">{pathway.title}</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                  {lang === 'hi' ? pathway.hi : pathway.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Qualifying Marks & Age Limits ========== */}
      <section className="container-app py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Qualifying Marks Table */}
          <div>
            <h2 className="text-lg font-extrabold tracking-tight">
              {lang === 'hi' ? 'न्यूनतम उत्तीर्णांक (Qualifying Passing Marks)' : 'Qualifying / Passing Cutoff Marks'}
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              {lang === 'hi' ? 'बिहार STET पात्रता परीक्षा पास करने हेतु श्रेणीवार न्यूनतम अंक:' : 'Minimum passing percentage & marks required out of 150:'}
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-left dark:border-zinc-700 dark:bg-zinc-800/60">
                    <th className="py-2.5 px-3.5 font-bold text-slate-900 dark:text-zinc-100">{lang === 'hi' ? 'श्रेणी (Category)' : 'Category'}</th>
                    <th className="py-2.5 px-3 text-center font-bold text-slate-900 dark:text-zinc-100">{lang === 'hi' ? 'प्रतिशत' : 'Percentage'}</th>
                    <th className="py-2.5 px-3.5 text-right font-bold text-slate-900 dark:text-zinc-100">{lang === 'hi' ? 'न्यूनतम अंक' : 'Cutoff Marks'}</th>
                  </tr>
                </thead>
                <tbody>
                  {QUALIFYING_MARKS.map((row, i) => (
                    <tr key={row.category} className={cn('border-b border-slate-100 dark:border-zinc-800', i === 0 && 'bg-brand-50/20 dark:bg-brand-500/5')}>
                      <td className="py-2.5 px-3.5 font-semibold text-slate-700 dark:text-zinc-300">{row.category}</td>
                      <td className="py-2.5 px-3 text-center tabular-nums font-bold text-brand-700 dark:text-brand-400">{row.percent}</td>
                      <td className="py-2.5 px-3.5 text-right tabular-nums font-bold text-slate-900 dark:text-zinc-100">{row.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Age Limits Table */}
          <div>
            <h2 className="text-lg font-extrabold tracking-tight">
              {lang === 'hi' ? 'आयु सीमा (Age Limits)' : 'Category-wise Age Limits'}
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              {lang === 'hi' ? 'न्यूनतम आयु 21 वर्ष है। श्रेणीवार अधिकतम आयु सीमा नीचे दी गई है:' : 'Minimum age is 21 years. Maximum age criteria as per Bihar rules:'}
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-left dark:border-zinc-700 dark:bg-zinc-800/60">
                    <th className="py-2.5 px-3.5 font-bold text-slate-900 dark:text-zinc-100">{lang === 'hi' ? 'श्रेणी (Category)' : 'Category'}</th>
                    <th className="py-2.5 px-3.5 text-right font-bold text-slate-900 dark:text-zinc-100">{lang === 'hi' ? 'अधिकतम आयु' : 'Max Age Limit'}</th>
                  </tr>
                </thead>
                <tbody>
                  {AGE_LIMITS.map((row) => (
                    <tr key={row.category} className="border-b border-slate-100 dark:border-zinc-800">
                      <td className="py-2.5 px-3.5 font-semibold text-slate-700 dark:text-zinc-300">{row.category}</td>
                      <td className="py-2.5 px-3.5 text-right tabular-nums font-bold text-slate-900 dark:text-zinc-100">{row.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Exam Pattern ========== */}
      <section className="border-y border-slate-200 bg-white py-10 sm:py-12 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="container-app">
          <h2 className="text-xl font-extrabold tracking-tight">
            {lang === 'hi' ? 'परीक्षा पैटर्न एवं अंक योजना (Exam Pattern)' : 'Exam Pattern & Marks Scheme'}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
            {lang === 'hi'
              ? 'बिहार STET Paper II में कुल 150 बहुविकल्पीय प्रश्न (MCQs) होते हैं। प्रत्येक प्रश्न 1 अंक का होता है और कोई नकारात्मक अंकन (No Negative Marking) नहीं है।'
              : 'Bihar STET Paper II consists of 150 MCQs of 1 mark each (Total: 150 Marks). There is NO negative marking for incorrect or unanswered questions.'}
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-left dark:border-zinc-700 dark:bg-zinc-800/60">
                  <th className="py-3 px-4 font-bold text-slate-900 dark:text-zinc-100">{lang === 'hi' ? 'खंड (Section)' : 'Section'}</th>
                  <th className="py-3 px-4 text-center font-bold text-slate-900 dark:text-zinc-100">{lang === 'hi' ? 'प्रश्न (Questions)' : 'Questions'}</th>
                  <th className="py-3 px-4 text-center font-bold text-slate-900 dark:text-zinc-100">{lang === 'hi' ? 'अंक (Marks)' : 'Marks'}</th>
                  <th className="py-3 px-4 text-center font-bold text-slate-900 dark:text-zinc-100">{lang === 'hi' ? 'भारांक' : 'Weightage'}</th>
                </tr>
              </thead>
              <tbody>
                {EXAM_PATTERN.map((row, i) => (
                  <tr key={row.section} className={cn('border-b border-slate-100 dark:border-zinc-800', i === 0 && 'bg-brand-50/30 dark:bg-brand-500/5')}>
                    <td className="py-3 px-4 font-semibold text-slate-700 dark:text-zinc-300">{row.section}</td>
                    <td className="py-3 px-4 text-center tabular-nums font-bold text-slate-900 dark:text-zinc-100">{row.questions}</td>
                    <td className="py-3 px-4 text-center tabular-nums font-bold text-slate-900 dark:text-zinc-100">{row.marks}</td>
                    <td className="py-3 px-4 text-center font-bold text-brand-700 dark:text-brand-400">{row.percent}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold dark:bg-zinc-800/50">
                  <td className="py-3 px-4 text-slate-900 dark:text-zinc-100">{lang === 'hi' ? 'कुल योग (Total)' : 'Total'}</td>
                  <td className="py-3 px-4 text-center tabular-nums text-slate-900 dark:text-zinc-100">150</td>
                  <td className="py-3 px-4 text-center tabular-nums text-slate-900 dark:text-zinc-100">150</td>
                  <td className="py-3 px-4 text-center text-brand-700 dark:text-brand-400">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== Detailed Syllabus ========== */}
      <section className="container-app py-10 sm:py-12">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">
              {lang === 'hi' ? 'विस्तृत 17-अध्याय सिलेबस (Chapter-wise Topics)' : 'Detailed 17-Chapter Syllabus Topics'}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
              {lang === 'hi'
                ? 'प्रत्येक अध्याय के आधिकारिक मुख्य टॉपिक्स नीचे दिए गए हैं। नोट्स पढ़ने और प्रैक्टिस करने के लिए अध्याय पर क्लिक करें।'
                : 'Key topics for each chapter are listed below. Click any chapter to read notes and practice.'}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {SYLLABUS_DETAIL.map((item, i) => {
            const dbChapter = chapters.find((c) => c.chapterNumber === item.ch);
            return (
              <motion.div
                key={item.ch}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-20px' }} custom={i % 4}
                className="group rounded-xl border border-slate-200 bg-white transition-all hover:border-brand-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500/30"
              >
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:gap-5">
                  <div className="flex items-center gap-3 sm:w-72 sm:shrink-0">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-slate-100 font-mono text-xs font-bold tabular-nums text-brand-600 dark:bg-zinc-800 dark:text-brand-400">
                      {String(item.ch).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100">{lang === 'hi' ? item.hi : item.en}</h3>
                      <p className="text-[11px] font-medium text-slate-400 dark:text-zinc-500">
                        {item.section === 'subject' ? (lang === 'hi' ? 'विषय खंड' : 'Subject Content') : (lang === 'hi' ? 'शिक्षाशास्त्र / सामान्य' : 'Pedagogy / Other')}
                        {dbChapter?.weightage ? ` · ~${dbChapter.weightage}%` : ''}
                      </p>
                    </div>
                  </div>
                  <p className="flex-1 text-[13px] leading-relaxed text-slate-600 dark:text-zinc-400">
                    {item.topics}
                  </p>
                  <div className="flex shrink-0 gap-2 sm:flex-col">
                    {dbChapter && (
                      <>
                        <Link
                          to={`/notes/${item.ch}`}
                          className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200 transition-colors hover:bg-brand-50 dark:text-brand-400 dark:ring-brand-500/30 dark:hover:bg-brand-500/10"
                        >
                          <BookOpenText className="size-3" aria-hidden="true" /> {lang === 'hi' ? 'नोट्स' : 'Notes'}
                        </Link>
                        <Link
                          to={`/syllabus/${dbChapter._id}`}
                          className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-200 transition-colors hover:bg-slate-50 dark:text-zinc-400 dark:ring-zinc-700 dark:hover:bg-zinc-800"
                        >
                          <ArrowRight className="size-3" aria-hidden="true" /> {lang === 'hi' ? 'विवरण' : 'Details'}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========== Chapter-wise Weightage ========== */}
      {chapters.length > 0 && (
        <section className="border-y border-slate-200 bg-white py-10 sm:py-12 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="container-app">
            <h2 className="text-xl font-extrabold tracking-tight">
              {lang === 'hi' ? 'अध्यायवार अनुमानित भारांक (Weightage Distribution)' : 'Estimated Chapter-wise Weightage'}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
              {lang === 'hi'
                ? 'पिछले वर्षों के प्रश्नपत्रों के आधार पर अध्यायवार अनुमानित अंक वितरण:'
                : 'Estimated weightage distribution based on past examination patterns:'}
            </p>
            <div className="mt-6 space-y-2.5">
              {chapters
                .slice()
                .sort((a, b) => (b.weightage || 0) - (a.weightage || 0))
                .map((c) => (
                  <div key={c._id} className="flex items-center gap-3">
                    <span className="w-6 shrink-0 text-right font-mono text-xs font-bold tabular-nums text-slate-400 dark:text-zinc-500">
                      {String(c.chapterNumber).padStart(2, '0')}
                    </span>
                    <span className="w-48 shrink-0 truncate text-sm font-semibold text-slate-700 sm:w-64 dark:text-zinc-300">
                      {pick(c, 'title')}
                    </span>
                    <div className="flex flex-1 items-center gap-3">
                      <div className="h-5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-zinc-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.max(4, ((c.weightage || 0) / maxWeightage) * 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className={cn(
                            'h-full rounded-full',
                            c.section === 'pedagogy'
                              ? 'bg-gradient-to-r from-violet-400 to-violet-600'
                              : 'bg-gradient-to-r from-brand-400 to-brand-600',
                          )}
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right text-sm font-bold tabular-nums text-slate-900 dark:text-zinc-100">
                        {c.weightage || 0}%
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4 flex gap-6 text-xs font-medium text-slate-500 dark:text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-6 rounded-full bg-gradient-to-r from-brand-400 to-brand-600" /> Subject (विषय)
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-6 rounded-full bg-gradient-to-r from-violet-400 to-violet-600" /> Pedagogy & GK (शिक्षण कला व सामान्य)
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ========== Official Notification & Board Links ========== */}
      <section className="container-app py-10 sm:py-12">
        <h2 className="text-xl font-extrabold tracking-tight">
          {lang === 'hi' ? 'आधिकारिक नोटिफिकेशन और लिंक (Official Links)' : 'Official Notification & Board Links'}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
          {lang === 'hi'
            ? 'BSEB की आधिकारिक वेबसाइट से नोटिफिकेशन, आवेदन और उत्तर कुंजी से संबंधित अपडेट प्राप्त करें।'
            : 'Access official BSEB portals for notification updates, application forms, and results.'}
        </p>
        <div className="mt-6 space-y-3">
          {IMPORTANT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500/30"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
                <ExternalLink className="size-5" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900 group-hover:text-brand-700 dark:text-zinc-100 dark:group-hover:text-brand-400">{link.label}</p>
                <p className="text-xs text-slate-500 dark:text-zinc-400">{link.url}</p>
              </div>
              <ArrowRight className="size-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600 dark:text-zinc-600" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="container-app pb-14 sm:pb-16">
        <div className="flex flex-col items-start justify-between gap-5 rounded-lg bg-slate-900 px-6 py-8 sm:flex-row sm:items-center sm:px-10 dark:bg-zinc-900">
          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
              {lang === 'hi' ? 'आज ही तैयारी शुरू करें — 100% फ्री' : 'Start your preparation today — 100% Free'}
            </h2>
            <p className="mt-1 max-w-md text-sm text-slate-300">
              {lang === 'hi'
                ? '17 अध्यायों के द्विभाषी नोट्स, 700+ प्रश्न और वास्तविक परीक्षा आधारित मॉक टेस्ट।'
                : '17 chapters of bilingual notes, 700+ practice MCQs and CBT-style mock tests.'}
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Link
              to="/notes"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-200"
            >
              <BookOpenText className="size-4" aria-hidden="true" /> {lang === 'hi' ? 'नोट्स पढ़ें' : 'Read Notes'}
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
            >
              <Target className="size-4" aria-hidden="true" /> {lang === 'hi' ? 'क्विज़ लगाएं' : 'Practice Quiz'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
