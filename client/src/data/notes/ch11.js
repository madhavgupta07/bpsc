export default {
  num: 11,
  title: ['Theory of Computation', 'गणना का सिद्धांत'],
  intro: [
    'What can be computed and how fast — automata, grammars, Turing machines, decidability.',
    'क्या गणना संभव है — automata, grammar, ट्यूरिंग मशीन, decidability।',
  ],
  sections: [
    {
      id: 'basics',
      title: ['Alphabets, Strings & Languages', 'वर्णमाला, स्ट्रिंग एवं भाषाएँ'],
      blocks: [
        ['ul', [
          ['Σ (alphabet): finite symbol set, e.g. {0,1}. |Σ| = count.', 'Σ = प्रतीकों का finite समूह, जैसे {0,1}।'],
          ['String: finite sequence over Σ. ε = empty string, |ε| = 0.', 'String = Σ पर finite अनुक्रम; ε = रिक्त string।'],
          ['Σ* (Kleene star) = all strings incl. ε; Σ⁺ excludes ε.', 'Σ* में सभी strings (ε सहित); Σ⁺ में ε नहीं।'],
          ['Language L = any subset of Σ*.', 'भाषा L = Σ* का कोई भी उपसमुच्चय।']],
        ],
      ],
    },
    {
      id: 'automata',
      title: ['Finite Automata: DFA vs NFA', 'परिमित स्वतःतंत्र: DFA vs NFA'],
      blocks: [
        ['table',
          [['Point', 'बिंदु'], ['DFA · Deterministic Finite Automaton', 'DFA'], ['NFA · Non-deterministic Finite Automaton', 'NFA']],
          [
            [['Transitions per input', 'transition'], ['Exactly one ✓', 'ठीक एक'], ['0, 1 or many + ε-moves']],
            [['Speed of recognition', 'पहचान'], ['Faster (no backtracking)', 'तेज़'], ['May backtrack']],
            [['Power', 'शक्ति'], ['Same as NFA ✓', 'समान'], ['Same as DFA']],
            [['Design ease', 'डिज़ाइन'], ['Harder', 'कठिन'], ['Easier ✓', 'आसान']],
          ]],
        ['p',
          'Both recognize exactly the class of REGULAR languages. Every NFA converts to an equivalent DFA (subset construction).',
          'दोनों केवल regular भाषाएँ पहचानते हैं; हर NFA को DFA में बदला जा सकता है।'],
        ['pyq', {
          q: 'A language for which a DFA exists is a:',
          opts: ['Regular Language', 'Non-Regular Language', 'Any language', 'Cannot be said'],
          ans: 0,
          ex: ['Existence of a DFA ⇔ language is regular — this is the definition of the regular class.',
               'जिस भाषा के लिए DFA मौजूद है, वह regular है — यही परिभाषा है।'],
          src: 'Bihar STET C.S. · 12.09.2023 (Shift-I)',
        }],
      ],
    },
    {
      id: 'regular-cfg',
      title: ['Regular Expressions, CFG & Chomsky Hierarchy', 'Regular Expression, CFG एवं Chomsky पदानुक्रम'],
      blocks: [
        ['ul', [
          ['Regular expression (regex) ops: union (+), concatenation (·), star (*) e.g. (0+1)*01(0+1)* = strings containing 01.', 'Regex क्रियाएँ: union, concat, star। जैसे (0+1)*01(0+1)* = 01 युक्त strings।'],
          ['Pumping lemma: used to PROVE a language is NOT regular.', 'Pumping lemma से सिद्ध होता है कि भाषा regular नहीं है।'],
          ['Context-Free Grammar: CFG = G = (V, T, P, S) — Variables, Terminals, Productions, Start symbol; generates context-free languages (CFL).', 'CFG = (V,T,P,S) → CFL उत्पन्न करता है।'],
          ['PDA (Pushdown Automaton) = CFG + stack memory; recognizes exactly CFLs (Context-Free Languages).', 'PDA = stack से सुसज्जित automata, CFL पहचानता है।']],
        ],
        ['table',
          [['Type', 'Type'], ['Grammar', 'Grammar'], ['Automaton', 'Automata'], ['Language', 'भाषा']],
          [
            [['Type 0', '0'], ['Unrestricted', 'Unrestricted'], ['Turing machine', 'Turing machine'], ['Recursively enumerable']],
            [['Type 1', '1'], ['Context-sensitive', 'Context-sensitive'], ['LBA (Linear Bounded Automaton)', 'LBA'], ['CSL · Context-Sensitive Language']],
            [['Type 2', '2'], ['Context-free', 'Context-free'], ['PDA', 'PDA'], ['CFL']],
            [['Type 3', '3'], ['Regular', 'Regular'], ['Finite automata ✓', 'Finite automata'], ['Regular']],
          ]],
        ['callout', 'tip',
          ['Chomsky order trick: Type 3 ⊂ 2 ⊂ 1 ⊂ 0 — power INCREASES from type 3 to type 0.',
           'याद रखें: Type 3 सबसे सीमित, Type 0 सबसे शक्तिशाली।']],
      ],
    },
    {
      id: 'tm-decidability',
      title: ['Turing Machine & Decidability', 'ट्यूरिंग मशीन एवं निर्णयीयता'],
      blocks: [
        ['p',
          'TM (Turing Machine) = infinite tape + head + states; recognizes recursively enumerable languages; the boundary of “computable”.',
          'TM = अनंत tape वाला model; computable की सीमा बताता है।'],
        ['table',
          [['Problem', 'समस्या'], ['Status', 'स्थिति']],
          [
            [['Membership in CFL / regular language', 'CFL/regular में membership'], ['Decidable ✓', 'Decidable ✓']],
            [['Halting problem', 'Halting problem'], ['Undecidable ✗ (Turing, 1936)', 'Undecidable ✗']],
            [['“Is L(G) = Σ*?” for a CFG (universality)', 'CFG की universality'], ['Undecidable ✗', 'Undecidable ✗']],
            [['Equivalence of two CFGs', 'दो CFG equivalence'], ['Undecidable ✗', 'Undecidable ✗']],
            [['Post Correspondence Problem', 'PCP'], ['Undecidable ✗', 'Undecidable ✗']],
          ]],
        ['callout', 'exam',
          ['Rice’s theorem: ANY non-trivial property of the LANGUAGE of a TM is undecidable.',
           "Rice's theorem: TM की भाषा का कोई भी non-trivial गुण जाँचना undecidable है।"]],
      ],
    },
  ],
};
