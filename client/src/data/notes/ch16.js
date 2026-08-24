export default {
  num: 16,
  title: ['Art of Teaching & Pedagogy', 'शिक्षण कला एवं शिक्षण-विधि'],
  intro: [
    '25% of the paper! Teaching principles, methods, Bloom’s taxonomy, assessment and ICT.',
    'प्रश्नपत्र का 25%! शिक्षण सिद्धांत, विधियाँ, Bloom taxonomy, मूल्यांकन और ICT।',
  ],
  sections: [
    {
      id: 'teaching-concept',
      title: ['Nature of Teaching & Maxims', 'शिक्षण की प्रकृति एवं सूत्र'],
      blocks: [
        ['p',
          'Teaching = purposeful interaction between teacher and learners to bring desired changes in knowledge, skill and attitude.',
          'शिक्षण = ज्ञान, कौशल, अभिवृत्ति में इच्छित परिवर्तन हेतु शिक्षक-विद्यार्थी की क्रियाओं का क्रम।'],
        ['ul', [
          ['From known → unknown', 'ज्ञात → अज्ञात'],
          ['Simple → complex', 'सरल → जटिल'],
          ['Concrete → abstract', 'मूर्त → अमूर्त'],
          ['Particular → general (induction) / whole → part', 'विशिष्ट → सामान्य; पूर्ण → अंश'],
          ['Psychological → logical order', 'मनोवैज्ञानिक क्रम पहले'],
        ]],
      ],
    },
    {
      id: 'methods',
      title: ['Teaching Methods', 'शिक्षण विधियाँ'],
      blocks: [
        ['table',
          [['Method', 'विधि'], ['Essence', 'सार'], ['Best for', 'उपयुक्तता']],
          [
            [['Lecture', 'व्याख्यान'], ['Teacher explains to many', 'शिक्षक बोले'], ['Theory coverage, large class']],
            [['Demonstration', 'प्रदर्शन'], ['Show + do practically', 'दिखाना'], ['Lab skills, equipment use']],
            [['Discussion', 'संवाद'], ['Exchange of views guided', 'चर्चा'], ['Concept clarity, attitudes']],
            [['Project', 'प्रोजेक्ट'], ['Learning by real task (Kilpatrick)', 'कार्य आधारित'], ['Applied problem solving']],
            [['Heuristic', 'ह्यूरिस्टिक'], ['Self-discovery (Armstrong)', 'स्वयं खोज'], ['Scientific temper']],
            [['Brainstorming', 'बुलभुलैया विचार'], ['Free idea generation first, judge later', 'विचार-विस्फोट'], ['Creativity']],
          ]],
        ['callout', 'tip',
          ['Play-way & Montessori methods stress learning through play and senses — frequent 1-mark questions.',
           'Play-way/Montessori = खेल व इंद्रियों द्वारा शिक्षा — प्रायः पूछा जाता है।']],
      ],
    },
    {
      id: 'bloom-assessment',
      title: ["Bloom's Taxonomy & Assessment", 'ब्लूम का वर्गीकरण एवं मूल्यांकन'],
      blocks: [
        ['table',
          [['Level (revised)', 'स्तर'], ['Verb examples', 'क्रियाएँ']],
          [
            [['1 · Remember', 'स्मरण'], ['define, list, recall', 'परिभाषित करें']],
            [['2 · Understand', 'समझ'], ['explain, summarize, classify', 'समझाएँ']],
            [['3 · Apply', 'अनुप्रयोग'], ['solve, use, implement', 'प्रयोग करें']],
            [['4 · Analyze', 'विश्लेषण'], ['compare, differentiate', 'तुलना करें']],
            [['5 · Evaluate', 'मूल्यांकन'], ['judge, justify, critique', 'निर्णय दें']],
            [['6 · Create', 'सर्जन'], ['design, compose, construct', 'डिज़ाइन करें']],
          ]],
        ['table',
          [['Assessment type', 'मूल्यांकन'], ['When', 'कब'], ['Purpose', 'उद्देश्य']],
          [
            [['Diagnostic', 'नैदानिक'], ['Before teaching', 'पहले'], ['Find weaknesses', 'कमी पहचानें']],
            [['Formative', 'स्थिरात्मक'], ['During teaching ✓', 'बीच में'], ['Improve learning (unit tests)', 'सुधार हेतु']],
            [['Summative', 'समष्टिगत'], ['End of course', 'अंत में'], ['Certify achievement (final exam)', 'परिणाम घोषित']],
          ]],
      ],
    },
    {
      id: 'plan-ict-nep',
      title: ['Lesson Planning, ICT & NEP 2020', 'पाठ योजना, ICT एवं NEP 2020'],
      blocks: [
        ['ul', [
          ['Herbart’s five steps: introduction → presentation → comparison/generalization → application → recapitulation.', 'Herbart पंच-सोपान: प्रस्तावना → प्रस्तुतीकरण → तुलना → अनुप्रयोग → पुनरावृत्ति।'],
          ['Edgar Dale’s Cone of Experience: direct purposeful experiences (base) are most effective; verbal symbols (top) least.', 'Edgar Dale शंकु: प्रत्यक्ष अनुभव सर्वाधिक प्रभावी, मौखिक प्रतीक न्यूनतम।'],
          ['ICT (Information & Communication Technology) in education: smart classes, LMS (Learning Management System – Moodle), SWAYAM/DIKSHA MOOCs (Massive Open Online Courses), simulation labs.', 'ICT (सूचना एवं संचार प्रौद्योगिकी): smart class, LMS (लर्निंग मैनेजमेंट सिस्टम), SWAYAM/DIKSHA जैसे MOOC (मासिक ऑनलाइन ओपन कोर्स) मंच।'],
          ['NEP (National Education Policy) 2020 highlights: 5+3+3+4 structure, mother-tongue medium till grade 5+, coding from grade 6, holistic multidisciplinary learning.', 'NEP (राष्ट्रीय शिक्षा नीति) 2020: 5+3+3+4, मातृभाषा माध्यम, कक्षा 6 से कोडिंग, समग्र शिक्षा।'],
        ]],
      ],
    },
  ],
};
