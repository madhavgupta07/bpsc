export default {
  num: 13,
  title: ['Artificial Intelligence', 'कृत्रिम बुद्धिमत्ता'],
  intro: [
    'Machines that perceive, reason and learn — agents, search, expert systems, machine learning.',
    'सोचने-सीखने वाली मशीनें — agent, search, expert system, machine learning।',
  ],
  sections: [
    {
      id: 'foundations',
      title: ['Foundations & Intelligent Agents', 'आधार एवं Agent'],
      blocks: [
        ['ul', [
          ['AI = making machines perform tasks needing human intelligence (reasoning, learning, perception). Turing Test (1950) judges machine “thinking” via conversation.', 'AI = मशीनों को मानवीय बुद्धि के कार्य कराना। Turing Test (1950) से मशीन की “सोच” परखी जाती है।'],
          ['Agent = anything that PERCEIVES (sensors) and ACTS (actuators); PEAS = Performance, Environment, Actuators, Sensors.', 'Agent = संवेदी (sensor) + क्रिया (actuator); PEAS framework।'],
          ['Types: simple reflex → model-based → goal-based → utility-based → learning agent.', 'प्रकार: reflex → model-based → goal-based → utility-based → learning।']],
        ],
      ],
    },
    {
      id: 'search',
      title: ['Search Strategies', 'खोज रणनीतियाँ'],
      blocks: [
        ['table',
          [['Search', 'Search'], ['Type', 'प्रकार'], ['Data structure', 'संरचना'], ['Guarantee', 'गारंटी']],
          [
            [['BFS · Breadth-First Search', 'BFS'], ['Uninformed', 'अज्ञेयवादी'], ['Queue (FIFO)', 'queue'], ['Complete ✓; optimal for equal costs', 'complete']],
            [['DFS · Depth-First Search', 'DFS'], ['Uninformed'], ['Stack/recursion', 'stack'], ['Not optimal; low memory', 'कम memory']],
            [['UCS · Uniform Cost Search', 'UCS'], ['Uninformed'], ['Priority queue by cost g(n)', 'cost queue'], ['Optimal ✓']],
            [['Greedy best-first', 'Greedy'], ['Informed', 'ज्ञानयुक्त'], ['h(n) heuristic', 'heuristic'], ['Fast, not optimal']],
            [['A*', 'A*'], ['Informed ✓ famous', 'प्रसिद्ध'], ['f(n)=g(n)+h(n)', 'f=g+h'], ['Optimal if h admissible ✓', 'optimal']],
            [['Hill climbing', 'Hill climbing'], ['Local search', 'local'], ['—'], ['Gets stuck in local maxima']],
          ]],
        ['callout', 'def',
          ['Admissible heuristic never OVERestimates the true remaining cost — this makes A* optimal.',
           'Admissible heuristic कभी वास्तविक लागत से अधिक नहीं बताता — इसी से A* optimal रहता है।']],
      ],
    },
    {
      id: 'knowledge-expert',
      title: ['Knowledge Representation & Expert Systems', 'ज्ञान निरूपण एवं Expert System'],
      blocks: [
        ['ul', [
          ['Semantic network: nodes = concepts, edges = relations. IS-A (hypernymy) vs part-of (meronymy).', 'Semantic network: node=concept, edge=relation। IS-A बनाम part-of।'],
          ['Hyponymy: A is a subordinate/specific kind of B (rose ⊂ flower).', 'Hyponymy: A, B की उपश्रेणी है।'],
          ['Expert system components: Knowledge Base (rules) + Inference Engine (forward/backward chaining) + Explanation module + UI.', 'Expert system: Knowledge Base + Inference Engine + explanation + UI।'],
          ['MYCIN (medical diagnosis) was the classic expert system; shells like JESS build new ones.', 'MYCIN प्रसिद्ध example; JESS shell से नए बनते हैं।']],
        ],
        ['pyq', {
          q: 'What is the full form of JESS in expert-system technology?',
          opts: ['Java Expert System Shell', 'JavaScript Expert System Shell', 'Java Expert Sub System', 'JavaScript Expert Sub System'],
          ans: 0,
          ex: ['JESS = Java Expert System Shell — CLIPS-style rule engine written in Java.',
               'JESS = Java Expert System Shell — Java में लिखा rule engine।'],
          src: 'Bihar STET C.S. · asked twice (2023-II, 2024-I)',
        }],
        ['pyq', {
          q: 'Which is a capability of Expert Systems?',
          opts: ['Possessing human capabilities', 'Suggesting alternative options to a problem', 'Refining their own knowledge', 'Substituting human decision makers'],
          ans: 1,
          ex: ['Expert systems ADVISE — they suggest alternatives/explanations but cannot replace human decision-makers.',
               'Expert systems सलाह देते हैं — विकल्प सुझाते हैं, मानव निर्णायक की जगह नहीं लेते।'],
          src: 'Bihar STET C.S. · 12.09.2023 (Shift-II)',
        }],
      ],
    },
    {
      id: 'ml-nlp',
      title: ['Machine Learning, Neural Networks & NLP', 'Machine Learning, Neural Network एवं NLP'],
      blocks: [
        ['table',
          [['Learning type', 'प्रकार'], ['Data', 'डेटा'], ['Algorithms / examples', 'एल्गोरिद्म']],
          [
            [['Supervised', 'Supervised'], ['Labelled (X, y)', 'labelled'], ['Regression, Decision Tree, SVM (Support Vector Machine), kNN (k-Nearest Neighbours) — spam filter ✓']],
            [['Unsupervised', 'Unsupervised'], ['Unlabelled', 'बिना label'], ['K-means clustering, PCA (Principal Component Analysis) — customer segmentation']],
            [['Reinforcement', 'Reinforcement'], ['Reward/penalty signal', 'reward'], ['Q-learning — game AI, robotics']],
          ]],
        ['ul', [
          ['Neural network layers: input → hidden → output; neuron sums weights + bias then applies activation (sigmoid, ReLU).', 'Neural network: input→hidden→output; activation (ReLU/sigmoid)।'],
          ['Deep learning = many hidden layers — CNN (Convolutional Neural Network) for images, RNN (Recurrent Neural Network) / LSTM (Long Short-Term Memory) for sequences.', 'Deep learning = अधिक hidden layers; CNN→चित्र, RNN→अनुक्रम।'],
          ['NLP (Natural Language Processing) pipeline: tokenization → stemming/lemmatization → POS (Part-of-Speech) tagging → parsing → semantic analysis.', 'NLP steps: tokenization → stemming → POS → parsing।']],
        ],
        ['callout', 'warn',
          ['Overfitting = memorizing training data (fails on test data). Fix with more data, regularization, dropout, cross-validation.',
           'Overfitting: training data रट लेना; हल — अधिक data, regularization, dropout।']],
      ],
    },
  ],
};
