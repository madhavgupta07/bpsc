export default {
  num: 4,
  title: ['Algorithms', 'एल्गोरिद्म'],
  intro: [
    'Design techniques, asymptotic analysis and complexity classes — the theory behind efficient programs.',
    'डिज़ाइन तकनीकें, असिम्प्टोटिक विश्लेषण और कॉम्प्लेक्सिटी वर्ग — दक्ष प्रोग्राम का सिद्धांत।',
  ],
  sections: [
    {
      id: 'asymptotic',
      title: ['Asymptotic Notations', 'असिम्प्टोटिक संकेतन'],
      blocks: [
        ['table',
          [['Notation', 'संकेतन'], ['Meaning', 'अर्थ'], ['Analogy', 'उपमा']],
          [
            [['Big-O (O)', 'Big-O'], ['Upper bound — worst case ≤ g(n)', 'ऊपरी सीमा — worst case'], ['“At most” / “≤”', '“अधिकतम”']],
            [['Big-Omega (Ω)', 'Ω'], ['Lower bound — best case ≥ g(n)', 'निचली सीमा — best case'], ['“At least” / “≥”', '“कम-से-कम”']],
            [['Theta (Θ)', 'Θ'], ['Tight bound — both O and Ω', 'दृढ़ सीमा — दोनों'], ['“Exactly of order”', '“ठीक इसी क्रम का”']],
          ]],
        ['ul', [
          ['Growth order: 1 < log n < n < n log n < n² < n³ < 2ⁿ < n!', 'वृद्धि क्रम: 1 < log n < n < n log n < n² < n³ < 2ⁿ < n!'],
          ['Best case of quick sort = O(n log n); worst case of binary search = O(log n).', 'Quick sort best case = O(n log n); binary search worst case = O(log n)।'],
        ]],
      ],
    },
    {
      id: 'techniques',
      title: ['Algorithm Design Techniques', 'डिज़ाइन तकनीकें'],
      blocks: [
        ['table',
          [['Technique', 'तकनीक'], ['Idea', 'विचार'], ['Classic examples', 'प्रसिद्ध उदाहरण']],
          [
            [['Divide & Conquer', 'भाग लें व जीतें'], ['Split → solve → merge', 'बाँटें → हल करें → जोड़ें'], ['Merge sort, Quick sort, Binary search, Strassen matrix', 'Merge sort, Quick sort']],
            [['Greedy', 'लालची विधि'], ['Local best choice each step', 'हर चरण में तात्कालिक सर्वोत्तम'], ['Kruskal, Prim, Dijkstra, Fractional Knapsack, Huffman', 'Dijkstra, Kruskal, Prim']],
            [['Dynamic Programming', 'गतिक प्रोग्रामन'], ['Store sub-results (overlapping subproblems)', 'उप-परिणाम संचित करें'], ['0/1 Knapsack, Floyd-Warshall, LCS, Fibonacci', 'Knapsack, LCS']],
            [['Backtracking', 'पुनः खोज'], ['Try, undo on failure (DFS + pruning)', 'आज़माएँ, असफल हो तो वापस'], ['N-Queens, Sudoku, Hamiltonian cycle', 'N-Queens, Sudoku']],
            [['Branch & Bound', 'शाखा-सीमा'], ['Backtracking + bounding function', 'backtracking + सीमा फलन'], ['TSP, 15-puzzle', 'TSP']],
          ]],
        ['pyq', {
          q: 'The first problem proven to be NP-Complete was:',
          opts: ['Travelling Salesman Problem', 'Hamiltonian Cycle Problem', 'Boolean Satisfiability Problem (SAT)', 'Knapsack Problem'],
          ans: 2,
          ex: ["Cook (1971) proved SAT is NP-complete — “Cook's Theorem”. Every NP problem reduces to it.",
               "Cook (1971) ने सिद्ध किया कि SAT NP-Complete है — “Cook's Theorem”। सभी NP समस्याएँ इसमें reduce होती हैं।"],
          src: 'Bihar STET C.S. · 12.06.2024 (Shift-I)',
        }],
        ['pyq', {
          q: 'How many solutions does the 8-Queens problem have?',
          opts: ['64', '92', '8', '56'],
          ans: 1,
          ex: ['8-Queens has 92 distinct solutions (12 fundamental, rest by symmetry).',
               '8-Queens के कुल 92 हल हैं (12 मूल, शेष सममिति से)।'],
          src: 'Bihar STET C.S. · PYQ compilation',
        }],
      ],
    },
    {
      id: 'graph-algos',
      title: ['Graph Algorithms', 'ग्राफ़ एल्गोरिद्म'],
      blocks: [
        ['table',
          [['Algorithm', 'एल्गोरिद्म'], ['Purpose', 'उद्देश्य'], ['Complexity', 'कॉम्प्लेक्सिटी']],
          [
            [['BFS · Breadth-First Search', 'BFS'], ['Level-wise traversal; shortest path in unweighted graph', 'स्तर-वार traversal; unweighted shortest path'], ['O(V+E), queue', 'O(V+E)']],
            [['DFS · Depth-First Search', 'DFS'], ['Depth-wise traversal; cycle detection, topological sort', 'गहराई से traversal; cycle detection'], ['O(V+E), stack/recursion', 'O(V+E)']],
            [['Dijkstra', 'Dijkstra'], ['Single-source shortest path (non-negative weights)', 'single-source shortest path (+ weights)'], ['O((V+E) log V)', 'O((V+E) log V)']],
            [['Bellman-Ford', 'Bellman-Ford'], ['Shortest path WITH negative edges', 'ऋणात्मक edge वाले graph हेतु'], ['O(VE)', 'O(VE)']],
            [['Prim / Kruskal', 'Prim/Kruskal'], ['Minimum Spanning Tree (MST)', 'न्यूनतम फैलाव वृक्ष'], ['O(E log V) / O(E log E)', '—']],
            [['Floyd-Warshall', 'Floyd-Warshall'], ['All-pairs shortest paths (DP)', 'सभी जोड़ों के shortest path'], ['O(V³)', 'O(V³)']],
          ]],
        ['callout', 'tip',
          ['Representation matters: Adjacency matrix uses O(V²) space with O(1) edge lookup; adjacency list uses O(V+E) — better for sparse graphs.',
           'Adjacency matrix O(V²) स्थान लेती है पर lookup O(1); adjacency list O(V+E) — sparse graph हेतु बेहतर।']],
      ],
    },
    {
      id: 'complexity-classes',
      title: ['P, NP & Complexity Classes', 'P, NP एवं कॉम्प्लेक्सिटी वर्ग'],
      blocks: [
        ['table',
          [['Class', 'वर्ग'], ['Definition', 'परिभाषा'], ['Examples', 'उदाहरण']],
          [
            [['P (Polynomial time)', 'P (बहुपद समय)'], ['Solvable in polynomial time (deterministic)', 'बहुपद समय में हल'], ['Sorting, MST (Minimum Spanning Tree), BFS (Breadth-First Search)']],
            [['NP (Non-deterministic Polynomial)', 'NP (अनिश्चित बहुपद)'], ['Verifiable in polynomial time', 'हल बहुपद समय में जाँचा जा सके'], ['SAT (Boolean Satisfiability), TSP (Travelling Salesman Problem) decision']],
            [['NP-Complete', 'NP-Complete'], ['In NP + every NP problem reduces to it (hardest in NP)', 'NP में सबसे कठिन'], ['SAT, 3-SAT, Vertex Cover']],
            [['NP-Hard', 'NP-Hard'], ['At least as hard as NP-complete (need not be in NP)', 'NP-Complete से भी कठिन/समकक्ष'], ['Halting problem, TSP optimization']],
          ]],
        ['callout', 'exam',
          ['P = NP? is the biggest open question in CS. If any ONE NP-complete problem gets a polynomial algorithm, ALL of them do.',
           'P = NP? कंप्यूटर विज्ञान का सबसे बड़ा अनसुलझा प्रश्न है। यदि कोई एक NP-Complete समस्या बहुपद समय में हल हो, तो सभी हो जाएँगी।']],
      ],
    },
  ],
};
