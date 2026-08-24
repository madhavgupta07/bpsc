export default {
  num: 14,
  title: ['Fundamentals of E-Commerce', 'ई-कॉमर्स के मूल सिद्धांत'],
  intro: [
    'Buying and selling online — business models, security pillars and digital payments.',
    'ऑनलाइन क्रय-विक्रय — व्यावसायिक मॉडल, सुरक्षा और डिजिटल भुगतान।',
  ],
  sections: [
    {
      id: 'intro-ecom',
      title: ['E-Commerce Meaning & Features', 'E-Commerce: अर्थ एवं विशेषताएँ'],
      blocks: [
        ['p',
          'E-commerce = buying/selling of goods, services and information over computer networks (mainly the Internet) with electronic payment.',
          'E-commerce = network (internet) के माध्यम से वस्तु/सेवा/सूचना का लेन-देन तथा इलेक्ट्रॉनिक भुगतान।'],
        ['ul', [
          ['Features: ubiquity (24×7 anywhere), global reach, low cost, personalization, interactivity.', 'विशेषताएँ: ubiquity, global reach, न्यून लागत, personalization।'],
          ['Consumer-oriented applications demand a user-friendly interface above all.', 'consumer-oriented app की सबसे बड़ी आवश्यकता user-friendly interface है।']],
        ],
        ['pyq', {
          q: 'Consumer-oriented Electronic Commerce is known as:',
          opts: ['B2B', 'C2C', 'B2C', 'G2B'],
          ans: 2,
          ex: ['Business-to-Consumer (B2C) = company sells directly to end consumers — Flipkart, Amazon retail.',
               'B2C = कंपनी सीधे उपभोक्ता को बेचती है — Flipkart, Amazon।'],
          src: 'Bihar STET C.S. · PYQ compilation',
        }],
      ],
    },
    {
      id: 'models',
      title: ['E-Commerce Business Models', 'व्यावसायिक मॉडल'],
      blocks: [
        ['table',
          [['Model', 'मॉडल'], ['Parties', 'पक्ष'], ['Example', 'उदाहरण']],
          [
            [['B2B', 'B2B'], ['Business → Business', 'फर्म→फर्म'], ['Alibaba bulk trade, Tally to firms']],
            [['B2C', 'B2C'], ['Business → Consumer ✓', 'फर्म→उपभोक्ता'], ['Amazon, Flipkart']],
            [['C2C', 'C2C'], ['Consumer → Consumer', 'उपभोक्ता→उपभोक्ता'], ['OLX, eBay']],
            [['C2B', 'C2B'], ['Consumer → Business', 'उपभोक्ता→फर्म'], ['Freelancer portals, stock photos']],
            [['G2B / B2G', '—'], ['Government ↔ Business', 'सरकार↔फर्म'], ['e-Procurement, GST portal']],
          ]],
      ],
    },
    {
      id: 'security',
      title: ['Security: CIA Triad & Technologies', 'सुरक्षा: CIA Triad एवं तकनीकें'],
      blocks: [
        ['table',
          [['Letter', 'अक्षर'], ['Pillar', 'स्तंभ'], ['Meaning', 'अर्थ'], ['Tool', 'साधन']],
          [
            [['C', 'C'], ['Confidentiality', 'गोपनीयता'], ['Only intended can read', 'अधिकृत ही पढ़ें'], ['SSL (Secure Sockets Layer) / TLS (Transport Layer Security) encryption']],
            [['I', 'I'], ['Integrity', 'अखंडता'], ['Data not altered in transit', 'data बदला नहीं'], ['Hash, Digital signature']],
            [['A', 'A'], ['Availability', 'उपलब्धता'], ['Service up when needed', 'ज़रूरत पर सेवा चालू'], ['Backups, anti-DDoS']],
          ]],
        ['pyq', {
          q: 'What is CIA? (most important element)',
          opts: ['Security (सुरक्षा)', 'Reliability (विश्वसनीयता)', 'Confidentiality (गोपनीयता)', 'None'],
          ans: 2,
          ex: ['In the exam’s framing, confidentiality is highlighted as the most important element of the CIA triad for e-commerce.',
               'परीक्षा के संदर्भ में CIA triad का सबसे महत्वपूर्ण तत्व Confidentiality (गोपनीयता) बताया गया।'],
          src: 'Bihar STET C.S. · 12.06.2024 (Shift-I)',
        }],
        ['table',
          [['Technology', 'तकनीक'], ['Purpose', 'उद्देश्य']],
          [
            [['SSL/TLS', 'SSL/TLS'], ['Encrypt browser–server channel (https://)', 'channel encryption']],
            [['SET · Secure Electronic Transaction', 'SET'], ['Secure card payment protocol by Visa/Mastercard', 'card payment सुरक्षा']],
            [['Digital signature', 'Digital signature'], ['Authentication + integrity + non-repudiation ✓', 'प्रमाणीकरण+integrity']],
            [['EDI', 'EDI'], ['Electronic Data Interchange between businesses (pre-internet e-comm)', 'B2B data exchange']],
          ]],
      ],
    },
    {
      id: 'payments',
      title: ['Electronic Payment Systems', 'इलेक्ट्रॉनिक भुगतान'],
      blocks: [
        ['ul', [
          ['Credit/debit cards, net banking, e-wallets, UPI (Unified Payments Interface — instant bank-to-bank via VPA, Virtual Payment Address), COD (Cash on Delivery).', 'cards, net banking, e-wallet, UPI, COD।'],
          ['Single-use token vs multi-use token differ in validity duration AND usage pattern — i.e., in all listed aspects.', 'single-use बनाम multi-use token में validity और प्रयोग — दोनों भिन्न।']],
        ],
        ['callout', 'tip',
          ['UPI = Unified Payments Interface by NPCI (National Payments Corporation of India) — instant 24×7 transfer using VPA (Virtual Payment Address); backbone of Indian digital payments.',
           'UPI (NPCI · National Payments Corporation of India): VPA से तुरंत bank-to-bank भुगतान — भारतीय डिजिटल भुगतान की रीढ़।']],
      ],
    },
  ],
};
