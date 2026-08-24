export default {
  num: 8,
  title: ['Software Engineering', 'सॉफ्टवेयर इंजीनियरिंग'],
  intro: [
    'Building software systematically — SDLC models, requirements, testing and maintenance.',
    'व्यवस्थित सॉफ्टवेयर निर्माण — SDLC मॉडल, आवश्यकताएँ, परीक्षण और अनुरक्षण।',
  ],
  sections: [
    {
      id: 'sdlc-models',
      title: ['SDLC & Process Models', 'SDLC एवं प्रक्रिया मॉडल'],
      blocks: [
        ['p',
          'Software Engineering = disciplined, measurable approach to software development. SDLC (Software Development Life Cycle) phases: Requirements → Design → Implementation → Testing → Deployment → Maintenance.',
          'Software Engineering = अनुशासित विकास-पद्धति। SDLC चरण: आवश्यकताएँ → डिज़ाइन → कोडन → परीक्षण → तैनाती → अनुरक्षण।'],
        ['diagram', 'waterfall', 'The classical Waterfall model', 'पारम्परिक जलप्रपात (Waterfall) मॉडल'],
        ['table',
          [['Model', 'मॉडल'], ['Best when', 'कब उपयुक्त'], ['Key trait', 'विशेषता']],
          [
            [['Waterfall', 'Waterfall'], ['Requirements fixed & clear', 'आवश्यकताएँ स्पष्ट'], ['Linear, no going back', 'रैखिक']],
            [['Prototype', 'Prototype'], ['Requirements unclear', 'आवश्यकताएँ अस्पष्ट'], ['Throwaway mock-up for feedback', 'नमूना बनाकर feedback']],
            [['Incremental', 'Incremental'], ['Deliver in parts', 'भाग-दर-भाग delivery'], ['Core first, modules added', 'पहले core, फिर modules']],
            [['Spiral', 'Spiral'], ['Large, risky projects', 'बड़े जोखिम भरे project'], ['Risk analysis every loop', 'हर चक्र में risk विश्लेषण']],
            [['Agile', 'Agile'], ['Changing requirements', 'बदलती आवश्यकताएँ'], ['Sprints, customer collaboration', 'छोटे sprint, ग्राहक साझेदारी']],
          ]],
      ],
    },
    {
      id: 'requirements-design',
      title: ['Requirements & Design', 'आवश्यकताएँ एवं डिज़ाइन'],
      blocks: [
        ['table',
          [['Requirement', 'आवश्यकता'], ['Meaning', 'अर्थ'], ['Example', 'उदाहरण']],
          [
            [['Functional', 'Functional'], ['WHAT system must do', 'सिस्टम क्या करे'], ['“User can reset password”', '“उपयोगकर्ता password बदल सके”']],
            [['Non-functional', 'Non-functional'], ['HOW WELL it performs', 'कितना अच्छा करे'], ['Performance, security, usability, scalability', 'गति, सुरक्षा']],
          ]],
        ['ul', [
          ['Cohesion (good = high): how focused a module is. Coupling (good = low): inter-module dependence.', 'Cohesion अधिक हो ✓; Coupling कम हो ✓।'],
          ['UML (Unified Modeling Language) diagrams: Use case (functionality), Class (structure), Sequence/Activity (behaviour).', 'UML: Use case (कार्य), Class (संरचना), Sequence/Activity (व्यवहार)।']],
        ],
      ],
    },
    {
      id: 'testing',
      title: ['Software Testing', 'सॉफ्टवेयर परीक्षण'],
      blocks: [
        ['table',
          [['Level', 'स्तर'], ['Tests', 'परीक्षण'], ['By whom', 'कौन करता है']],
          [
            [['Unit', 'Unit'], ['Individual module/function', 'एक module'], ['Developer']],
            [['Integration', 'Integration'], ['Module interfaces together', 'modules का मेल'], ['Developer/Testers']],
            [['System', 'System'], ['Whole product vs SRS (Software Requirements Specification)', 'पूरा product vs SRS'], ['Testing team']],
            [['Acceptance (User Acceptance Test)', 'स्वीकृति परीक्षण (UAT)'], ['Business needs validation', 'व्यवसाय-उपयोगिता'], ['Customer ✓']],
            [['Regression', 'Regression'], ['Old features still work after change', 'बदलाव के बाद पुराने फीचर'], ['Test suite']],
          ]],
        ['ul', [
          ['Black-box: tests outputs from inputs without seeing code (equivalence partitioning, boundary value).', 'Black-box: code देखे बिना input-output परीक्षण (boundary value)।'],
          ['White-box: tests internal logic paths (statement/branch coverage).', 'White-box: आंतरिक logic paths का परीक्षण।'],
          ['Verification = “building the product right?” (reviews, static). Validation = “building the right product?” (actual testing).', 'Verification: क्या सही ढंग से बनाया? Validation: क्या सही चीज़ बनी?']],
        ],
      ],
    },
    {
      id: 'maintenance-metrics',
      title: ['Maintenance & Cost Estimation', 'अनुरक्षण एवं लागत अनुमान'],
      blocks: [
        ['table',
          [['Maintenance type', 'प्रकार'], ['Purpose', 'उद्देश्य'], ['Share', 'हिस्सा']],
          [
            [['Corrective', 'Corrective'], ['Fix discovered bugs', 'bugs सुधारना'], ['≈17%']],
            [['Adaptive', 'Adaptive'], ['Adjust to new OS/hardware/laws', 'नए वातावरण के अनुकूल'], ['≈18%']],
            [['Perfective', 'Perfective'], ['New features per user requests', 'नई सुविधाएँ'], ['≈50%+ (largest)', 'सबसे बड़ा']],
            [['Preventive', 'Preventive'], ['Refactor to avoid future problems', 'भविष्य की समस्या रोकना'], ['≈5%']],
          ]],
        ['callout', 'exam',
          ['COCOMO (COnstructive COst MOdel): Effort E = a·(KLOC)ᵇ where KLOC = kilo (thousand) Lines of Code — Organic (small, a=2.4) · Semi-detached (a=3.0) · Embedded (complex, a=3.6).',
           'COCOMO सूत्र E = a·(KLOC)ᵇ — Organic (छोटा), Semi-detached, Embedded (जटिल)।']],
      ],
    },
  ],
};
