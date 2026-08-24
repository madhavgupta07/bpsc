export default {
  num: 3,
  title: ['Programming & Data Structures', 'प्रोग्रामन एवं डेटा संरचनाएँ'],
  intro: [
    'From data types to arrays, linked lists, stacks, queues — the C-programmer’s toolkit.',
    'डेटा टाइप से लेकर ऐरे, लिंक्ड लिस्ट, स्टैक, क्यू तक — C प्रोग्रामर का औज़ार-बक्स।',
  ],
  sections: [
    {
      id: 'basics',
      title: ['Data, Information & Algorithms', 'डेटा, सूचना एवं एल्गोरिथ्म'],
      blocks: [
        ['table',
          [['Data', 'डेटा'], ['Information', 'सूचना']],
          [
            [['Raw, unprocessed facts (58, 62)', 'कच्चा, अप्रोसेस्ड तथ्य (58, 62)'], ['Processed, meaningful output (“average marks = 60”)', 'संसाधित, अर्थपूर्ण परिणाम (“औसत = 60”)']],
          ]],
        ['ul', [
          ['Algorithm properties: input, output, definiteness, finiteness, effectiveness.', 'एल्गोरिथ्म के गुण: input, output, निश्चितता, सीमितता, प्रभावशीलता।'],
          ['Data types in C: primitive (int, float, char, double) vs derived (array, pointer, function) vs user-defined (struct, union).', 'C के डेटा प्रकार: primitive (int, float, char, double), derived (array, pointer), user-defined (struct, union)।'],
        ]],
        ['pyq', {
          q: 'Float is a/an:',
          opts: ['Value', 'Variable', 'Operator', 'Data type'],
          ans: 3,
          ex: ['float is a primitive/built-in data type storing decimal (real) numbers.',
               'float एक primitive (built-in) डेटा प्रकार है जो दशमलव संख्याएँ रखता है।'],
          src: 'Bihar STET C.S. · 2020',
        }],
      ],
    },
    {
      id: 'arrays',
      title: ['Arrays & Address Formulas', 'ऐरे एवं पता-सूत्र'],
      blocks: [
        ['p',
          'Array = collection of same-type elements at contiguous memory. Row-major stores row-by-row (C uses this); column-major stores column-by-column (Fortran).',
          'ऐरे = समान प्रकार के संग्रहित तत्व। Row-major में पंक्ति-दर-पंक्ति (C में); column-major में स्तंभ-दर-स्तंभ (Fortran में)।'],
        ['code',
          'Row-major address of A[i][j]:\n  Loc = Base + W * ( (i-LR)*NC + (j-LC) )\n\nColumn-major:\n  Loc = Base + W * ( (j-LC)*NR + (i-LR) )\n\nW = size of element, NC/NR = cols/rows,\nLR/LC = lower bound of row/col',
          '1-D and 2-D index formulas', '1-D व 2-D पता-सूत्र'],
        ['callout', 'exam',
          ['Sparse matrix: most elements zero — stored as (row, col, value) triples to save space.',
           'विरल (sparse) मैट्रिक्स: अधिकांश तत्व शून्य — स्थान बचाने हेतु (row, col, value) त्रिक में भंडारण।']],
      ],
    },
    {
      id: 'recursion',
      title: ['Recursion', 'पुनरावृत्ति (Recursion)'],
      blocks: [
        ['ul', [
          ['Function calls itself with a smaller sub-problem; needs a base case to stop.', 'फंक्शन स्वयं को छोटे उप-समस्या से बुलाता है; रुकने हेतु base case आवश्यक।'],
          ['Each call uses a stack frame → recursion consumes stack memory.', 'प्रत्येक call stack frame लेती है → recursion stack मेमोरी खाती है।'],
          ['Tower of Hanoi moves = 2ⁿ − 1 (n disks). n=3 → 7 moves.', 'टॉवर ऑफ हैनॉय की चालें = 2ⁿ − 1 (n डिस्क)। n=3 → 7 चालें।'],
          ['Backtracking: try a choice, if it fails undo and try next (8-queens, maze).', 'Backtracking: एक विकल्प आज़माएँ, असफल हो तो वापस लेकर अगला। (8-क्वीन, भूलभुलैया)'],
        ]],
      ],
    },
    {
      id: 'linked-lists',
      title: ['Linked Lists', 'लिंक्ड लिस्ट'],
      blocks: [
        ['table',
          [['Type', 'प्रकार'], ['Structure', 'संरचना'], ['Speciality', 'विशेषता']],
          [
            [['Singly linked', ' singly'], ['node → next only', 'केवल next pointer'], ['One-way traversal', 'एकदिशीय traversal']],
            [['Doubly linked', 'doubly'], ['prev + next pointers', 'prev + next दोनों'], ['Two-way traversal, easy deletion', 'द्विदिशीय, हटाना आसान']],
            [['Circular', 'circular'], ['last node → first node', 'अंतिम → प्रथम'], ['Round-robin scheduling', 'राउंड-रॉबिन शेड्यूलिंग']],
          ]],
        ['callout', 'tip',
          ['Insertion/deletion at head: O(1) for linked list vs O(n) shifting for array. Random access O(1): array ✓, list ✗.',
           'आरंभ पर insert/delete: लिंक्ड लिस्ट O(1), ऐरे में shift O(n)। यादृच्छिक access O(1): ऐरे ✓, लिस्ट ✗।']],
      ],
    },
    {
      id: 'stacks-queues',
      title: ['Stacks & Queues', 'स्टैक एवं क्यू'],
      blocks: [
        ['table',
          [['ADT (Abstract Data Type)', 'ADT (सार डेटा प्रकार)'], ['Principle', 'सिद्धांत'], ['Operations', 'क्रियाएँ'], ['Applications', 'अनुप्रयोग']],
          [
            [['Stack', 'स्टैक'], ['LIFO (Last In First Out)', 'LIFO (अंत में आया पहले गया)'], ['push, pop, peek (top)', 'push, pop, peek'], ['Recursion, undo, expression evaluation', 'recursion, undo, expression evaluation']],
            [['Queue', 'क्यू'], ['FIFO (First In First Out)', 'FIFO (पहले आया पहले गया)'], ['enqueue (rear), dequeue (front)', 'enqueue (rear), dequeue (front)'], ['Printer spooling, CPU scheduling', 'प्रिंटर स्पूल, CPU scheduling']],
            [['Circular queue', 'circular क्यू'], ['FIFO, reuses space', 'स्थान पुनःउपयोग'], ['(rear+1) % n formula', '(rear+1) % n सूत्र'], ['Fixed buffer streams', 'बफर']],
            [['Deque / Priority', 'डेक/प्रायोरिटी'], ['Both ends / by priority', 'दोनों सिरों से / प्राथमिकता से'], ['insertFront, deleteRear…', 'insertFront…'], ['Browser history, Dijkstra’s queue', 'ब्राउज़र इतिहास']],
          ]],
        ['code',
          'Infix:  A + B * C\nPostfix: A B C * +   (operator after operands)\nEvaluate postfix using a STACK:\n  operand → push ; operator → pop two, apply, push',
          'Infix → Postfix conversion', 'इनफिक्स से पोस्टफिक्स'],
      ],
    },
    {
      id: 'search-sort',
      title: ['Searching & Sorting', 'खोज एवं छँटाई'],
      blocks: [
        ['table',
          [['Search', 'खोज'], ['Requirement', 'शर्त'], ['Time (worst)', 'समय']],
          [
            [['Linear search', 'लीनियर'], ['None', 'कोई नहीं'], ['O(n)', 'O(n)']],
            [['Binary search', 'बाइनरी'], ['Sorted array ✓', 'क्रमबद्ध ऐरे'], ['O(log n)', 'O(log n)']],
            [['Hashing', 'हैशिंग'], ['Hash function', 'हैश फंक्शन'], ['O(1) average', 'औसत O(1)']],
          ]],
        ['table',
          [['Sort', 'Sort'], ['Best', 'Best'], ['Average', 'Average'], ['Worst', 'Worst'], ['Stable?', 'Stable?']],
          [
            [['Bubble'], ['O(n)', 'O(n)'], ['O(n²)', 'O(n²)'], ['O(n²)', 'O(n²)'], ['Yes', 'Yes']],
            [['Selection'], ['O(n²)', 'O(n²)'], ['O(n²)', 'O(n²)'], ['O(n²)', 'O(n²)'], ['No', 'No']],
            [['Insertion'], ['O(n)', 'O(n)'], ['O(n²)', 'O(n²)'], ['O(n²)', 'O(n²)'], ['Yes', 'Yes']],
            [['Merge'], ['O(n log n)', 'O(n log n)'], ['O(n log n)', 'O(n log n)'], ['O(n log n)', 'O(n log n)'], ['Yes', 'Yes']],
            [['Quick'], ['O(n log n)', 'O(n log n)'], ['O(n log n)', 'O(n log n)'], ['O(n²)', 'O(n²)'], ['No', 'No']],
            [['Heap'], ['O(n log n)', 'O(n log n)'], ['O(n log n)', 'O(n log n)'], ['O(n log n)', 'O(n log n)'], ['No', 'No']],
            [['Counting/Bucket'], ['O(n+k)', 'O(n+k)'], ['O(n+k)', 'O(n+k)'], ['O(n+k)', 'O(n+k)'], ['Yes', 'Yes']],
          ]],
        ['pyq', {
          q: 'Which of the following is NOT a comparison-based sorting algorithm?',
          opts: ['Insertion Sort', 'Heap Sort', 'Quick Sort', 'Counting Sort'],
          ans: 3,
          ex: ['Counting sort counts frequencies instead of comparing elements — it sorts in linear time O(n+k).',
               'Counting sort तुलना न करके आवृत्तियाँ गिनता है — linear time O(n+k) में छँटाई।'],
          src: 'Bihar STET C.S. · PYQ compilation',
        }],
        ['pyq', {
          q: 'Which sorting algorithm is fastest on average?',
          opts: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Insertion Sort'],
          ans: 2,
          ex: ['Quick sort has the smallest constant factors in practice; average case O(n log n) beats bubble/insertion O(n²).',
               'व्यवहार में Quick sort के constant सबसे छोटे हैं; औसत स्थिति O(n log n) बनाम Bubble/Insertion O(n²)।'],
          src: 'Bihar STET C.S. · PYQ compilation',
        }],
      ],
    },
  ],
};
