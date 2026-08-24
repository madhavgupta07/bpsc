export default {
  num: 15,
  title: ['Multimedia', 'मल्टीमीडिया'],
  intro: [
    'Text, images, audio, video and animation combined — formats, color models and standards.',
    'पाठ, चित्र, ध्वनि, वीडियो और एनीमेशन का संगम — format, रंग-मॉडल और standard।',
  ],
  sections: [
    {
      id: 'elements',
      title: ['Elements of Multimedia', 'मल्टीमीडिया के तत्व'],
      blocks: [
        ['ul', [
          ['Text (fonts: TrueType/OpenType) · Graphics/Images · Audio · Video · Animation · Interactivity.', 'Text, चित्र, audio, video, animation और interactivity।'],
          ['Linear multimedia plays without user control (movie); non-linear/interactive lets user navigate (games, e-learning).', 'Linear: बिना नियंत्रण; non-linear (interactive): user navigation।']],
        ],
      ],
    },
    {
      id: 'images-color',
      title: ['Images & Color Models', 'चित्र एवं रंग-मॉडल'],
      blocks: [
        ['table',
          [['Aspect', 'आधार'], ['Raster', 'Raster'], ['Vector', 'Vector']],
          [
            [['Made of', 'बनता है'], ['Pixels grid ✓', 'pixels'], ['Mathematical curves', 'गणितीय curves']],
            [['Scaling', 'zoom'], ['Blurs on zoom ✗', 'blur'], ['No loss at any size ✓', 'नहीं blur']],
            [['Formats', 'format'], 'JPEG (Joint Photographic Experts Group), PNG (Portable Network Graphics), GIF (Graphics Interchange Format), BMP (Bitmap)', '—'], ['SVG (Scalable Vector Graphics), AI, CDR'],
          ]],
        ['table',
          [['Model', 'मॉडल'], ['Components', 'घटक'], ['Used for', 'उपयोग']],
          [
            [['RGB', 'RGB'], ['Red+Green+Blue (additive)', 'जोड़ने वाला'], ['Screens, monitors']],
            [['CMYK', 'CMYK'], ['Cyan+Magenta+Yellow+Key(black) (subtractive)', 'घटाने वाला'], ['Printing ✓']],
            [['HSV/HSB', 'HSV'], ['Hue, Saturation, Value/Brightness', 'रंग गुण'], ['Color pickers, editing']],
          ]],
      ],
    },
    {
      id: 'audio-video',
      title: ['Audio & Video Fundamentals', 'Audio एवं Video'],
      blocks: [
        ['ul', [
          ['Digitizing sound = SAMPLING rate (Hz) + bit depth. CD quality: 44.1 kHz × 16-bit stereo.', 'ध्वनि digitize: sampling rate + bit depth; CD: 44.1 kHz, 16-bit।'],
          ['MP3 (MPEG Audio Layer-3; MPEG = Moving Picture Experts Group) = lossy compressed audio; WAV (Waveform) = uncompressed.', 'MP3 = lossy compression; WAV = uncompressed।'],
          ['Video = frames per second (fps); 24 fps cinema, 30/60 fps TV/games. Codecs compress: MPEG-4, H.264.', 'Video: fps + codec (MPEG-4/H.264)।']],
        ],
        ['pyq', {
          q: 'VGA stands for:',
          opts: ['Video Guard Ample', 'Visual Gate Adapter', 'Video Graphics Array', 'Visual Game Adapter'],
          ans: 2,
          ex: ['VGA = Video Graphics Array — IBM’s classic 15-pin analog display standard.',
               'VGA = Video Graphics Array — पुराना analog display standard।'],
          src: 'Bihar STET C.S. · 18.09.2020 (Shift-I)',
        }],
        ['pyq', {
          q: 'CD-ROM is a:',
          opts: ['Semiconductor Memory', 'Memory Register', 'Magnetic Memory', 'None of these'],
          ans: 3,
          ex: ['CD-ROM is OPTICAL storage (laser-read pits and lands) — neither semiconductor, register nor magnetic.',
               'CD-ROM प्रकाशीय (optical) भंडारण है — semiconductor/register/magnetic में से कोई नहीं।'],
          src: 'Bihar STET C.S. · 2019 (Shift-II)',
        }],
      ],
    },
    {
      id: 'media-storage-tools',
      title: ['Storage Media & Tools', 'भंडारण माध्यम एवं उपकरण'],
      blocks: [
        ['table',
          [['Medium', 'माध्यम'], ['Capacity ≈', 'क्षमता'], ['Technology', 'तकनीक']],
          [
            [['CD · Compact Disc', 'CD'], ['700 MB', '700 MB'], ['Optical laser']],
            [['DVD · Digital Versatile Disc', 'DVD'], ['4.7 GB (single layer)', '4.7 GB'], ['Denser optical']],
            [['Blu-ray', 'Blu-ray'], ['25–50 GB', '25–50 GB'], ['Blue-violet laser → HD video']],
            [['Flash / SD (Secure Digital) card', 'Flash / SD'], ['GBs–TBs', 'GB-TB'], ['EEPROM-based solid state']],
          ]],
        ['ul', [
          ['Creation tools: Photoshop/CorelDRAW (images), Audacity (audio), Premiere/Filmora (video), Flash→Animate (animation).', 'निर्माण: Photoshop, Audacity, Premiere, Animate।'],
          ['Streaming = play while downloading (YouTube); progressive vs adaptive bitrate streaming adjusts to network speed.', 'Streaming: download के साथ playback; adaptive bitrate internet के अनुसार quality बदलती है।']],
        ],
      ],
    },
  ],
};
