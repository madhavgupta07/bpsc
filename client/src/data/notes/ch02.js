export default {
  num: 2,
  title: ['Computer Organization & Architecture', 'कंप्यूटर संगठन एवं आर्किटेक्चर'],
  intro: [
    'How a computer is physically organised — CPU, buses, memory types and microprocessors.',
    'कंप्यूटर भौतिक रूप से कैसे संगठित होता है — CPU, बस, मेमोरी प्रकार और माइक्रोप्रोसेसर।',
  ],
  sections: [
    {
      id: 'cpu-org',
      title: ['CPU Organization', 'CPU की संरचना'],
      blocks: [
        ['diagram', 'computer-block', 'Von Neumann block diagram — single memory for data + program', 'वॉन न्यूमैन ब्लॉक आरेख — डेटा व प्रोग्राम हेतु एक ही मेमोरी'],
        ['ul', [
          ['ALU (Arithmetic Logic Unit) performs arithmetic (+,−,×,÷) and logic (AND/OR/NOT) operations.', 'ALU (अंकगणित एवं तर्क इकाई) गणितीय (+,−,×,÷) तथा लॉजिक (AND/OR/NOT) क्रियाएँ करता है।'],
          ['CU (Control Unit) fetches, decodes instructions and generates control signals; it never processes data itself.', 'CU (नियंत्रण इकाई) अनुदेश लाकर decode करती है और नियंत्रण संकेत बनाती है; स्वयं डेटा प्रोसेस नहीं करती।'],
          ['Registers are the fastest storage: PC (Program Counter – next instruction), IR (Instruction Register – current instruction), MAR (Memory Address Register), MDR (Memory Data Register), Accumulator.', 'रजिस्टर सबसे तीव्र भंडारण हैं: PC (प्रोग्राम काउंटर – अगला अनुदेश), IR (अनुदेश रजिस्टर – वर्तमान), MAR (मेमोरी पता रजिस्टर), MDR (मेमोरी डेटा रजिस्टर), Accumulator।'],
        ]],
        ['pyq', {
          q: 'The CPU consists of:',
          opts: ['A central processing unit only', 'Input and output unit', 'A control unit and an arithmetic logic unit', 'An ALU and a card reader'],
          ans: 2,
          ex: ['CPU = Control Unit + ALU + Registers. I/O units sit outside the CPU.',
               'CPU = नियंत्रण इकाई + ALU + रजिस्टर। I/O इकाइयाँ CPU के बाहर होती हैं।'],
          src: 'Bihar STET C.S. · PYQ compilation',
        }],
        ['diagram', 'instruction-cycle', 'Fetch → Decode → Execute cycle repeats forever', 'Fetch → Decode → Execute चक्र लगातार दोहराया जाता है'],
      ],
    },
    {
      id: 'buses',
      title: ['System Buses', 'सिस्टम बस'],
      blocks: [
        ['table',
          [['Bus', 'बस'], ['Carries', 'वहन करती है'], ['Direction', 'दिशा'], ['Width decides', 'चौड़ाई तय करती है']],
          [
            [['Address bus', 'एड्रेस बस'], ['Memory/I-O address', 'मेमोरी/I-O पता'], ['Unidirectional', 'एकदिशीय'], ['Max addressable memory', 'अधिकतम संबोध्य मेमोरी']],
            [['Data bus', 'डेटा बस'], ['Actual data/word', 'वास्तविक डेटा'], ['Bidirectional', 'द्विदिशीय'], ['Word size (e.g. 32/64-bit)', 'वर्ड आकार']],
            [['Control bus', 'कंट्रोल बस'], ['READ/WRITE/INT signals', 'READ/WRITE/INT संकेत'], ['Mixed', 'मिश्रित'], ['Timing & commands', 'समय-नियंत्रण']],
          ]],
        ['callout', 'exam',
          ['Address bus 32 lines → 2³² bytes = 4 GB addressable memory. Direct numerical question!',
           '32 line की address bus → 2³² bytes = 4 GB संबोध्य मेमोरी। सीधा गणितीय प्रश्न!']],
      ],
    },
    {
      id: 'memory',
      title: ['Memory System', 'मेमोरी प्रणाली'],
      blocks: [
        ['diagram', 'memory-hierarchy', 'Speed decreases and cost per bit falls as we go down', 'नीचे जाने पर गति घटती है और प्रति बिट लागत घटती है'],
        ['table',
          [['Type', 'प्रकार'], ['Volatile?', 'अस्थिर?'], ['Feature', 'विशेषता']],
          [
            [['SRAM · Static RAM', 'SRAM · स्टैटिक RAM'], ['Yes', 'हाँ'], ['Flip-flop cell, fastest, cache memory', 'फ्लिप-फ्लॉप सेल, सबसे तेज़, कैश']],
            [['DRAM · Dynamic RAM', 'DRAM · डायनामिक RAM'], ['Yes', 'हाँ'], ['Capacitor cell, needs refresh, main memory', 'संधारित्र सेल, refresh आवश्यक, मुख्य मेमोरी']],
            [['ROM · Read Only Memory', 'ROM · केवल-पठनीय मेमोरी'], ['No ✓', 'नहीं'], ['Factory-programmed, read-only (BIOS)', 'फ़ैक्टरी में लिखित, केवल-पठनीय (BIOS)']],
            [['PROM · Programmable ROM', 'PROM · प्रोग्रामेबल ROM'], ['No', 'नहीं'], ['Programmed once by user', 'उपयोगकर्ता एक बार लिख सकता है']],
            [['EPROM · Erasable PROM (by UV light)', 'EPROM · पराबैंगनी द्वारा मिटाने योग्य PROM'], ['No', 'नहीं'], ['Erase with UV light (UVEPROM)', 'पराबैंगनी प्रकाश से मिटाया जा सकता है']],
            [['EEPROM · Electrically Erasable PROM', 'EEPROM · विद्युत द्वारा मिटाने योग्य PROM'], ['No', 'नहीं'], ['Electrically erasable → basis of Flash/SSD', 'विद्युत द्वारा मिटाया जा सकता है → Flash/SSD का आधार']],
          ]],
      ],
    },
    {
      id: 'mpu-mcu',
      title: ['Microprocessor vs Microcontroller & Addressing Modes', 'माइक्रोप्रोसेसर बनाम माइक्रोकंट्रोलर एवं पता संबोधन'],
      blocks: [
        ['table',
          [['Point', 'आधार'], ['Microprocessor', 'माइक्रोप्रोसेसर'], ['Microcontroller', 'माइक्रोकंट्रोलर']],
          [
            [['Structure', 'संरचना'], ['CPU only; RAM/ROM external', 'केवल CPU; RAM/ROM बाहरी'], ['CPU+RAM+ROM+I/O on one chip', 'एक ही चिप पर CPU+RAM+ROM+I/O']],
            [['Use', 'उपयोग'], ['PCs, general computing', 'PC, सामान्य कंप्यूटिंग'], ['Washing machine, IoT devices', 'वॉशिंग मशीन, IoT उपकरण']],
            [['Cost/power', 'लागत/शक्ति'], ['Higher', 'अधिक'], ['Lower', 'कम']],
          ]],
        ['table',
          [['Addressing mode', 'संबोधन प्रकार'], ['Meaning', 'अर्थ'], ['Example', 'उदाहरण']],
          [
            [['Immediate', 'तात्क्षणिक'], ['Operand inside instruction', 'ऑपरेंड अनुदेश में ही'], ['MVI A, 05H', 'MVI A, 05H']],
            [['Register', 'रजिस्टर'], ['Operand in register', 'ऑपरेंड रजिस्टर में'], ['MOV A, B', 'MOV A, B']],
            [['Direct', 'प्रत्यक्ष'], ['Address given in instruction', 'पता अनुदेश में दिया'], ['LDA 2050H', 'LDA 2050H']],
            [['Indirect', 'अप्रत्यक्ष'], ['Address in register pair', 'पता रजिस्टर-जोड़ी में'], ['MOV A, M', 'MOV A, M']],
            [['Implied/Implicit', 'अंतर्निहित'], ['Operand fixed by opcode', 'ऑपरेंड opcode द्वारा निश्चित'], ['CMA', 'CMA']],
          ]],
      ],
    },
    {
      id: 'error-codes',
      title: ['Error Detection & Correction Codes', 'त्रुटि संसूचना एवं संशोधन कोड'],
      blocks: [
        ['table',
          [['Technique', 'तकनीक'], ['Detects / Corrects', 'संसूचना/संशोधन'], ['Idea', 'मूल विचार']],
          [
            [['Parity bit', 'पैरिटी बिट'], ['Detects 1-bit error', '1-बिट त्रुटि पकड़ता है'], ['Even parity: total 1s made even', 'even parity: कुल 1 गिनती सम']],
            [['Checksum', 'चेकसम'], ['Detects burst errors in blocks', 'ब्लॉक में burst त्रुटि'], ['Sum of segments sent with data', 'खंडों का योग डेटा के साथ भेजा']],
            [['Hamming code', 'हैमिंग कोड'], ['Detects AND corrects 1-bit error ✓', '1-बिट त्रुटि पकड़ता और सुधारता है'], ['Parity bits at positions 2ᵏ', 'पैरिटी बिट 2ᵏ स्थितियों पर']],
          ]],
        ['callout', 'tip',
          ['Hamming rule: for d data bits, p parity bits must satisfy 2ᵖ ≥ d + p + 1.',
           'हैमिंग नियम: d डेटा बिट हेतु p पैरिटी बिट ऐसे कि 2ᵖ ≥ d + p + 1।']],
      ],
    },
  ],
};
