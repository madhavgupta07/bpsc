const chapters = [
  { chapterNumber: 1, title_en: "Digital Logic", title_hi: "\u0921\u093F\u091C\u093F\u091F\u0932 \u0932\u0949\u091C\u093F\u0915", description_en: "Foundations of digital systems covering number systems, Boolean algebra, logic gates, Karnaugh maps, and both combinational and sequential circuit design.", description_hi: "\u0921\u093F\u091C\u093F\u091F\u0932 \u0938\u093F\u0938\u094D\u091F\u092E \u0915\u0940 \u0928\u0940\u0902\u0935 \u091C\u093F\u0938\u092E\u0947\u0902 \u0938\u0902\u0916\u094D\u092F\u093E \u092A\u094D\u0930\u0923\u093E\u0932\u093F\u092F\u093E\u0902, \u092C\u0942\u0932\u093F\u092F\u0928 \u092C\u0940\u091C\u0917\u0923\u093F\u0924, \u0932\u0949\u091C\u093F\u0915 \u0917\u0947\u091F, \u0915\u093E\u0930\u094D\u0928\u094C\u0917 \u092E\u093E\u0928\u091A\u093F\u0924\u094D\u0930 \u0924\u0925\u093E \u0938\u0902\u092F\u094B\u091C\u0928\u093E\u0924\u094D\u092E\u0915 \u0914\u0930 \u0905\u0928\u0941\u0915\u094D\u0930\u092E\u093F\u0915 \u0938\u0930\u094D\u0915\u093F\u091F \u0921\u093F\u091C\u093E\u0907\u0928 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "cpu", section: "subject", weightage: 8, order: 1 },
  { chapterNumber: 2, title_en: "Computer Organization & Architecture", title_hi: "\u0915\u0902\u092A\u094D\u092F\u0942\u091F\u0930 \u0938\u0902\u0917\u0920\u0928 \u0914\u0930 \u0935\u093E\u0938\u094D\u0924\u0941\u0915\u0932\u093E", description_en: "Internal organization of computers including CPU design, memory hierarchy, addressing modes, ALU operations, error detection codes, and microprocessor architecture.", description_hi: "\u0915\u0902\u092A\u094D\u092F\u0942\u091F\u0930 \u0915\u0940 \u0906\u0902\u0924\u0930\u093F\u0915 \u0938\u0902\u0930\u091A\u0928\u093E \u091C\u093F\u0938\u092E\u0947\u0902 CPU \u0921\u093F\u091C\u093E\u0907\u0928, \u092E\u0947\u092E\u094B\u0930\u0940 \u092A\u0926\u093E\u0928\u0941\u0915\u094D\u0930\u092E, \u090F\u0921\u094D\u0930\u0947\u0938\u093F\u0902\u0917 \u092E\u094B\u0921, ALU \u0938\u0902\u091A\u093E\u0932\u0928, \u0924\u094D\u0930\u0941\u091F\u093F \u092A\u0924\u094D\u0924\u093E \u0932\u0917\u093E\u0928\u0947 \u0935\u093E\u0932\u0947 \u0915\u094B\u0921 \u0914\u0930 \u092E\u093E\u0907\u0915\u094D\u0930\u094B\u092A\u094D\u0930\u094B\u0938\u0947\u0938\u0930 \u0935\u093E\u0938\u094D\u0924\u0941\u0915\u0932\u093E \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "server", section: "subject", weightage: 8, order: 2 },
  { chapterNumber: 3, title_en: "Programming & Data Structures", title_hi: "\u092A\u094D\u0930\u094B\u0917\u094D\u0930\u093E\u092E\u093F\u0902\u0917 \u0914\u0930 \u0921\u0947\u091F\u093E \u0938\u0930\u0902\u091A\u0928\u093E\u090F\u0902", description_en: "Core programming concepts and data structures including arrays, linked lists, stacks, queues, trees, graphs, searching, sorting, and recursion.", description_hi: "\u092E\u0942\u0932 \u092A\u094D\u0930\u094B\u0917\u094D\u0930\u093E\u092E\u093F\u0902\u0917 \u0905\u0935\u0927\u093E\u0930\u0923\u093E\u090F\u0902 \u0914\u0930 \u0921\u0947\u091F\u093E \u0938\u0930\u0902\u091A\u0928\u093E\u090F\u0902 \u091C\u093F\u0938\u092E\u0947\u0902 \u0938\u0930\u0923\u093F\u092F\u093E\u0902, \u0938\u0902\u092C\u0926\u094D\u0927 \u0938\u0942\u091A\u093F\u092F\u093E\u0902, \u0938\u094D\u091F\u0948\u0915, \u0915\u0924\u093E\u0930, \u0935\u0943\u0915\u094D\u0937, \u0917\u094D\u0930\u093E\u092F, \u0916\u094B\u091C, \u0915\u094D\u0930\u092E\u092C\u0926\u094D\u0927 \u0915\u0930\u0928\u093E \u0914\u0930 \u092A\u0941\u0928\u0930\u093E\u0935\u0943\u0924\u094D\u0924\u093F \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "code", section: "subject", weightage: 10, order: 3 },
  { chapterNumber: 4, title_en: "Algorithms", title_hi: "\u090F\u0932\u0917\u094B\u0930\u093F\u0926\u092E", description_en: "Algorithm design and analysis covering time and space complexity, Big-O notation, divide and conquer, dynamic programming, greedy algorithms, and NP-completeness.", description_hi: "\u090F\u0932\u0917\u094B\u0930\u093F\u0926\u092E \u0921\u093F\u091C\u093E\u0907\u0928 \u0914\u0930 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923 \u091C\u093F\u0938\u092E\u0947\u0902 \u0938\u092E\u092F \u0914\u0930 \u0938\u094D\u0925\u093E\u0928\u093F\u0915 \u091C\u091F\u093F\u0932\u0924\u093E, \u092C\u093F\u0917-\u0913 \u0938\u0902\u0915\u0947\u0924\u0928, \u0935\u093F\u092D\u093E\u091C\u0928 \u0914\u0930 \u0935\u093F\u091C\u092F, \u0917\u0924\u093F\u0936\u0940\u0932 \u092A\u094D\u0930\u094B\u0917\u094D\u0930\u093E\u092E\u093F\u0902\u0917, \u0932\u093E\u0932\u091A\u0940 \u090F\u0932\u0917\u094B\u0930\u093F\u0926\u092E \u0914\u0930 NP-\u0938\u092E\u094D\u092A\u0942\u0930\u094D\u0923\u0924\u093E \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "route", section: "subject", weightage: 7, order: 4 },
  { chapterNumber: 5, title_en: "Operating Systems", title_hi: "\u0911\u092A\u0930\u0947\u091F\u093F\u0902\u0917 \u0938\u093F\u0938\u094D\u091F\u092E", description_en: "Operating system concepts including process management, CPU scheduling, deadlock handling, memory management, file systems, and system security.", description_hi: "\u0911\u092A\u0930\u0947\u091F\u093F\u0902\u0917 \u0938\u093F\u0938\u094D\u091F\u092E \u0915\u0940 \u0905\u0935\u0927\u093E\u0930\u0923\u093E\u090F\u0902 \u091C\u093F\u0938\u092E\u0947\u0902 \u092A\u094D\u0930\u0915\u094D\u0930\u093F\u092F\u093E \u092A\u094D\u0930\u092C\u0902\u0927\u0928, CPU \u0936\u0947\u0921\u094D\u092F\u0942\u0932\u093F\u0902\u0917, \u092E\u0943\u0924 \u0932\u0942\u092A \u0939\u0948\u0902\u0921\u0932\u093F\u0902\u0917, \u092E\u0947\u092E\u094B\u0930\u0940 \u092A\u094D\u0930\u092C\u0902\u0927\u0928, \u092B\u093C\u093E\u0907\u0932 \u0938\u093F\u0938\u094D\u091F\u092E \u0914\u0930 \u0938\u093F\u0938\u094D\u091F\u092E \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "monitor", section: "subject", weightage: 8, order: 5 },
  { chapterNumber: 6, title_en: "Database Management System", title_hi: "\u0921\u0947\u091F\u093E\u092C\u0947\u0938 \u092A\u094D\u0930\u092C\u0902\u0927\u0928 \u092A\u094D\u0930\u0923\u093E\u0932\u093E\u0908", description_en: "DBMS fundamentals covering architecture, ER model, relational model, normalization techniques, transaction management, and SQL querying.", description_hi: "DBMS \u0915\u0940 \u092C\u0941\u0928\u093F\u092F\u093E\u0926\u0940 \u092C\u093E\u0924\u0947\u0902 \u091C\u093F\u0938\u092E\u0947\u0902 \u0935\u093E\u0938\u094D\u0924\u0941\u0915\u0932\u093E, ER \u092E\u0949\u0921\u0932, \u0938\u0902\u092C\u0902\u0927\u092A\u0930\u0915 \u092E\u0949\u0921\u0932, \u0938\u093E\u092E\u093E\u0928\u094D\u092F\u0940\u0915\u0930\u0923 \u0924\u0915\u0928\u0940\u0915\u0947\u0902, \u0932\u0947\u0928\u0926\u0947\u0928 \u092A\u094D\u0930\u092C\u0902\u0927\u0928 \u0914\u0930 SQL \u0915\u094D\u0935\u0947\u0930\u0940 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "database", section: "subject", weightage: 8, order: 6 },
  { chapterNumber: 7, title_en: "Computer Networks", title_hi: "\u0915\u0902\u092A\u094D\u092F\u0942\u091F\u0930 \u0928\u0947\u091F\u0935\u0930\u094D\u0915", description_en: "Networking concepts including OSI and TCP/IP models, network topologies, routing algorithms, IP addressing, and application layer protocols.", description_hi: "\u0928\u0947\u091F\u0935\u0930\u094D\u0915\u093F\u0902\u0917 \u0915\u0940 \u0905\u0935\u0927\u093E\u0930\u0923\u093E\u090F\u0902 \u091C\u093F\u0938\u092E\u0947\u0902 OSI \u0914\u0930 TCP/IP \u092E\u0949\u0921\u0932, \u0928\u0947\u091F\u0935\u0930\u094D\u0915 \u091F\u094B\u092A\u094B\u0932\u0949\u091C\u0940, \u0930\u0942\u091F\u093F\u0902\u0917 \u090F\u0932\u0917\u094B\u0930\u093F\u0926\u092E, IP \u090F\u0921\u094D\u0930\u0947\u0938\u093F\u0902\u0917 \u0914\u0930 \u090F\u092A\u094D\u0932\u093F\u0915\u0947\u0936\u0928 \u0932\u0947\u092F\u0930 \u092A\u094D\u0930\u094B\u091F\u094B\u0915\u0949\u0932 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "globe", section: "subject", weightage: 8, order: 7 },
  { chapterNumber: 8, title_en: "Software Engineering", title_hi: "\u0938\u0949\u092B\u094D\u091F\u0935\u0947\u0930 \u0907\u091C\u0940\u0928\u0940\u092F\u0930\u093F\u0902\u0917", description_en: "Software development lifecycle methodologies including Waterfall, Agile, and Spiral models, software testing strategies, SRS documentation, and project management.", description_hi: "\u0938\u0949\u092B\u094D\u091F\u0935\u0947\u0930 \u0935\u093F\u0915\u093E\u0938 \u091C\u0940\u0935\u0928 \u091A\u0915\u094D\u0930 \u0915\u0940 \u092A\u0926\u094D\u0927\u0924\u093F\u092F\u093E\u0902 \u091C\u093F\u0938\u092E\u0947\u0902 \u0935\u093E\u091F\u0930\u092B\u0949\u0932, \u090F\u091C\u093E\u0907\u0932 \u0914\u0930 \u0938\u094D\u092A\u093E\u0907\u0930\u0932 \u092E\u0949\u0921\u0932, \u0938\u0949\u092B\u094D\u091F\u0935\u0947\u0930 \u092A\u0930\u0940\u0915\u094D\u0937\u0923 \u0930\u0923\u0940\u0924\u093F\u092F\u093E\u0902, SRS \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C\u0940\u0915\u0930\u0923 \u0914\u0930 \u092A\u094D\u0930\u094B\u091C\u0947\u0915\u094D\u091F \u092A\u094D\u0930\u092C\u0902\u0927\u0928 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "cog", section: "subject", weightage: 6, order: 8 },
  { chapterNumber: 9, title_en: "Object-Oriented Programming", title_hi: "\u0911\u092C\u094D\u091C\u0947\u0915\u094D\u091F \u0913\u0930\u093F\u090F\u0902\u091F\u0947\u0921 \u092A\u094D\u0930\u094B\u0917\u094D\u0930\u093E\u092E\u093F\u0902\u0917", description_en: "OOP paradigms covering classes, objects, inheritance, polymorphism, encapsulation, abstraction, and exception handling mechanisms.", description_hi: "OOP \u092A\u094D\u0930\u0924\u093F\u092E\u093E\u0928 \u091C\u093F\u0938\u092E\u0947\u0902 \u0915\u0915\u094D\u0937\u093E\u090F\u0902, \u0911\u092C\u094D\u091C\u0947\u0915\u094D\u091F, \u0935\u093F\u0930\u093E\u0938\u0924, \u092C\u0939\u0941\u0930\u0942\u092A\u0924\u093E, \u0938\u0902\u0932\u0917\u094D\u0928\u0924\u093E, \u0905\u092D\u093F\u0915\u0932\u094D\u092A\u0928\u093E \u0914\u0930 \u0905\u092A\u0935\u093E\u0926 \u0939\u0948\u0902\u0921\u0932\u093F\u0902\u0917 \u0924\u0902\u0924\u094D\u0930 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "boxes", section: "subject", weightage: 7, order: 9 },
  { chapterNumber: 10, title_en: "Web Technologies", title_hi: "\u0935\u0947\u092C \u092A\u094D\u0930\u094C\u0926\u094D\u092F\u094B\u0917\u093F\u0915\u0940", description_en: "Web development technologies including HTML, CSS, JavaScript, server-side scripting with PHP and Node.js, DOM manipulation, XML, and session management.", description_hi: "\u0935\u0947\u092C \u0935\u093F\u0915\u093E\u0938 \u092A\u094D\u0930\u094C\u0926\u094D\u092F\u094B\u0917\u093F\u0915\u093F\u092F\u093E\u0902 \u091C\u093F\u0938\u092E\u0947\u0902 HTML, CSS, JavaScript, PHP \u0914\u0930 Node.js \u0915\u0947 \u0938\u093E\u0925 \u0938\u0930\u094D\u0935\u0930-\u0938\u093E\u0907\u0921 \u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F\u093F\u0902\u0917, DOM \u0939\u0947\u0930\u092B\u0947\u0930, XML \u0914\u0930 \u0938\u0924\u094D\u0930 \u092A\u094D\u0930\u092C\u0902\u0927\u0928 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "globe", section: "subject", weightage: 6, order: 10 },
  { chapterNumber: 11, title_en: "Theory of Computation", title_hi: "\u0917\u0923\u0928\u093E \u0938\u093F\u0927\u093E\u0902\u0924", description_en: "Formal languages and automata theory covering deterministic and non-deterministic finite automata, regular expressions, context-free grammars, pushdown automata, and Turing machines.", description_hi: "\u0914\u092A\u091A\u093E\u0930\u093F\u0915 \u092D\u093E\u0937\u093E\u090F\u0902 \u0914\u0930 \u0911\u091F\u094B\u092E\u0947\u091F\u093E \u0938\u093F\u0927\u093E\u0902\u0924 \u091C\u093F\u0938\u092E\u0947\u0902 \u0928\u093F\u0930\u094D\u0927\u093E\u0930\u0923\u093E\u0924\u094D\u092E\u0915 \u0914\u0930 \u0905\u0928\u093F\u0930\u094D\u0927\u093E\u0930\u0923\u093E\u0924\u094D\u092E\u0915 \u092A\u0930\u093F\u092E\u093F\u0924 \u0911\u091F\u094B\u092E\u0947\u091F\u093E, \u0928\u093F\u092F\u092E\u093F\u0924 \u0905\u092D\u093F\u0935\u094D\u092F\u0915\u094D\u0924\u093F\u092F\u093E\u0902, \u0938\u0902\u0926\u0930\u094D\u092D-\u092E\u0941\u0915\u094D\u0924 \u0935\u094D\u092F\u093E\u0915\u0930\u0923, \u092A\u0941\u0936\u0921\u093E\u0909\u0928 \u0911\u091F\u094B\u092E\u0947\u091F\u093E \u0914\u0930 \u091F\u094D\u092F\u0942\u0930\u093F\u0902\u0917 \u092E\u0936\u0940\u0928 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "infinity", section: "subject", weightage: 6, order: 11 },
  { chapterNumber: 12, title_en: "Internet of Things (IoT)", title_hi: "\u0907\u0902\u091F\u0930\u0928\u0947\u091F \u0911\u092B \u0925\u093F\u0902\u0917\u094D\u0938", description_en: "IoT fundamentals covering architecture, communication protocols, cloud computing integration, Industrial IoT applications, and IoT security challenges.", description_hi: "IoT \u0915\u0940 \u092C\u0941\u0928\u093F\u092F\u093E\u0926\u0940 \u092C\u093E\u0924\u0947\u0902 \u091C\u093F\u0938\u092E\u0947\u0902 \u0935\u093E\u0938\u094D\u0924\u0941\u0915\u0932\u093E, \u0938\u0902\u091A\u093E\u0930 \u092A\u094D\u0930\u094B\u091F\u094B\u0915\u0949\u0932, \u0915\u094D\u0932\u093E\u0909\u0921 \u0915\u0902\u092A\u094D\u092F\u0942\u091F\u093F\u0902\u0917 \u090F\u0915\u0940\u0915\u0930\u0923, \u0911\u0926\u094D\u092F\u094B\u0917\u093F\u0915 IoT \u0905\u0928\u0941\u092A\u094D\u0930\u092F\u094B\u0917 \u0914\u0930 IoT \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u091A\u0941\u0928\u094C\u0924\u093F\u092F\u093E\u0902 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "wifi", section: "subject", weightage: 5, order: 12 },
  { chapterNumber: 13, title_en: "Artificial Intelligence", title_hi: "\u0915\u0943\u0924\u094D\u0930\u093F\u092E \u092C\u0941\u0926\u094D\u0927\u093F\u092E\u0924\u094D\u0924\u093E", description_en: "AI concepts covering search strategies, knowledge representation techniques, machine learning basics, expert systems, and AI planning methods.", description_hi: "AI \u0915\u0940 \u0905\u0935\u0927\u093E\u0930\u0923\u093E\u090F\u0902 \u091C\u093F\u0938\u092E\u0947\u0902 \u0916\u094B\u091C \u0930\u0923\u0940\u0924\u093F\u092F\u093E\u0902, \u091C\u094D\u091E\u093E\u0928 \u092A\u094D\u0930\u0924\u093F\u0928\u093F\u0927\u093F\u0924\u094D\u0935 \u0924\u0915\u0928\u0940\u0915\u0947\u0902, \u092E\u0936\u0940\u0928 \u0932\u0930\u094D\u0928\u093F\u0902\u0917 \u0915\u0940 \u092C\u0941\u0928\u093F\u092F\u093E\u0926\u0940 \u092C\u093E\u0924\u0947\u0902, \u0935\u093F\u0936\u0947\u0937\u091C\u094D\u091E \u092A\u094D\u0930\u0923\u093E\u0932\u093F\u092F\u093E\u0902 \u0914\u0930 AI \u092F\u094B\u091C\u0928\u093E \u0935\u093F\u0927\u093F\u092F\u093E\u0902 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "brain", section: "subject", weightage: 5, order: 13 },
  { chapterNumber: 14, title_en: "E-Commerce", title_hi: "\u0908-\u0915\u0949\u092E\u0930\u094D\u0938", description_en: "E-Commerce concepts covering framework models, digital payment systems, security mechanisms, firewalls, EDI standards, and digital library systems.", description_hi: "\u0908-\u0915\u0949\u092E\u0930\u094D\u0938 \u0915\u0940 \u0905\u0935\u0927\u093E\u0930\u0923\u093E\u090F\u0902 \u091C\u093F\u0938\u092E\u0947\u0902 \u092B\u094D\u0930\u0947\u092E\u0935\u0930\u094D\u0915 \u092E\u0949\u0921\u0932, \u0921\u093F\u091C\u093F\u091F\u0932 \u092D\u0941\u0917\u0924\u093E\u0928 \u092A\u094D\u0930\u0923\u093E\u0932\u093F\u092F\u093E\u0902, \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0924\u0902\u0924\u094D\u0930, \u092B\u093C\u093E\u092F\u0930\u0935\u0949\u0932, EDI \u092E\u093E\u0928\u0915 \u0914\u0930 \u0921\u093F\u091C\u093F\u091F\u0932 \u092A\u0941\u0938\u094D\u0924\u0915\u093E\u0932\u092F \u092A\u094D\u0930\u0923\u093E\u0932\u093F\u092F\u093E\u0902 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "shopping-cart", section: "subject", weightage: 5, order: 14 },
  { chapterNumber: 15, title_en: "Multimedia", title_hi: "\u092E\u0932\u094D\u091F\u0940\u092E\u0940\u0921\u093F\u092F\u093E", description_en: "Multimedia fundamentals covering audio processing, graphics and image formats, animation techniques, video compression, and multimedia project design.", description_hi: "\u092E\u0932\u094D\u091F\u0940\u092E\u0940\u0921\u093F\u092F\u093E \u0915\u0940 \u092C\u0941\u0928\u093F\u092F\u093E\u0926\u0940 \u092C\u093E\u0924\u0947\u0902 \u091C\u093F\u0938\u092E\u0947\u0902 \u0911\u0921\u093F\u092F\u094B \u092A\u094D\u0930\u0938\u0902\u0938\u094D\u0915\u0930\u0923, \u0917\u094D\u0930\u093E\u092B\u093F\u0915\u094D\u0938 \u0914\u0930 \u091B\u0935\u093F \u092A\u094D\u0930\u093E\u0930\u0942\u092A, \u090F\u0928\u093F\u092E\u0947\u0936\u0928 \u0924\u0915\u0928\u0940\u0915\u0947\u0902, \u0935\u0940\u0921\u093F\u092F\u094B \u0938\u0902\u092A\u0940\u0921\u093C \u0914\u0930 \u092E\u0932\u094D\u091F\u0940\u092E\u0940\u0921\u093F\u092F\u093E \u092A\u094D\u0930\u094B\u091C\u0947\u0915\u094D\u091F \u0921\u093F\u091C\u093E\u0907\u0928 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "film", section: "subject", weightage: 5, order: 15 },
  { chapterNumber: 16, title_en: "Art of Teaching & Pedagogy", title_hi: "\u0936\u093F\u0915\u094D\u0937\u0923 \u0915\u0932\u093E \u0914\u0930 \u0936\u093F\u0915\u094D\u0937\u093E\u0936\u093E\u0938\u094D\u0924\u094D\u0930", description_en: "Pedagogical methods including teaching approaches, Bloom's taxonomy, lesson planning, microteaching techniques, classroom management, evaluation methods, and curriculum development.", description_hi: "\u0936\u093F\u0915\u094D\u0937\u093E\u0936\u093E\u0938\u094D\u0924\u094D\u0930 \u0915\u0940 \u0935\u093F\u0927\u093F\u092F\u093E\u0902 \u091C\u093F\u0938\u092E\u0947\u0902 \u0936\u093F\u0915\u094D\u0937\u0923 \u0926\u0943\u0937\u094D\u091F\u093F\u0915\u094B\u0928, \u092C\u094D\u0932\u0942\u092E \u0915\u093E \u0935\u0930\u094D\u0917\u0940\u0915\u0930\u0923, \u092A\u093E\u0920 \u092F\u094B\u091C\u0928\u093E, \u0938\u0942\u0915\u094D\u0937\u094D\u092E\u0936\u093F\u0915\u094D\u0937\u0923 \u0924\u0915\u0928\u0940\u0915\u0947\u0902, \u0915\u0915\u094D\u0937\u093E \u092A\u094D\u0930\u092C\u0902\u0927\u0928, \u092E\u0942\u0932\u094D\u092F\u093E\u0902\u0915\u0928 \u0935\u093F\u0927\u093F\u092F\u093E\u0902 \u0914\u0930 \u092A\u093E\u0920\u094D\u092F\u0915\u094D\u0930\u092E \u0935\u093F\u0915\u093E\u0938 \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "book-open", section: "pedagogy", weightage: 25, order: 16 },
  { chapterNumber: 17, title_en: "GK, Environment & Reasoning", title_hi: "\u0938\u093E\u092E\u093E\u0928\u094D\u092F \u091C\u094D\u091E\u093E\u0928, \u092A\u0930\u094D\u092F\u093E\u0935\u0930\u0923 \u0914\u0930 \u0924\u0930\u094D\u0915\u0936\u0915\u094D\u0924\u093F", description_en: "General knowledge covering current affairs, environmental science fundamentals, mathematical aptitude, and logical reasoning and analytical ability.", description_hi: "\u0938\u093E\u092E\u093E\u0928\u094D\u092F \u091C\u094D\u091E\u093E\u0928 \u091C\u093F\u0938\u092E\u0947\u0902 \u0938\u092E\u0938\u093E\u092E\u092F\u093F\u0915\u0940, \u092A\u0930\u094D\u092F\u093E\u0935\u0930\u0923 \u0935\u093F\u091C\u094D\u091E\u093E\u0928 \u0915\u0940 \u092C\u0941\u0928\u093F\u092F\u093E\u0926\u0940 \u092C\u093E\u0924\u0947\u0902, \u0917\u0923\u093F\u0924\u0940\u092F \u092F\u094B\u0917\u094D\u092F\u0924\u093E \u0914\u0930 \u0924\u093E\u0930\u094D\u0915\u093F\u0915 \u0924\u0930\u094D\u0915\u0936\u0915\u094D\u0924\u093F \u0914\u0930 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923\u093E\u0924\u094D\u092E\u0915 \u0915\u094D\u0937\u092E\u0924\u093E \u0936\u093E\u092E\u093F\u0932 \u0939\u0948\u0902\u0968", icon: "lightbulb", section: "pedagogy", weightage: 25, order: 17 },
];

const topics = [
  {
    "name_en": "Number Systems",
    "name_hi": "संख्या प्रणालियाँ",
    "chapterIndex": 1,
    "description_en": "Binary, octal, hexadecimal number systems and conversions",
    "description_hi": "बाइनरी, ऑक्टल, हेक्साडेसिमल संख्या प्रणालियाँ और रूपांतरण",
    "subtopics": [
      "Binary number system",
      "Octal number system",
      "Hexadecimal number system",
      "Number system conversions",
      "Signed and unsigned numbers"
    ],
    "difficulty": "easy",
    "order": 1
  },
  {
    "name_en": "Boolean Algebra",
    "name_hi": "बूलियन बीजगणित",
    "chapterIndex": 1,
    "description_en": "Boolean laws, theorems, and simplification techniques",
    "description_hi": "बूलियन नियम, प्रमेय और सरलीकरण तकनीकें",
    "subtopics": [
      "Boolean laws and theorems",
      "De Morgan's theorems",
      "Canonical forms",
      "Boolean functions"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Logic Gates",
    "name_hi": "लॉजिक गेट",
    "chapterIndex": 1,
    "description_en": "AND, OR, NOT, NAND, NOR, XOR gates and their implementations",
    "description_hi": "AND, OR, NOT, NAND, NOR, XOR गेट और इनका अमल",
    "subtopics": [
      "Basic logic gates",
      "Universal gates",
      "Gate implementations",
      "Truth tables"
    ],
    "difficulty": "easy",
    "order": 3
  },
  {
    "name_en": "Karnaugh Maps",
    "name_hi": "कार्नौग मानचित्र",
    "chapterIndex": 1,
    "description_en": "K-map simplification for 2, 3, 4, 5 variable functions",
    "description_hi": "2, 3, 4, 5 वेरिएबल फंक्शन के लिए K-map सरलीकरण",
    "subtopics": [
      "2-variable K-map",
      "3-variable K-map",
      "4-variable K-map",
      "Don't care conditions"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "Combinational Circuits",
    "name_hi": "संयोजनात्मक सर्किट",
    "chapterIndex": 1,
    "description_en": "Multiplexers, demultiplexers, encoders, decoders, adders, subtractors",
    "description_hi": "मल्टीप्लेक्सर, डीमल्टीप्लेक्सर, एन्कोडर, डीकोडर, जोड़ने वाले, घटाने वाले",
    "subtopics": [
      "Multiplexers",
      "Demultiplexers",
      "Encoders and decoders",
      "Half and full adders",
      "Half and full subtractors"
    ],
    "difficulty": "medium",
    "order": 5
  },
  {
    "name_en": "Sequential Circuits",
    "name_hi": "क्रमबद्ध सर्किट",
    "chapterIndex": 1,
    "description_en": "Flip-flops, registers, counters, and state machines",
    "description_hi": "फ्लिप-फ्लाप, रजिस्टर, काउंटर और स्थिति मशीन",
    "subtopics": [
      "SR flip-flop",
      "JK flip-flop",
      "D flip-flop",
      "T flip-flop",
      "Registers",
      "Synchronous counters",
      "Asynchronous counters"
    ],
    "difficulty": "hard",
    "order": 6
  },
  {
    "name_en": "Register Transfer Level",
    "name_hi": "रजिस्टर हस्तांतरण स्तर",
    "chapterIndex": 1,
    "description_en": "RTL design, ASM charts, and hardware implementation",
    "description_hi": "RTL डिज़ाइन, ASM चार्ट और हार्डवेयर अमल",
    "subtopics": [
      "RTL operations",
      "ASM chart representation",
      "Control sequences"
    ],
    "difficulty": "hard",
    "order": 7
  },
  {
    "name_en": "Number Representation",
    "name_hi": "संख्या प्रतिनिधि",
    "chapterIndex": 2,
    "description_en": "Signed number representations: sign-magnitude, 1's complement, 2's complement",
    "description_hi": "हस्ताक्षरित संख्या प्रतिनिधि: चिह्न-परिमाण, 1'स पूर्ण, 2'स पूर्ण",
    "subtopics": [
      "Sign-magnitude representation",
      "1's complement",
      "2's complement",
      "Arithmetic operations"
    ],
    "difficulty": "medium",
    "order": 1
  },
  {
    "name_en": "IEEE Floating Point",
    "name_hi": "IEEE फ्लोटिंग पॉइंट",
    "chapterIndex": 2,
    "description_en": "IEEE 754 single and double precision formats",
    "description_hi": "IEEE 754 सिंगल और डबल विवरणता फार्मेट",
    "subtopics": [
      "Single precision format",
      "Double precision format",
      "Special values",
      "Floating point arithmetic"
    ],
    "difficulty": "hard",
    "order": 2
  },
  {
    "name_en": "Memory Organization",
    "name_hi": "मेमोरी संगठन",
    "chapterIndex": 2,
    "description_en": "Memory hierarchy, cache memory, virtual memory, and memory mapping techniques",
    "description_hi": "मेमोरी वर्ग, कैश मेमोरी, वर्चुअल मेमोरी और मेमोरी मैपिंग तकनीकें",
    "subtopics": [
      "Memory hierarchy",
      "Cache memory",
      "Cache mapping techniques",
      "Virtual memory",
      "Page replacement algorithms"
    ],
    "difficulty": "hard",
    "order": 3
  },
  {
    "name_en": "CPU Design",
    "name_hi": "CPU डिज़ाइन",
    "chapterIndex": 2,
    "description_en": "CPU architecture, instruction cycles, and control unit design",
    "description_hi": "CPU वास्तुकला, निर्देश चक्र और नियंत्रण इकाई डिज़ाइन",
    "subtopics": [
      "CPU architecture",
      "Instruction cycles",
      "Control unit design",
      "Hardwired vs microprogrammed"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "Addressing Modes",
    "name_hi": "एड्रेसिंग मोड",
    "chapterIndex": 2,
    "description_en": "Various addressing modes used in instruction sets",
    "description_hi": "निर्देश सेट में उपयोग किए जाने वाले विभिन्न एड्रेसिंग मोड",
    "subtopics": [
      "Immediate addressing",
      "Direct addressing",
      "Indirect addressing",
      "Register addressing",
      "Indexed addressing"
    ],
    "difficulty": "medium",
    "order": 5
  },
  {
    "name_en": "ALU Operations",
    "name_hi": "ALU संचालन",
    "chapterIndex": 2,
    "description_en": "Arithmetic Logic Unit operations and design",
    "description_hi": "अक्षर लॉजिक इकाई संचालन और डिज़ाइन",
    "subtopics": [
      "Arithmetic operations",
      "Logical operations",
      "Shift operations",
      "ALU design"
    ],
    "difficulty": "medium",
    "order": 6
  },
  {
    "name_en": "Error Detection Codes",
    "name_hi": "त्रुटि पत्ता लगाने वाले कोड",
    "chapterIndex": 2,
    "description_en": "Parity codes, Hamming codes, CRC, and error correction",
    "description_hi": "पैरिटी कोड, हैमिंग कोड, CRC और त्रुटि सुधारन",
    "subtopics": [
      "Parity code",
      "Hamming code",
      "CRC",
      "Error correction"
    ],
    "difficulty": "medium",
    "order": 7
  },
  {
    "name_en": "Microprocessor Architecture",
    "name_hi": "माइक्रोप्रोसेसर वास्तुकला",
    "chapterIndex": 2,
    "description_en": "8085/8086 microprocessor architecture and programming",
    "description_hi": "8085/8086 माइक्रोप्रोसेसर वास्तुकला और प्रोग्रामिंग",
    "subtopics": [
      "8085 architecture",
      "8086 architecture",
      "Instruction set",
      "Addressing modes",
      "Interrupts"
    ],
    "difficulty": "hard",
    "order": 8
  },
  {
    "name_en": "C Programming Basics",
    "name_hi": "C प्रोग्रामिंग बुनियादीएँ",
    "chapterIndex": 3,
    "description_en": "C language fundamentals, data types, operators, control structures",
    "description_hi": "C भाषा बुनियादी अवधारणाएँ, डेटा प्रकार, ऑपरेटर, नियंत्रण संरचनाएँ",
    "subtopics": [
      "Data types",
      "Operators",
      "Control structures",
      "Functions",
      "Arrays",
      "Strings"
    ],
    "difficulty": "easy",
    "order": 1
  },
  {
    "name_en": "Pointers",
    "name_hi": "पॉइंटर",
    "chapterIndex": 3,
    "description_en": "Pointer concepts, pointer arithmetic, and dynamic memory allocation",
    "description_hi": "पॉइंटर अवधारणाएँ, पॉइंटर बीजगणित और गतिशील मेमोरी आवंटन",
    "subtopics": [
      "Pointer basics",
      "Pointer arithmetic",
      "Pointers and arrays",
      "Pointers and functions",
      "Dynamic memory allocation",
      "malloc/free"
    ],
    "difficulty": "hard",
    "order": 2
  },
  {
    "name_en": "Arrays and Strings",
    "name_hi": "एरे और स्ट्रिंग",
    "chapterIndex": 3,
    "description_en": "Array operations, string handling, and multidimensional arrays",
    "description_hi": "एरे संचालन, स्ट्रिंग हैंडलिंग और बहु-आयामिक एरे",
    "subtopics": [
      "1D arrays",
      "2D arrays",
      "Array operations",
      "String operations",
      "String functions"
    ],
    "difficulty": "easy",
    "order": 3
  },
  {
    "name_en": "Linked Lists",
    "name_hi": "संबद्ध सूचियाँ",
    "chapterIndex": 3,
    "description_en": "Singly, doubly, and circular linked lists",
    "description_hi": "एकल, द्वैय और वृत्ताकार संबद्ध सूचियाँ",
    "subtopics": [
      "Singly linked list",
      "Doubly linked list",
      "Circular linked list",
      "Operations on linked lists"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "Stacks and Queues",
    "name_hi": "स्टैक और कतार",
    "chapterIndex": 3,
    "description_en": "Stack and queue operations and applications",
    "description_hi": "स्टैक और कतार संचालन और अनुप्रयोग",
    "subtopics": [
      "Stack operations",
      "Queue operations",
      "Circular queue",
      "Priority queue",
      "Applications"
    ],
    "difficulty": "medium",
    "order": 5
  },
  {
    "name_en": "Trees",
    "name_hi": "वृक्ष",
    "chapterIndex": 3,
    "description_en": "Binary trees, BST, AVL trees, and heap data structures",
    "description_hi": "द्विआयामी वृक्ष, BST, AVL वृक्ष और हीप डेटा संरचना",
    "subtopics": [
      "Binary tree",
      "Binary search tree",
      "AVL tree",
      "Heap",
      "Tree traversals"
    ],
    "difficulty": "hard",
    "order": 6
  },
  {
    "name_en": "Graphs",
    "name_hi": "ग्राफ",
    "chapterIndex": 3,
    "description_en": "Graph representations, BFS, DFS, and graph algorithms",
    "description_hi": "ग्राफ प्रतिनिधि, BFS, DFS और ग्राफ एल्गोरिद्म",
    "subtopics": [
      "Graph representation",
      "BFS",
      "DFS",
      "Shortest path algorithms",
      "Minimum spanning tree"
    ],
    "difficulty": "hard",
    "order": 7
  },
  {
    "name_en": "Sorting Algorithms",
    "name_hi": "क्रमबद्ध एल्गोरिद्म",
    "chapterIndex": 3,
    "description_en": "Bubble, selection, insertion, merge, and quick sort",
    "description_hi": "बबल, चयन, सामहेवेशण, विलय और त्वरित क्रमबद्धीकरण",
    "subtopics": [
      "Bubble sort",
      "Selection sort",
      "Insertion sort",
      "Merge sort",
      "Quick sort",
      "Time complexity"
    ],
    "difficulty": "medium",
    "order": 8
  },
  {
    "name_en": "Searching Algorithms",
    "name_hi": "खोज एल्गोरिद्म",
    "chapterIndex": 3,
    "description_en": "Linear search and binary search",
    "description_hi": "रेखीय खोज और द्विआधार खोज",
    "subtopics": [
      "Linear search",
      "Binary search",
      "Time complexity analysis"
    ],
    "difficulty": "easy",
    "order": 9
  },
  {
    "name_en": "Recursion",
    "name_hi": "पुनरावृत्ति",
    "chapterIndex": 3,
    "description_en": "Recursive functions and their applications",
    "description_hi": "पुनरावृत्त फंक्शन और इनके अनुप्रयोग",
    "subtopics": [
      "Recursion basics",
      "Recursion vs iteration",
      "Tail recursion",
      "Tower of Hanoi"
    ],
    "difficulty": "medium",
    "order": 10
  },
  {
    "name_en": "Algorithm Analysis",
    "name_hi": "एल्गोरिद्म विश्लेषण",
    "chapterIndex": 4,
    "description_en": "Time and space complexity, asymptotic analysis",
    "description_hi": "समय और स्थान जटिलता, अभिसारण विश्लेषण",
    "subtopics": [
      "Time complexity",
      "Space complexity",
      "Big-O notation",
      "Best/worst/average case"
    ],
    "difficulty": "medium",
    "order": 1
  },
  {
    "name_en": "Divide and Conquer",
    "name_hi": "विभाजन और विजय",
    "chapterIndex": 4,
    "description_en": "Divide and conquer paradigm with examples",
    "description_hi": "विभाजन और विजय परणालि उदाहरणों के साथ",
    "subtopics": [
      "Merge sort",
      "Quick sort",
      "Binary search",
      "Strassen's matrix multiplication"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Greedy Algorithms",
    "name_hi": "लालची एल्गोरिद्म",
    "chapterIndex": 4,
    "description_en": "Greedy approach and its applications",
    "description_hi": "लालची दृष्टिकोण और इसके अनुप्रयोग",
    "subtopics": [
      "Activity selection",
      "Huffman coding",
      "Fractional knapsack",
      "Job scheduling"
    ],
    "difficulty": "medium",
    "order": 3
  },
  {
    "name_en": "Dynamic Programming",
    "name_hi": "गतिशील प्रोग्रामिंग",
    "chapterIndex": 4,
    "description_en": "Dynamic programming paradigm and applications",
    "description_hi": "गतिशील प्रोग्रामिंग परणालि और अनुप्रयोग",
    "subtopics": [
      "0/1 Knapsack",
      "Longest common subsequence",
      "Matrix chain multiplication",
      "Fibonacci series",
      "Memoization vs tabulation"
    ],
    "difficulty": "hard",
    "order": 4
  },
  {
    "name_en": "Graph Algorithms",
    "name_hi": "ग्राफ एल्गोरिद्म",
    "chapterIndex": 4,
    "description_en": "Shortest path, MST, and topological sorting",
    "description_hi": "सबसे रास्ता, MST और शीर्षक्रम विवरण",
    "subtopics": [
      "Dijkstra's algorithm",
      "Bellman-Ford algorithm",
      "Prim's algorithm",
      "Kruskal's algorithm",
      "Topological sort"
    ],
    "difficulty": "hard",
    "order": 5
  },
  {
    "name_en": "NP-Completeness",
    "name_hi": "NP-सम्पूर्णता",
    "chapterIndex": 4,
    "description_en": "P, NP, and NP-complete problems",
    "description_hi": "P, NP और NP-सम्पूर्विष्ट समस्याएँ",
    "subtopics": [
      "P vs NP",
      "NP-completeness",
      "Cook's theorem",
      "Reductions"
    ],
    "difficulty": "hard",
    "order": 6
  },
  {
    "name_en": "Process Management",
    "name_hi": "प्रक्रिया प्रबंधन",
    "chapterIndex": 5,
    "description_en": "Process concepts, threads, and process scheduling",
    "description_hi": "प्रक्रिया अवधारणाएँ, लंगर और प्रक्रिया शेड्यूलिंग",
    "subtopics": [
      "Process states",
      "Process control block",
      "Threads",
      "Scheduling algorithms",
      "Inter-process communication"
    ],
    "difficulty": "medium",
    "order": 1
  },
  {
    "name_en": "CPU Scheduling",
    "name_hi": "CPU शेड्यूलिंग",
    "chapterIndex": 5,
    "description_en": "Scheduling algorithms: FCFS, SJF, Round Robin, Priority",
    "description_hi": "शेड्यूलिंग एल्गोरिद्म: FCFS, SJF, राउंड रोबिन, प्राथमिकता",
    "subtopics": [
      "FCFS",
      "SJF",
      "Round Robin",
      "Priority scheduling",
      "Multilevel queues"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Deadlock",
    "name_hi": "मृत लूप",
    "chapterIndex": 5,
    "description_en": "Deadlock conditions, prevention, avoidance, and detection",
    "description_hi": "मृत लूप शर्तें, रोकथाम, सहायता और पत्ता लगाना",
    "subtopics": [
      "Deadlock conditions",
      "Prevention",
      "Avoidance",
      "Banker's algorithm",
      "Detection and recovery"
    ],
    "difficulty": "hard",
    "order": 3
  },
  {
    "name_en": "Memory Management",
    "name_hi": "मेमोरी प्रबंधन",
    "chapterIndex": 5,
    "description_en": "Paging, segmentation, virtual memory, and page replacement",
    "description_hi": "पेजिंग, सेगमेंटेशन, वर्चुअल मेमोरी और पेज प्रतिस्थापन",
    "subtopics": [
      "Contiguous allocation",
      "Paging",
      "Segmentation",
      "Virtual memory",
      "Page replacement algorithms"
    ],
    "difficulty": "hard",
    "order": 4
  },
  {
    "name_en": "File Systems",
    "name_hi": "फ़ाइल सिस्टम",
    "chapterIndex": 5,
    "description_en": "File organization, directory structures, and disk scheduling",
    "description_hi": "फ़ाइल संगठन, डायरेक्टरी संरचना और डिस्क शेड्यूलिंग",
    "subtopics": [
      "File organization",
      "Directory structure",
      "Disk scheduling algorithms",
      "Free space management"
    ],
    "difficulty": "medium",
    "order": 5
  },
  {
    "name_en": "System Security",
    "name_hi": "सिस्टम सुरक्षा",
    "chapterIndex": 5,
    "description_en": "Security threats, authentication, and protection mechanisms",
    "description_hi": "सुरक्षा खतरे, प्रमाणीकरण और सुरक्षा तंत्र",
    "subtopics": [
      "Security threats",
      "Authentication",
      "Protection mechanisms",
      "Access control"
    ],
    "difficulty": "medium",
    "order": 6
  },
  {
    "name_en": "DBMS Architecture",
    "name_hi": "DBMS वास्तुकला",
    "chapterIndex": 6,
    "description_en": "Three-schema architecture and data models",
    "description_hi": "तीन-स्कीमा वास्तुकला और डेटा मॉडल",
    "subtopics": [
      "Three-schema architecture",
      "Data models",
      "Data independence",
      "DBMS components"
    ],
    "difficulty": "medium",
    "order": 1
  },
  {
    "name_en": "ER Model",
    "name_hi": "ER मॉडल",
    "chapterIndex": 6,
    "description_en": "Entity-Relationship modeling, attributes, and relationships",
    "description_hi": "इंटिटी-संबंध मॉडलिंग, गुणता और संबंध",
    "subtopics": [
      "Entities and attributes",
      "Relationships",
      "ER diagram",
      "Extended ER features"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Relational Model",
    "name_hi": "संबंधपरक मॉडल",
    "chapterIndex": 6,
    "description_en": "Relational algebra, calculus, and SQL basics",
    "description_hi": "संबंधपरक बीजगणित, कैल्कुलस और SQL बुनियादी",
    "subtopics": [
      "Relational algebra",
      "Relational calculus",
      "SQL basics",
      "Select, project, join"
    ],
    "difficulty": "medium",
    "order": 3
  },
  {
    "name_en": "Normalization",
    "name_hi": "सामान्यीकरण",
    "chapterIndex": 6,
    "description_en": "Normalization techniques: 1NF to BCNF",
    "description_hi": "सामान्यीकरण तकनीकें: 1NF से BCNF",
    "subtopics": [
      "1NF",
      "2NF",
      "3NF",
      "BCNF",
      "Functional dependencies"
    ],
    "difficulty": "hard",
    "order": 4
  },
  {
    "name_en": "Transaction Management",
    "name_hi": "लेनदेन प्रबंधन",
    "chapterIndex": 6,
    "description_en": "ACID properties, concurrency control, recovery",
    "description_hi": "ACID गुणता, समांतरता नियंत्रण, पुनरावस्थान",
    "subtopics": [
      "ACID properties",
      "Serializability",
      "Concurrency control",
      "Recovery techniques"
    ],
    "difficulty": "hard",
    "order": 5
  },
  {
    "name_en": "SQL Queries",
    "name_hi": "SQL क्वेरी",
    "chapterIndex": 6,
    "description_en": "Advanced SQL: joins, subqueries, views, indexes",
    "description_hi": "अधिक SQL: जोइन, सबक्वेरी, व्यू, इंडेक्स",
    "subtopics": [
      "Joins",
      "Subqueries",
      "Views",
      "Indexes",
      "Aggregate functions"
    ],
    "difficulty": "medium",
    "order": 6
  },
  {
    "name_en": "OSI Model",
    "name_hi": "OSI मॉडल",
    "chapterIndex": 7,
    "description_en": "Seven layers of OSI model and their functions",
    "description_hi": "OSI मॉडल की सात परतें और इनकी फंक्शन",
    "subtopics": [
      "Physical layer",
      "Data link layer",
      "Network layer",
      "Transport layer",
      "Session layer",
      "Presentation layer",
      "Application layer"
    ],
    "difficulty": "medium",
    "order": 1
  },
  {
    "name_en": "TCP/IP Model",
    "name_hi": "TCP/IP मॉडल",
    "chapterIndex": 7,
    "description_en": "TCP/IP protocol suite and layers",
    "description_hi": "TCP/IP प्रोटोकॉल सूट और परतें",
    "subtopics": [
      "Internet layer",
      "Transport layer",
      "Application layer",
      "Comparison with OSI"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Network Topologies",
    "name_hi": "नेटवर्क टोपोलॉजी",
    "chapterIndex": 7,
    "description_en": "Star, bus, ring, mesh topologies",
    "description_hi": "स्टार, बस, रिंग, मेश टोपोलॉजी",
    "subtopics": [
      "Star topology",
      "Bus topology",
      "Ring topology",
      "Mesh topology",
      "Advantages and disadvantages"
    ],
    "difficulty": "easy",
    "order": 3
  },
  {
    "name_en": "IP Addressing",
    "name_hi": "IP एड्रेसिंग",
    "chapterIndex": 7,
    "description_en": "IPv4, IPv6 addressing, subnetting, CIDR",
    "description_hi": "IPv4, IPv6 एड्रेसिंग, सबनेटिंग, CIDR",
    "subtopics": [
      "IPv4 addressing",
      "IPv6 addressing",
      "Subnetting",
      "CIDR",
      "NAT"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "Routing Algorithms",
    "name_hi": "रूटिंग एल्गोरिद्म",
    "chapterIndex": 7,
    "description_en": "Distance vector and link state routing",
    "description_hi": "दूरी वेक्टर और लिंक स्थिति रूटिंग",
    "subtopics": [
      "Distance vector",
      "Link state",
      "RIP",
      "OSPF",
      "BGP"
    ],
    "difficulty": "hard",
    "order": 5
  },
  {
    "name_en": "Application Layer Protocols",
    "name_hi": "एप्लिकेशन लेयर प्रोटोकॉल",
    "chapterIndex": 7,
    "description_en": "HTTP, FTP, SMTP, DNS, DHCP protocols",
    "description_hi": "HTTP, FTP, SMTP, DNS, DHCP प्रोटोकॉल",
    "subtopics": [
      "HTTP",
      "FTP",
      "SMTP",
      "DNS",
      "DHCP"
    ],
    "difficulty": "medium",
    "order": 6
  },
  {
    "name_en": "Data Link Layer",
    "name_hi": "डेटा लिंक लेयर",
    "chapterIndex": 7,
    "description_en": "MAC addressing, error control, flow control",
    "description_hi": "MAC एड्रेसिंग, त्रुटि नियंत्रण, प्रवाह नियंत्रण",
    "subtopics": [
      "MAC addressing",
      "Ethernet",
      "Error detection",
      "Flow control",
      "Switching"
    ],
    "difficulty": "medium",
    "order": 7
  },
  {
    "name_en": "SDLC Models",
    "name_hi": "SDLC मॉडल",
    "chapterIndex": 8,
    "description_en": "Waterfall, Agile, Spiral, and V-model",
    "description_hi": "वाटरफॉल, एजाइल, स्पाइरल और V-मॉडल",
    "subtopics": [
      "Waterfall model",
      "Agile methodology",
      "Spiral model",
      "V-model",
      "RAD"
    ],
    "difficulty": "medium",
    "order": 1
  },
  {
    "name_en": "Software Testing",
    "name_hi": "सॉफ्टवेयर परीक्षण",
    "chapterIndex": 8,
    "description_en": "Testing strategies, black-box, white-box testing",
    "description_hi": "परीक्षण रणनीतियाँ, ब्लैक-बॉक्स, व्हाइट-बॉक्स परीक्षण",
    "subtopics": [
      "Unit testing",
      "Integration testing",
      "System testing",
      "Black-box testing",
      "White-box testing"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "SRS Documentation",
    "name_hi": "SRS दस्तावेज़ीकरण",
    "chapterIndex": 8,
    "description_en": "Software Requirement Specification document structure",
    "description_hi": "सॉफ्टवेयर आवश्यकता विनिर्देश दस्तावेज़ संरचना",
    "subtopics": [
      "Functional requirements",
      "Non-functional requirements",
      "SRS format",
      "User interface specification"
    ],
    "difficulty": "easy",
    "order": 3
  },
  {
    "name_en": "Software Design",
    "name_hi": "सॉफ्टवेयर डिज़ाइन",
    "chapterIndex": 8,
    "description_en": "Software design principles, coupling, and cohesion",
    "description_hi": "सॉफ्टवेयर डिज़ाइन सिद्धांत, कपलिंग और कोहेशन",
    "subtopics": [
      "Design principles",
      "Coupling and cohesion",
      "Modular design",
      "Design patterns"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "Project Management",
    "name_hi": "परियोजना प्रबंधन",
    "chapterIndex": 8,
    "description_en": "Project planning, scheduling, risk management",
    "description_hi": "परियोजना योजना, शेड्यूलिंग, जोखिम प्रबंधन",
    "subtopics": [
      "Project planning",
      "Gantt charts",
      "PERT/CPM",
      "Risk management"
    ],
    "difficulty": "medium",
    "order": 5
  },
  {
    "name_en": "Classes and Objects",
    "name_hi": "कक्षाएँ और ऑब्जेक्ट",
    "chapterIndex": 9,
    "description_en": "Class definition, objects, constructors, and destructors",
    "description_hi": "कक्षा परिभाषा, ऑब्जेक्ट, कंस्ट्रक्टर और डिस्ट्रक्टर",
    "subtopics": [
      "Class definition",
      "Objects",
      "Constructors",
      "Destructors",
      "Access specifiers"
    ],
    "difficulty": "easy",
    "order": 1
  },
  {
    "name_en": "Inheritance",
    "name_hi": "विरासत",
    "chapterIndex": 9,
    "description_en": "Single, multiple, multilevel, hierarchical inheritance",
    "description_hi": "एकल, बहु, बहु-स्तरीय, श्रेणीबद्ध विरासत",
    "subtopics": [
      "Single inheritance",
      "Multiple inheritance",
      "Multilevel inheritance",
      "Hierarchical inheritance",
      "Hybrid inheritance"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Polymorphism",
    "name_hi": "बहुरूपता",
    "chapterIndex": 9,
    "description_en": "Function overloading, operator overloading, virtual functions",
    "description_hi": "फंक्शन ओवरलोडिंग, ऑपरेटर ओवरलोडिंग, वर्चुअल फंक्शन",
    "subtopics": [
      "Function overloading",
      "Operator overloading",
      "Virtual functions",
      "Runtime polymorphism"
    ],
    "difficulty": "hard",
    "order": 3
  },
  {
    "name_en": "Encapsulation and Abstraction",
    "name_hi": "संलग्नता और अभिकल्पना",
    "chapterIndex": 9,
    "description_en": "Data hiding, interfaces, and abstract classes",
    "description_hi": "डेटा छुपाना, इंटरफेस और अमूर्त कक्षाएँ",
    "subtopics": [
      "Data hiding",
      "Access modifiers",
      "Abstract classes",
      "Interfaces"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "Exception Handling",
    "name_hi": "अपवाद हैंडलिंग",
    "chapterIndex": 9,
    "description_en": "Try-catch, throw, and exception hierarchies",
    "description_hi": "ट्राई-कैच, थ्रो और अपवाद पदानुक्रम",
    "subtopics": [
      "Try-catch blocks",
      "Throw keyword",
      "Multiple catch",
      "Exception hierarchy",
      "Custom exceptions"
    ],
    "difficulty": "medium",
    "order": 5
  },
  {
    "name_en": "File Handling in OOP",
    "name_hi": "OOP में फ़ाइल हैंडलिंग",
    "chapterIndex": 9,
    "description_en": "File streams, reading, writing files in OOP",
    "description_hi": "फ़ाइल स्ट्रीम, पढ़ना, OOP में फ़ाइल लिखना",
    "subtopics": [
      "File streams",
      "Sequential files",
      "Random access files",
      "File operations"
    ],
    "difficulty": "medium",
    "order": 6
  },
  {
    "name_en": "HTML Basics",
    "name_hi": "HTML बुनियादी",
    "chapterIndex": 10,
    "description_en": "HTML tags, forms, tables, and page structure",
    "description_hi": "HTML टैग, फॉर्म, टेबल और पेज संरचना",
    "subtopics": [
      "HTML elements",
      "Forms and input",
      "Tables",
      "Page structure",
      "Semantic HTML"
    ],
    "difficulty": "easy",
    "order": 1
  },
  {
    "name_en": "CSS",
    "name_hi": "CSS",
    "chapterIndex": 10,
    "description_en": "CSS styling, selectors, box model, and layouts",
    "description_hi": "CSS स्टाइलिंग, सेलेक्टर, बॉक्स मॉडल और लेआउट",
    "subtopics": [
      "CSS selectors",
      "Box model",
      "Flexbox",
      "Grid",
      "Responsive design"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "JavaScript",
    "name_hi": "JavaScript",
    "chapterIndex": 10,
    "description_en": "JavaScript fundamentals, DOM manipulation, events",
    "description_hi": "JavaScript बुनियादी, DOM हेरफेर, इवेंट",
    "subtopics": [
      "Variables and data types",
      "Functions",
      "DOM manipulation",
      "Events",
      "AJAX"
    ],
    "difficulty": "medium",
    "order": 3
  },
  {
    "name_en": "Server-Side Scripting",
    "name_hi": "सर्वर-साइड स्क्रिप्टिंग",
    "chapterIndex": 10,
    "description_en": "PHP and Node.js server-side development",
    "description_hi": "PHP और Node.js सर्वर-साइड विकास",
    "subtopics": [
      "PHP basics",
      "Node.js basics",
      "Request/Response cycle",
      "Session management"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "XML and JSON",
    "name_hi": "XML और JSON",
    "chapterIndex": 10,
    "description_en": "XML parsing, JSON data format, and web data exchange",
    "description_hi": "XML पार्सिंग, JSON डेटा फॉर्मेट और वेब डेटा एक्सचेंज",
    "subtopics": [
      "XML structure",
      "JSON format",
      "Data serialization",
      "API data formats"
    ],
    "difficulty": "easy",
    "order": 5
  },
  {
    "name_en": "Finite Automata",
    "name_hi": "परिमित ऑटोमेटा",
    "chapterIndex": 11,
    "description_en": "DFA, NFA, and equivalence of DFA and NFA",
    "description_hi": "DFA, NFA और DFA और NFA की समानता",
    "subtopics": [
      "Deterministic FA",
      "Non-deterministic FA",
      "DFA to NFA conversion",
      "NFA to DFA conversion"
    ],
    "difficulty": "medium",
    "order": 1
  },
  {
    "name_en": "Regular Expressions",
    "name_hi": "नियमित व्यंजक",
    "chapterIndex": 11,
    "description_en": "Regular expressions, their syntax, and conversion to automata",
    "description_hi": "नियमित व्यंजक, उनकी वाक्यविन्यास और ऑटोमेटा में रूपांतरण",
    "subtopics": [
      "Regular expression syntax",
      "RE to DFA",
      "DFA to RE",
      "Properties of regular languages"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Context-Free Grammars",
    "name_hi": "संदर्भ-मुक्त व्याकरण",
    "chapterIndex": 11,
    "description_en": "CFG, parse trees, ambiguity, and simplification",
    "description_hi": "CFG, पार्स ट्री, अस्पष्टता और सरलीकरण",
    "subtopics": [
      "CFG definitions",
      "Parse trees",
      "Ambiguity",
      "Chomsky normal form",
      "Greibach normal form"
    ],
    "difficulty": "hard",
    "order": 3
  },
  {
    "name_en": "Pushdown Automata",
    "name_hi": "पुशडाउन ऑटोमेटा",
    "chapterIndex": 11,
    "description_en": "PDA definitions, operations, and equivalence with CFG",
    "description_hi": "PDA परिभाषाएँ, संचालन और CFG के साथ समानता",
    "subtopics": [
      "PDA definition",
      "PDA operations",
      "PDA and CFL equivalence",
      "Deterministic PDA"
    ],
    "difficulty": "hard",
    "order": 4
  },
  {
    "name_en": "Turing Machines",
    "name_hi": "ट्यूरिंग मशीन",
    "chapterIndex": 11,
    "description_en": "TM definitions, variants, and halting problem",
    "description_hi": "TM परिभाषाएँ, भिन्नताएँ और हाल्टिंग समस्या",
    "subtopics": [
      "TM definition",
      "Variants of TM",
      "Halting problem",
      "Recursive and recursively enumerable languages"
    ],
    "difficulty": "hard",
    "order": 5
  },
  {
    "name_en": "IoT Architecture",
    "name_hi": "IoT वास्तुकला",
    "chapterIndex": 12,
    "description_en": "IoT layers, components, and system architecture",
    "description_hi": "IoT परतें, घटक और सिस्टम वास्तुकला",
    "subtopics": [
      "IoT layers",
      "Sensing layer",
      "Network layer",
      "Application layer",
      "IoT gateway"
    ],
    "difficulty": "medium",
    "order": 1
  },
  {
    "name_en": "Communication Protocols",
    "name_hi": "संचार प्रोटोकॉल",
    "chapterIndex": 12,
    "description_en": "MQTT, CoAP, Zigbee, Bluetooth, and WiFi protocols",
    "description_hi": "MQTT, CoAP, Zigbee, Bluetooth और WiFi प्रोटोकॉल",
    "subtopics": [
      "MQTT",
      "CoAP",
      "Zigbee",
      "Bluetooth",
      "WiFi"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Cloud Computing Integration",
    "name_hi": "क्लाउड कंप्यूटिंग एकीकरण",
    "chapterIndex": 12,
    "description_en": "Cloud platforms for IoT data processing and storage",
    "description_hi": "IoT डेटा प्रसंस्करण और भंडारण के लिए क्लाउड प्लेटफॉर्म",
    "subtopics": [
      "Cloud platforms",
      "Data processing",
      "Edge computing",
      "Fog computing"
    ],
    "difficulty": "medium",
    "order": 3
  },
  {
    "name_en": "Industrial IoT",
    "name_hi": "औद्योगिक IoT",
    "chapterIndex": 12,
    "description_en": "IIoT applications, smart manufacturing, and automation",
    "description_hi": "IIoT अनुप्रयोग, स्मार्ट विनिर्माण और स्वचालन",
    "subtopics": [
      "Smart manufacturing",
      "Predictive maintenance",
      "SCADA systems",
      "Industrial automation"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "IoT Security",
    "name_hi": "IoT सुरक्षा",
    "chapterIndex": 12,
    "description_en": "Security challenges, encryption, and privacy in IoT",
    "description_hi": "सुरक्षा चुनौतियाँ, एन्क्रिप्शन और IoT में गोपनीयता",
    "subtopics": [
      "Security challenges",
      "Encryption methods",
      "Authentication",
      "Privacy concerns"
    ],
    "difficulty": "hard",
    "order": 5
  },
  {
    "name_en": "Search Strategies",
    "name_hi": "खोज रणनीतियाँ",
    "chapterIndex": 13,
    "description_en": "BFS, DFS, heuristic search, A* algorithm",
    "description_hi": "BFS, DFS, ह्यूरिस्टिक खोज, A* एल्गोरिद्म",
    "subtopics": [
      "BFS",
      "DFS",
      "Heuristic search",
      "A* algorithm",
      "Best-first search"
    ],
    "difficulty": "medium",
    "order": 1
  },
  {
    "name_en": "Knowledge Representation",
    "name_hi": "ज्ञान प्रतिनिधि",
    "chapterIndex": 13,
    "description_en": "Semantic networks, frames, logic-based representation",
    "description_hi": "सिमांटिक नेटवर्क, फ्रेम, लॉजिक-आधारित प्रतिनिधि",
    "subtopics": [
      "Semantic networks",
      "Frames",
      "Propositional logic",
      "First-order logic",
      "Ontologies"
    ],
    "difficulty": "hard",
    "order": 2
  },
  {
    "name_en": "Machine Learning Basics",
    "name_hi": "मशीन लर्निंग की बुनियादीएँ",
    "chapterIndex": 13,
    "description_en": "Supervised, unsupervised, reinforcement learning",
    "description_hi": "पर्यवेक्षित, अपर्यवेक्षित, सुदृढीकरण सीखना",
    "subtopics": [
      "Supervised learning",
      "Unsupervised learning",
      "Reinforcement learning",
      "Classification",
      "Regression"
    ],
    "difficulty": "medium",
    "order": 3
  },
  {
    "name_en": "Expert Systems",
    "name_hi": "विशेषज्ञ प्रणाली",
    "chapterIndex": 13,
    "description_en": "Knowledge base, inference engine, and rule-based systems",
    "description_hi": "ज्ञान आधार, अनुमान इंजन और नियम-आधारित प्रणाली",
    "subtopics": [
      "Knowledge base",
      "Inference engine",
      "Rule-based systems",
      "Applications"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "AI Planning",
    "name_hi": "AI योजना",
    "chapterIndex": 13,
    "description_en": "Planning methods, STRIPS, and goal-based planning",
    "description_hi": "योजना विधियाँ, STRIPS और लक्ष्य-आधारित योजना",
    "subtopics": [
      "Planning methods",
      "STRIPS",
      "Goal-based planning",
      "Search-based planning"
    ],
    "difficulty": "hard",
    "order": 5
  },
  {
    "name_en": "E-Commerce Framework",
    "name_hi": "ई-कॉमर्स फ्रेमवर्क",
    "chapterIndex": 14,
    "description_en": "E-Commerce models, B2B, B2C, C2C frameworks",
    "description_hi": "ई-कॉमर्स मॉडल, B2B, B2C, C2C फ्रेमवर्क",
    "subtopics": [
      "B2B model",
      "B2C model",
      "C2C model",
      "E-Commerce architecture"
    ],
    "difficulty": "easy",
    "order": 1
  },
  {
    "name_en": "Digital Payment Systems",
    "name_hi": "डिजिटल भुगतान प्रणाली",
    "chapterIndex": 14,
    "description_en": "Payment gateways, digital wallets, net banking",
    "description_hi": "भुगतान गेटवे, डिजिटल वॉलेट, नेट बैंकिंग",
    "subtopics": [
      "Payment gateways",
      "Digital wallets",
      "Net banking",
      "UPI",
      "Cryptocurrency basics"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Security Mechanisms",
    "name_hi": "सुरक्षा तंत्र",
    "chapterIndex": 14,
    "description_en": "SSL, encryption, firewalls, and digital certificates",
    "description_hi": "SSL, एन्क्रिप्शन, फ़ायरवॉल और डिजिटल प्रमाणपत्र",
    "subtopics": [
      "SSL/TLS",
      "Encryption methods",
      "Firewalls",
      "Digital certificates",
      "Digital signatures"
    ],
    "difficulty": "medium",
    "order": 3
  },
  {
    "name_en": "EDI Standards",
    "name_hi": "EDI मानक",
    "chapterIndex": 14,
    "description_en": "Electronic Data Interchange standards and protocols",
    "description_hi": "इलेक्ट्रॉनिक डेटा इंटरचेंज मानक और प्रोटोकॉल",
    "subtopics": [
      "EDI standards",
      "ANSI X12",
      "EDIFACT",
      "EDI implementation"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "Digital Library Systems",
    "name_hi": "डिजिटल पुस्तकालय प्रणाली",
    "chapterIndex": 14,
    "description_en": "Digital library concepts, metadata, and retrieval",
    "description_hi": "डिजिटल पुस्तकालय अवधारणाएँ, मेटाडेटा और पुनर्प्राप्ति",
    "subtopics": [
      "Digital library concepts",
      "Metadata standards",
      "Information retrieval",
      "Digital preservation"
    ],
    "difficulty": "easy",
    "order": 5
  },
  {
    "name_en": "Audio Processing",
    "name_hi": "ऑडियो प्रसंस्करण",
    "chapterIndex": 15,
    "description_en": "Audio formats, sampling, quantization, and compression",
    "description_hi": "ऑडियो फॉर्मेट, सैंपलिंग, क्वांटाइजेशन और संपीड़न",
    "subtopics": [
      "Audio formats",
      "Sampling rate",
      "Quantization",
      "Audio compression",
      "MIDI"
    ],
    "difficulty": "medium",
    "order": 1
  },
  {
    "name_en": "Graphics and Image Formats",
    "name_hi": "ग्राफिक्स और छवि फॉर्मेट",
    "chapterIndex": 15,
    "description_en": "Vector vs raster graphics, image formats, color models",
    "description_hi": "वेक्टर बनाम रास्टर ग्राफिक्स, छवि फॉर्मेट, रंग मॉडल",
    "subtopics": [
      "Vector graphics",
      "Raster graphics",
      "Image formats",
      "Color models",
      "Resolution"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Animation Techniques",
    "name_hi": "एनिमेशन तकनीकें",
    "chapterIndex": 15,
    "description_en": "2D and 3D animation principles, keyframing",
    "description_hi": "2D और 3D एनिमेशन सिद्धांत, कीफ्रेमिंग",
    "subtopics": [
      "2D animation",
      "3D animation",
      "Keyframing",
      "Tweening",
      "Animation principles"
    ],
    "difficulty": "medium",
    "order": 3
  },
  {
    "name_en": "Video Compression",
    "name_hi": "वीडियो संपीड़न",
    "chapterIndex": 15,
    "description_en": "Video codecs, MPEG standards, streaming",
    "description_hi": "वीडियो कोडेक, MPEG मानक, स्ट्रीमिंग",
    "subtopics": [
      "Video codecs",
      "MPEG standards",
      "H.264/H.265",
      "Streaming protocols"
    ],
    "difficulty": "hard",
    "order": 4
  },
  {
    "name_en": "Multimedia Project Design",
    "name_hi": "मल्टीमीडिया परियोजना डिज़ाइन",
    "chapterIndex": 15,
    "description_en": "Multimedia project lifecycle, tools, and design principles",
    "description_hi": "मल्टीमीडिया परियोजना जीवनचक्र, उपकरण और डिज़ाइन सिद्धांत",
    "subtopics": [
      "Project lifecycle",
      "Multimedia tools",
      "Design principles",
      "Authoring systems"
    ],
    "difficulty": "easy",
    "order": 5
  },
  {
    "name_en": "Teaching Methods",
    "name_hi": "शिक्षण विधियाँ",
    "chapterIndex": 16,
    "description_en": "Lecture, discussion, demonstration, and project methods",
    "description_hi": "व्याख्यान, चर्चा, प्रदर्शन और परियोजना विधि",
    "subtopics": [
      "Lecture method",
      "Discussion method",
      "Demonstration method",
      "Project method",
      "Question-answer method"
    ],
    "difficulty": "easy",
    "order": 1
  },
  {
    "name_en": "Bloom's Taxonomy",
    "name_hi": "ब्लूम का वर्गीकरण",
    "chapterIndex": 16,
    "description_en": "Cognitive, affective, and psychomotor domains",
    "description_hi": "संज्ञानात्मक, भावनात्मक और मनोगत क्षेत्र",
    "subtopics": [
      "Cognitive domain",
      "Affective domain",
      "Psychomotor domain",
      "Learning objectives",
      "Knowledge levels"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Lesson Planning",
    "name_hi": "पाठ योजना",
    "chapterIndex": 16,
    "description_en": "Lesson plan components, objectives, and evaluation",
    "description_hi": "पाठ योजना घटक, उद्देश्य और मूल्यांकन",
    "subtopics": [
      "Lesson plan format",
      "Objectives",
      "Content organization",
      "Teaching aids",
      "Evaluation methods"
    ],
    "difficulty": "easy",
    "order": 3
  },
  {
    "name_en": "Microteaching",
    "name_hi": "सूक्ष्मशिक्षण",
    "chapterIndex": 16,
    "description_en": "Microteaching techniques, skills, and practice",
    "description_hi": "सूक्ष्मशिक्षण तकनीकें, कौशल और अभ्यास",
    "subtopics": [
      "Microteaching cycle",
      "Teaching skills",
      "Feedback",
      "Practice sessions",
      "Skill components"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "Classroom Management",
    "name_hi": "कक्षा प्रबंधन",
    "chapterIndex": 16,
    "description_en": "Classroom environment, discipline, and motivation",
    "description_hi": "कक्षा वातावरण, अनुशासन और प्रेरणा",
    "subtopics": [
      "Classroom environment",
      "Discipline strategies",
      "Student motivation",
      "Group management",
      "Time management"
    ],
    "difficulty": "medium",
    "order": 5
  },
  {
    "name_en": "Evaluation Methods",
    "name_hi": "मूल्यांकन विधियाँ",
    "chapterIndex": 16,
    "description_en": "Formative and summative evaluation, assessment tools",
    "description_hi": "सार्थक और समग्र मूल्यांकन, आकलन उपकरण",
    "subtopics": [
      "Formative evaluation",
      "Summative evaluation",
      "Assessment tools",
      "Question paper design",
      "Grading methods"
    ],
    "difficulty": "medium",
    "order": 6
  },
  {
    "name_en": "Curriculum Development",
    "name_hi": "पाठ्यक्रम विकास",
    "chapterIndex": 16,
    "description_en": "Curriculum design, implementation, and revision",
    "description_hi": "पाठ्यक्रम डिज़ाइन, कार्यान्वयन और संशोधन",
    "subtopics": [
      "Curriculum design",
      "Implementation strategies",
      "Evaluation",
      "Revision processes",
      "NCF guidelines"
    ],
    "difficulty": "hard",
    "order": 7
  },
  {
    "name_en": "Current Affairs",
    "name_hi": "समसामयिकी",
    "chapterIndex": 17,
    "description_en": "National and international current events, government schemes",
    "description_hi": "राष्ट्रीय और अंतर्राष्ट्रीय समसामयिक घटनाएँ, सरकारी योजनाएँ",
    "subtopics": [
      "National events",
      "International events",
      "Government schemes",
      "Awards and honors",
      "Sports"
    ],
    "difficulty": "easy",
    "order": 1
  },
  {
    "name_en": "Environmental Science",
    "name_hi": "पर्यावरण विज्ञान",
    "chapterIndex": 17,
    "description_en": "Ecosystems, biodiversity, pollution, and environmental issues",
    "description_hi": "पारिस्थितिकी तंत्र, जैव विविधता, प्रदूषण और पर्यावरणीय मुद्दे",
    "subtopics": [
      "Ecosystems",
      "Biodiversity",
      "Pollution types",
      "Climate change",
      "Environmental policies"
    ],
    "difficulty": "medium",
    "order": 2
  },
  {
    "name_en": "Mathematical Aptitude",
    "name_hi": "गणितीय योग्यता",
    "chapterIndex": 17,
    "description_en": "Quantitative aptitude, ratios, percentages, profit and loss",
    "description_hi": "मात्रात्मक योग्यता, अनुपात, प्रतिशतता, लाभ और हानि",
    "subtopics": [
      "Number system",
      "Percentages",
      "Ratio and proportion",
      "Profit and loss",
      "Simple and compound interest",
      "Time and work"
    ],
    "difficulty": "medium",
    "order": 3
  },
  {
    "name_en": "Logical Reasoning",
    "name_hi": "तार्किक तर्कशक्ति",
    "chapterIndex": 17,
    "description_en": "Syllogisms, blood relations, coding-decoding, series",
    "description_hi": "न्यायवाक्य, रक्त संबंध, कोडिंग-डीकोडिंग, श्रृंखला",
    "subtopics": [
      "Syllogisms",
      "Blood relations",
      "Coding-decoding",
      "Number series",
      "Direction sense",
      "Seating arrangement"
    ],
    "difficulty": "medium",
    "order": 4
  },
  {
    "name_en": "Analytical Ability",
    "name_hi": "विश्लेषणात्मक क्षमता",
    "chapterIndex": 17,
    "description_en": "Data interpretation, puzzles, and logical puzzles",
    "description_hi": "डेटा व्याख्या, पहेलियाँ और तार्किक पहेलियाँ",
    "subtopics": [
      "Data interpretation",
      "Puzzles",
      "Cubes and dice",
      "Venn diagrams",
      "Statement and conclusions"
    ],
    "difficulty": "hard",
    "order": 5
  }
];

module.exports = { chapters, topics };
