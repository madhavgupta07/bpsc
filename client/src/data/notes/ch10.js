export default {
  num: 10,
  title: ['Web Technologies', 'वेब प्रौद्योगिकियाँ'],
  intro: [
    'How the web works — HTML, CSS, JavaScript, HTTP and the client-server model.',
    'वेब कैसे चलता है — HTML, CSS, JavaScript, HTTP और client-server मॉडल।',
  ],
  sections: [
    {
      id: 'internet-www',
      title: ['Internet & WWW Basics', 'इंटरनेट एवं WWW'],
      blocks: [
        ['ul', [
          ['Internet = global network of networks working on PACKET SWITCHING.', 'Internet = networks का जाल, packet switching पर आधारित।'],
          ['WWW = information space of hyperlinked documents accessed via HTTP — a service ON the internet (others: e-mail, FTP, Telnet).', 'WWW = hyperlink से जुड़े documents का संसार; internet पर एक सेवा (अन्य: e-mail, FTP)।'],
          ['URL (Uniform Resource Locator) anatomy: https://www.school.in:443/notes/index.html → protocol + domain + port + path.', 'URL (वेब पता) = protocol + domain + port + path।']],
        ],
        ['pyq', {
          q: 'The Internet works on:',
          opts: ['Packet switching', 'Circuit switching', 'Both', 'None'],
          ans: 0,
          ex: ['Data is broken into packets that route independently and reassemble at destination — the essence of the Internet.',
               'डेटा packets में टूटकर स्वतंत्र रूप से route होते हैं और गंतव्य पर फिर जुड़ते हैं।'],
          src: 'Bihar STET C.S. · 2019 (Shift-II)',
        }],
        ['pyq', {
          q: 'HTML stands for:',
          opts: ['Human Text Makeup Language', 'Hyper Text Markup Language', 'Human Text Manipulation Language', 'Handy Text Markup Language'],
          ans: 1,
          ex: ['HTML = HyperText Markup Language — the standard language in which web pages are written.',
               'HTML = HyperText Markup Language — web pages इसी में लिखे जाते हैं।'],
          src: 'Bihar STET C.S. · 18.09.2020 (Shift-I)',
        }],
      ],
    },
    {
      id: 'html',
      title: ['HTML Essentials', 'HTML आधारभूत तत्व'],
      blocks: [
        ['code',
          '<!DOCTYPE html>\n<html>\n  <head><title>My Page</title></head>\n  <body>\n    <h1>Heading</h1>\n    <p>Paragraph with <a href="https://example.com">link</a>.</p>\n    <img src="pic.png" alt="photo">\n  </body>\n</html>',
          'Minimal HTML5 document', 'न्यूनतम HTML5 document'],
        ['table',
          [['Tag pair', 'Tag'], ['Purpose', 'उद्देश्य']],
          [
            [['<h1>–<h6>', '<h1>–<h6>'], ['Headings (largest → smallest)', 'शीर्षक']],
            [['<p>, <br>, <hr>', '<p>…'], ['Paragraph, line break, rule', 'अनुच्छेद/विराम']],
            [['<a href>', '<a>'], ['Hyperlink', 'हाइपरलिंक']],
            [['<img src alt>', '<img>'], ['Image with alternate text', 'चित्र']],
            [['<table> <tr> <td>', '<table>'], ['Tabular data', 'सारणी']],
            [['<ol>/<ul> <li>', '<ol>/<ul>'], ['Ordered/unordered list', 'क्रमबद्ध/बिंदु सूची']],
            [['<form> <input>', '<form>'], ['User input collection', 'फ़ॉर्म']],
            [['<div> vs <span>', '<div>/<span>'], ['Block-level vs inline container', 'block बनाम inline']],
          ]],
      ],
    },
    {
      id: 'css-js',
      title: ['CSS & JavaScript', 'CSS एवं JavaScript'],
      blocks: [
        ['ul', [
          ['Three ways to apply CSS (Cascading Style Sheets): inline (style attr), internal (<style> tag), external (.css file via <link>) — external is best practice.', 'CSS (कैस्केडिंग स्टाइल शीट) तीन तरीक़े: inline, internal (<style>), external (.css file) — external सर्वोत्तम।'],
          ['Specificity order: inline > id > class > element.', 'प्राथमिकता: inline > id > class > element।'],
          ['Box model: margin → border → padding → content.', 'Box model: margin → border → padding → content।'],
          ['JavaScript makes pages interactive: DOM (Document Object Model) manipulation, events (onclick), validation — runs in browser (client-side).', 'JavaScript पृष्ठ को interactive बनाती है: DOM (डॉक्यूमेंट ऑब्जेक्ट मॉडल), events, validation — browser में चलती है।']],
        ],
        ['code',
          '// change text on button click\n<button onclick="greet()">Click</button>\n<script>\nfunction greet() {\n  document.getElementById("msg").innerHTML = "Hello!";\n}\n</script>',
          'Tiny JS event example', 'छोटा JS उदाहरण'],
      ],
    },
    {
      id: 'http-server',
      title: ['HTTP, Status Codes & Servers', 'HTTP, Status Codes और Server'],
      blocks: [
        ['table',
          [['Method', 'Method'], ['Use', 'उपयोग'], ['Safe?', 'Safe?']],
          [
            [['GET', 'GET'], ['Read/fetch data; params in URL', 'data पढ़ना'], ['Yes ✓']],
            [['POST', 'POST'], ['Submit data; body hidden from URL', 'data भेजना'], ['No']],
            [['PUT', 'PUT'], ['Update/replace resource', 'resource बदलना'], ['No']],
            [['DELETE', 'DELETE'], ['Remove resource', 'हटाना'], ['No']],
          ]],
        ['table',
          [['Code', 'Code'], ['Meaning', 'अर्थ']],
          [
            [['200 OK', '200'], ['Success', 'सफल']],
            [['301 / 302', '301'], ['Redirect', 'redirect']],
            [['403 Forbidden', '403'], ['Access denied', 'पहुँच निषेध']],
            [['404 Not Found', '404'], ['Page missing ✓ famous', 'पृष्ठ नहीं मिला']],
            [['500 Internal Error', '500'], ['Server-side crash', 'server त्रुटि']],
          ]],
        ['callout', 'def',
          ['Client–server model: browser (client) sends HTTP (HyperText Transfer Protocol) request → web server (Apache/Nginx/IIS) responds with HTML. Dynamic sites add app server + database (PHP/Node.js + MySQL).',
           'Client-server: browser request भेजता है → server response देता है। dynamic site में PHP/Node.js + MySQL जुड़ते हैं।']],
      ],
    },
  ],
};
