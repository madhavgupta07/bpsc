export default {
  num: 6,
  title: ['Database Management System', 'डेटाबेस प्रबंधन प्रणाली'],
  intro: [
    'Organising, storing and retrieving data reliably — ER models, SQL, normalization, transactions.',
    'डेटा का विश्वसनीय भंडारण व पुनर्प्राप्ति — ER मॉडल, SQL, नॉर्मलाइज़ेशन, लेन-देन।',
  ],
  sections: [
    {
      id: 'intro-dbms',
      title: ['DBMS & Three-Schema Architecture', 'DBMS एवं त्रि-स्कीमा संरचना'],
      blocks: [
        ['p',
          'DBMS = software to create, store, manage and query databases (Oracle, MySQL). Advantages: no redundancy, data integrity, security, concurrent access.',
          'DBMS = डेटाबेस बनाने-प्रबंधित करने का software (Oracle, MySQL)। लाभ: redundancy नहीं, integrity, सुरक्षा, concurrent access।'],
        ['diagram', 'three-schema', 'ANSI/SPARC three-level architecture provides data independence', 'ANSI/SPARC त्रि-स्तरीय संरचना data independence देती है'],
      ],
    },
    {
      id: 'keys',
      title: ['Keys in a Relation', 'संबंध में Keys'],
      blocks: [
        ['table',
          [['Key', 'Key'], ['Definition', 'परिभाषा'], ['Example (Student)', 'उदाहरण']],
          [
            [['Super key', 'Super key'], ['Any attribute set that uniquely identifies rows', 'पंक्ति पहचानने वाला कोई भी गुण-समूह'], ['{Roll}, {Roll, Name}']],
            [['Candidate key', 'Candidate key'], ['Minimal super key', 'न्यूनतम super key'], ['{Roll}, {Aadhaar}']],
            [['Primary key', 'Primary key'], ['Chosen candidate key; NOT NULL + UNIQUE', 'चुना हुआ candidate key; NULL नहीं'], ['Roll']],
            [['Alternate key', 'Alternate key'], ['Candidate keys not chosen', 'बाकी candidate keys'], ['Aadhaar']],
            [['Foreign key', 'Foreign key'], ['References PK of another table', 'दूसरी table के PK का संदर्भ'], ['DeptNo → Department']],
            [['Composite key', 'Composite key'], ['Key made of 2+ attributes', '2+ गुणों से बनी key'], ['{CourseID, StudentID}', '{CourseID, StudentID}']],
          ]],
      ],
    },
    {
      id: 'er-model',
      title: ['Entity-Relationship (ER) Model & Relational Algebra', 'एंटिटी-रिलेशनशिप (ER) मॉडल एवं रिलेशनल अलजेब्रा'],
      blocks: [
        ['ul', [
          ['ER symbols: Rectangle = entity · Ellipse = attribute · Diamond = relationship · Double ellipse = multivalued.', 'ER चिह्न: आयत = entity · दीर्घवृत्त = attribute · समचतुर्भुज = relationship।'],
          ['Cardinality: 1:1, 1:N, N:M — e.g. one department has many students.', 'कार्डिनैलिटी: 1:1, 1:N, N:M — जैसे एक department में अनेक student।']],
        ],
        ['table',
          [['Algebra op', 'ऑपरेशन'], ['Symbol', 'चिह्न'], ['Does', 'काम']],
          [
            [['Selection (σ)', 'Selection σ'], ['σ cond(R)', 'σ cond(R)'], ['Picks ROWS matching condition', 'शर्त से पंक्तियाँ']],
            [['Projection (π)', 'Projection π'], ['π cols(R)', 'π cols(R)'], ['Picks COLUMNS, removes duplicates', 'स्तंभ चुनता है']],
            [['Union / Intersection', 'Union/Intersection'], ['∪ / ∩', '∪ / ∩'], ['Combines/common rows of compatible relations', 'समान schema की relations']],
            [['Cartesian product', 'Cartesian product'], ['R × S', 'R × S'], ['All row pairs', 'सभी पंक्ति-जोड़े']],
            [['Join (⋈)', 'Join ⋈'], ['R ⋈ S', 'R ⋈ S'], ['Cartesian + selection on common column', 'साझा column पर मेल']],
          ]],
        ['pyq', {
          q: 'Which is NOT a valid relational operation?',
          opts: ['CARTESIAN PRODUCT', 'INTERSECTION', 'UNION', 'DELETE'],
          ans: 3,
          ex: ['DELETE is an SQL/DML command, not a relational algebra operation. Algebra ops are σ, π, ∪, ∩, ×, ⋈, −.',
               'DELETE एक SQL (DML) कमांड है, relational algebra ऑपरेशन नहीं। Algebra ops: σ, π, ∪, ∩, ×, ⋈, −।'],
          src: 'UP Computer Operator · PYQ compilation',
        }],
      ],
    },
    {
      id: 'sql',
      title: ['SQL Command Families', 'SQL कमांड परिवार'],
      blocks: [
        ['table',
          [['Family', 'वर्ग'], ['Full form', 'पूरा नाम'], ['Commands', 'कमांड']],
          [
            [['DDL', 'DDL'], ['Data Definition', 'Data Definition'], ['CREATE, ALTER, DROP, TRUNCATE']],
            [['DML', 'DML'], ['Data Manipulation', 'Data Manipulation'], ['INSERT, UPDATE, DELETE']],
            [['DQL', 'DQL'], ['Data Query', 'Data Query'], ['SELECT']],
            [['DCL', 'DCL'], ['Data Control', 'Data Control'], ['GRANT, REVOKE']],
            [['TCL', 'TCL'], ['Transaction Control', 'Transaction Control'], ['COMMIT, ROLLBACK, SAVEPOINT']],
          ]],
        ['code',
          "CREATE TABLE Student (\n  roll INT PRIMARY KEY,\n  name VARCHAR(50) NOT NULL,\n  dept VARCHAR(20)\n);\n\nSELECT name FROM Student WHERE dept='CS' ORDER BY name;",
          'SQL (Structured Query Language): basic DDL + DQL', 'SQL (स्ट्रक्चर्ड क्वेरी भाषा): मूल DDL + DQL'],
        ['pyq', {
          q: 'Which one is a DCL command in SQL?',
          opts: ['UPDATE', 'SELECT', 'DELETE', 'GRANT'],
          ans: 3,
          ex: ['DCL = Data Control Language → GRANT and REVOKE manage access rights.',
               'DCL = Data Control Language → GRANT और REVOKE अधिकार देते/छीनते हैं।'],
          src: 'Bihar STET C.S. · 2019 (Shift-II)',
        }],
      ],
    },
    {
      id: 'normalization',
      title: ['Normalization (1NF → BCNF)', 'नॉर्मलाइज़ेशन'],
      blocks: [
        ['table',
          [['Form', 'रूप'], ['Rule', 'नियम'], ['Removes', 'हटाता है']],
          [
            [['1NF · First Normal Form', '1NF · प्रथम सामान्य रूप'], ['Atomic values only (no repeating groups)', 'परमाण्विक मानें'], ['Multivalued cells']],
            [['2NF · Second Normal Form', '2NF · द्वितीय सामान्य रूप'], ['1NF + no partial dependency (non-key depends on FULL key)', 'आंशिक निर्भरता'], ['Partial dependency']],
            [['3NF · Third Normal Form', '3NF · तृतीय सामान्य रूप'], ['2NF + no transitive dependency (A→B→C)', 'अप्रत्यक्ष निर्भरता'], ['Transitive dependency']],
            [['BCNF · Boyce-Codd Normal Form', 'BCNF · बॉयस-कॉड सामान्य रूप'], ['Every determinant is a candidate key (stricter 3NF)', 'प्रत्येक determinant candidate key'], ['Remaining anomalies']],
          ]],
        ['callout', 'tip',
          ['Goal of normalization: remove insertion, deletion and update anomalies while reducing redundancy.',
           'लक्ष्य: redundancy घटाकर insertion/deletion/update anomaly हटाना।']],
      ],
    },
    {
      id: 'transactions',
      title: ['Transactions & ACID', 'लेन-देन एवं ACID'],
      blocks: [
        ['table',
          [['ACID', 'ACID'], ['Property', 'गुण'], ['Ensures', 'सुनिश्चित']],
          [
            [['A', 'A'], ['Atomicity', 'परमाण्विकता'], ['All-or-nothing execution', 'सब या कुछ नहीं']],
            [['C', 'C'], ['Consistency', 'संगति'], ['Valid state → valid state', 'मान्य state से मान्य state']],
            [['I', 'I'], ['Isolation', 'पृथक्करण'], ['Concurrent txns don’t disturb each other', 'एक साथ चलते txn बाधा न डालें']],
            [['D', 'D'], ['Durability', 'स्थायित्व'], ['Committed data survives crash', 'commit हुआ डेटा crash से बचे']],
          ]],
        ['ul', [
          ['Concurrency problems: dirty read, lost update, unrepeatable read, phantom.', 'Concurrency समस्याएँ: dirty read, lost update, unrepeatable read, phantom।'],
          ['Solved by locks (shared/exclusive), timestamps or serializability checks.', 'हल: lock (shared/exclusive), timestamp, serializability।']],
        ],
        ['pyq', {
          q: 'Hadoop and MapReduce are related with:',
          opts: ['DB/2', 'RDBMS', 'JAVA', 'Big Data'],
          ans: 3,
          ex: ['Hadoop (distributed storage HDFS) + MapReduce (parallel processing) form the classic Big-Data stack.',
               'Hadoop (HDFS भंडारण) + MapReduce (समांतर प्रोसेसिंग) Big Data की जड़ हैं।'],
          src: 'Bihar STET C.S. · 18.09.2020 (Shift-I)',
        }],
      ],
    },
  ],
};
