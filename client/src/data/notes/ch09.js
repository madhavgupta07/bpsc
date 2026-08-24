export default {
  num: 9,
  title: ['Object-Oriented Programming', 'वस्तु उन्मुख प्रोग्रामन (OOP)'],
  intro: [
    'Classes, objects and the four pillars that power C++, Java and Python.',
    'क्लास, ऑब्जेक्ट और चार स्तंभ — C++, Java, Python की नींव।',
  ],
  sections: [
    {
      id: 'paradigm',
      title: ['Procedural vs Object-Oriented', 'प्रोसीड्यूरल बनाम OOP'],
      blocks: [
        ['table',
          [['Aspect', 'आधार'], ['Procedural (C)', 'Procedural (C)'], ['OOP (C++, Java)', 'OOP (C++, Java)']],
          [
            [['Unit', 'इकाई'], ['Function', 'Function'], ['Class/Object']],
            [['Data', 'डेटा'], ['Global, open to all', 'सबके लिए खुला'], ['Encapsulated & hidden ✓', 'छिपा हुआ']],
            [['Approach', 'दृष्टिकोण'], ['Top-down', 'Top-down'], ['Bottom-up ✓', 'Bottom-up']],
            [['Security', 'सुरक्षा'], ['Low', 'कम'], ['Access modifiers', 'access modifiers']],
          ]],
        ['diagram', 'oop-pillars', 'The four pillars of OOP', 'OOP के चार स्तंभ'],
      ],
    },
    {
      id: 'pillars',
      title: ['The Four Pillars in Detail', 'चार स्तंभ विस्तार से'],
      blocks: [
        ['ul', [
          ['Encapsulation: data + methods wrapped in a class; data hidden via private + getters/setters.', 'Encapsulation: data+methods class में बाँधना; private + getters से छुपाना।'],
          ['Inheritance: child class reuses parent members — single, multiple (C++), multilevel, hierarchical, hybrid. Java allows multiple inheritance only via interfaces.', 'Inheritance: parent की property child में — single, multilevel, hierarchical; Java में interface से ही multiple।'],
          ['Polymorphism: one name many forms — compile-time (overloading) & run-time (overriding).', 'Polymorphism: एक नाम अनेक रूप — compile-time (overloading), run-time (overriding)।'],
          ['Abstraction: expose essentials, hide implementation — abstract classes & interfaces.', 'Abstraction: आवश्यक दिखाएँ, implementation छुपाएँ।']],
        ],
        ['pyq', {
          q: 'Abstraction means:',
          opts: ['Summarization', 'Elimination', 'Hiding', 'Casting'],
          ans: 2,
          ex: ['Abstraction hides internal complexity and shows only essential features to the user.',
               'Abstraction आंतरिक जटिलता छिपाकर केवल आवश्यक विशेषताएँ दिखाता है।'],
          src: 'Bihar STET C.S. · 2019 (Shift-II)',
        }],
        ['pyq', {
          q: 'Objects are:',
          opts: ['Design of function', 'Creator of data', 'Instances of classes', 'Program block'],
          ans: 2,
          ex: ['A class is the blueprint; an object is its runtime instance occupying memory.',
               'Class नक़्शा (blueprint) है; object उसका memory में बना instance।'],
          src: 'Bihar STET C.S. · 2019 (Shift-II)',
        }],
      ],
    },
    {
      id: 'class-members',
      title: ['Classes, Constructors & Overloading vs Overriding', 'क्लास, Constructor एवं Overloading/Overriding'],
      blocks: [
        ['table',
          [['Point', 'बिंदु'], ['Overloading', 'Overloading'], ['Overriding', 'Overriding']],
          [
            [['Where', 'कहाँ'], ['Same class', 'एक ही class में'], ['Parent–child classes', 'parent-child में']],
            [['Signature', 'हस्ताक्षर'], ['Must differ (args/type)', 'अलग arguments'], ['Exactly same', 'एक समान']],
            [['Binding', 'Binding'], ['Compile-time (static)', 'compile-time'], ['Run-time (dynamic, virtual functions)', 'run-time']],
          ]],
        ['ul', [
          ['Constructor: same name as class, no return type, auto-called at object creation; types — default, parameterized, copy.', 'Constructor: class जैसा नाम, return type नहीं, object बनते ही auto-call। प्रकार: default, parameterized, copy।'],
          ['Destructor (~Class): releases resources when object dies (C++).', 'Destructor (~Class): object समाप्त होते ही resource मुक्त (C++)।']],
        ],
        ['code',
          'class Student {\n  private:\n    int roll;\n  public:\n    Student(int r) { roll = r; }   // constructor\n    int getRoll() { return roll; } // public access\n};\nStudent s1(101);  // object = instance of class',
          'Minimal C++ example', 'न्यूनतम C++ उदाहरण'],
        ['pyq', {
          q: 'Math.h is a:',
          opts: ['Derived data type', 'Function', 'Header file', 'Built-in data type'],
          ans: 2,
          ex: ['math.h is a C/C++ header file declaring math functions like sqrt(), pow().',
               'math.h एक header file है जिसमें sqrt(), pow() जैसे math functions की घोषणाएँ हैं।'],
          src: 'Bihar STET C.S. · 2019 (Shift-II)',
        }],
      ],
    },
    {
      id: 'languages',
      title: ['Popular OO Languages', 'प्रमुख OO भाषाएँ'],
      blocks: [
        ['table',
          [['Language', 'भाषा'], ['Paradigm note', 'विशेष'], ['Famous use', 'उपयोग']],
          [
            [['C++', 'C++'], ['OOP + procedural hybrid; multiple inheritance allowed', 'hybrid'], ['Games, OS parts']],
            [['Java', 'Java'], ['Purely class-based; WORA (Write Once Run Anywhere) on JVM (Java Virtual Machine); multiple inheritance via interfaces', 'JVM पर WORA'], ['Enterprise apps, Android']],
            [['Python', 'Python'], ['Interpreted, dynamically typed', 'interpreted'], ['AI/Data science']],
            [['VB.NET', 'VB.NET'], ['Fully object-oriented .NET language', '.NET'], ['Windows apps']],
          ]],
        ['pyq', {
          q: 'What is Python?',
          opts: ['Programming Language', 'Compiler', 'OS', 'Protocol'],
          ans: 0,
          ex: ['Python is a high-level interpreted general-purpose programming language.',
               'Python एक high-level interpreted programming language है।'],
          src: 'Bihar STET C.S. · 18.09.2020 (Shift-I)',
        }],
      ],
    },
  ],
};
