export default {
  num: 17,
  title: ['GK, Environment & Reasoning', 'सामान्य ज्ञान, पर्यावरण एवं तर्कशक्ति'],
  intro: [
    '25% of the paper! Environment laws, Bihar-specific facts and high-scoring reasoning techniques.',
    'प्रश्नपत्र का 25%! पर्यावरण कानून, बिहार-विशेष तथ्य और तार्किक क्षमता की ट्रिक।',
  ],
  sections: [
    {
      id: 'environment',
      title: ['Environment & Ecology Essentials', 'पर्यावरण एवं पारिस्थितिकी'],
      blocks: [
        ['table',
          [['Term', 'शब्द'], ['Meaning', 'अर्थ']],
          [
            [['Ecosystem', 'पारिस्थितिकी तंत्र'], ['Biotic + abiotic components interacting in an area', 'जीव+निर्जीव अन्योन्यक्रिया']],
            [['Biodiversity', 'जैव विविधता'], ['Variety of species, genes, ecosystems', 'जीवों की विविधता']],
            [['Ozone layer', 'ओज़ोन'], ['Stratospheric O₃ shielding UV-B; damaged by CFCs (ChloroFluoroCarbons; Montreal Protocol 1987)', 'UV से रक्षा; CFC ने हानि']],
            [['Acid rain pH', 'अम्ल वर्षा'], ['Below 5.6 due to SO₂ + NOx', '<5.6 pH']],
          ]],
        ['table',
          [['Act / Event', 'क़ानून/घटना'], ['Year', 'वर्ष']],
          [
            [['Wildlife Protection Act', 'वन्यजीव संरक्षण अधिनियम'], ['1972', '1972']],
            [['Water (Prevention & Control of Pollution) Act', 'जल अधिनियम'], ['1974', '1974']],
            [['Forest Conservation Act', 'वन संरक्षण अधिनियम'], ['1980', '1980']],
            [['Air Act', 'वायु अधिनियम'], ['1981', '1981']],
            [['Environment Protection Act', 'पर्यावरण संरक्षण अधिनियम'], ['1986', '1986']],
            [['Kyoto Protocol → Paris Agreement', 'क्योटो → पेरिस'], ['1997 → 2015', '1997 → 2015']],
          ]],
      ],
    },
    {
      id: 'bihar-facts',
      title: ['Bihar-Specific Facts', 'बिहार-विशेष तथ्य'],
      blocks: [
        ['ul', [
          ['Valmiki National Park & Tiger Reserve — only tiger reserve of Bihar (West Champaran).', 'वाल्मीकि राष्ट्रीय उद्यान — बिहार का एकमात्र बाघ अभयारण्य (पश्चिम चम्पारण)।'],
          ['Kanwar Lake (Begusarai) = Asia’s largest freshwater oxbow lake; Ramsar site.', 'कनवर झील (बेगूसराय) = एशिया की सबसे बड़ी मीठे पानी की छाप झील; Ramsar site।'],
          ['State symbols: Giddh (sparrowhawk?) — actually State bird = House Sparrow (Gauraiya), animal = Gaur, flower = Kachnar.', 'राज्य प्रतीक: पक्षी = गौरैया; पशु = गौर; पुष्प = कचनार।'],
          ['First President Dr. Rajendra Prasad, Ashoka’s Lion Capital from Sarnath — Bihar connection via Vaishali/Mauryan history.', 'बिहार से जुड़े गौरव: डॉ. राजेंद्र प्रसाद, मौर्य इतिहास।']],
        ],
      ],
    },
    {
      id: 'reasoning',
      title: ['Reasoning: Series, Coding & Syllogism', 'तर्क: श्रृंखला, कोडिंग एवं न्याय-वाक्य'],
      blocks: [
        ['ul', [
          ['Number series: check differences (+3,+5,+7…), squares/cubes, alternate terms.', 'संख्या श्रृंखला: अंतर देखें (+3,+5…), वर्ग/घन, एकांतर पद।'],
          ['Coding-decoding: shift letters by k positions (A→D = +3), reverse alphabet (A↔Z).', 'कोडिंग: अक्षर +k शिफ्ट; विपरीत वर्णमाला।'],
          ['Blood relations: draw a family tree with symbols (+ male, − female) before answering.', 'रक्त संबंध: पहले वंश-वृक्ष बनाएँ (+पुरुष, −स्त्री)।'],
          ['Syllogism: use Venn diagrams — draw ALL possible diagrams; conclusion valid only if true in every case.', 'न्याय-वाक्य: वेन चित्र से हर possible diagram खींचें; जो सभी में सत्य हो वही निष्कर्ष।']],
        ],
        ['code',
          'Q: In a code, TEACHER is written as VGCEJGT.\n     T→V  E→G  A→C  C→E  H→J  E→G  R→T\n     Rule: each letter shifts +2. So CHILD → ?\n     C→E H→J I→K L→N D→F   ⇒  EJKNF',
          'Worked coding example (+2 shift)', 'उदाहरण (+2 शिफ्ट)'],
      ],
    },
    {
      id: 'strategy',
      title: ['Exam Strategy for These 50 Marks', 'इन 50 अंकों की रणनीति'],
      blocks: [
        ['ul', [
          ['Pedagogy (25%) + GK (General Knowledge)/Reasoning (25%) = HALF the paper — do not ignore them for CS (Computer Science) units!', 'Pedagogy + GK/Reasoning = आधा प्रश्नपत्र — केवल CS पर निर्भर न रहें!'],
          ['Revise previous-year papers: many GK/reasoning items repeat with changed numbers.', 'पिछले वर्षों के प्रश्नपत्र दोहराएँ — प्रश्न बदले नाम से लौटते हैं।'],
          ['Keep a one-page sheet: acts-years, national parks, symbols, square-cube tables up to 30.', 'एक-पृष्ठ सारणी बनाएँ: act-वर्ष, राष्ट्रीय उद्यान, वर्ग-घन तालिका।']],
        ],
        ['callout', 'exam',
          ['Time plan per 150 questions: Computer Science ≈ 60 sec each · Pedagogy ≈ 45 sec · Reasoning ≈ 60–75 sec · leave 15 min review.',
           'समय योजना: CS≈60 सेकंड/प्रश्न · Pedagogy≈45 · Reasoning≈75 · 15 मिनट समीक्षा।']],
      ],
    },
  ],
};
