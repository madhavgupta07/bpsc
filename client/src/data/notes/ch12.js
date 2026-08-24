export default {
  num: 12,
  title: ['Internet of Things (IoT)', 'इंटरनेट ऑफ थिंग्स'],
  intro: [
    'Everyday objects connected to the internet — architecture, sensors, protocols and applications.',
    'रोज़मर्रा की वस्तुएँ internet से जुड़ीं — संरचना, sensor, protocol और अनुप्रयोग।',
  ],
  sections: [
    {
      id: 'intro-iot',
      title: ['What is IoT?', 'IoT क्या है?'],
      blocks: [
        ['p',
          'IoT = network of physical “things” with embedded sensors, software that collect and exchange data over the internet — often without human involvement.',
          'IoT = sensor/software से सुसज्जित भौतिक वस्तुओं का network, जो internet पर data इकट्ठा-आदान करते हैं।'],
        ['ul', [
          ['Characteristics: Intelligence, Connectivity, Dynamic nature, Sensing, Heterogeneity, Scalability, Security.', 'विशेषताएँ: Intelligence, Connectivity, Dynamic, Sensing, Heterogeneity, Scalability, Security।'],
          ['Kevin Ashton coined the term “Internet of Things” (1999).', '"Internet of Things" शब्द Kevin Ashton ने 1999 में दिया।']],
        ],
      ],
    },
    {
      id: 'architecture-sensors',
      title: ['Architecture & Sensors', 'संरचना एवं Sensor'],
      blocks: [
        ['table',
          [['Layer', 'स्तर'], ['Role', 'भूमिका'], ['Examples', 'उदाहरण']],
          [
            [['Perception / Sensing', 'Perception'], ['Sense the environment', 'माहौल मापना'], ['Sensors, actuators, RFID (Radio-Frequency Identification)']],
            [['Network / Transport', 'Network'], ['Carry data to cloud', 'data cloud तक'], ['WiFi, GSM, LoRa, gateway']],
            [['Processing / Middleware', 'Processing'], ['Store & analyze', 'भंडारण-विश्लेषण'], ['Cloud servers, edge computing']],
            [['Application', 'Application'], ['User-facing services', 'उपयोगकर्ता सेवाएँ'], ['Dashboards, mobile apps']],
          ]],
        ['table',
          [['Sensor', 'Sensor'], ['Measures', 'मापता है']],
          [
            [['DHT11 / DHT22', '—'], ['Temperature + humidity', 'temperature+humidity']],
            [['BMP280', '—'], ['Barometric pressure (+temp)', 'pressure']],
            [['Photoresistor / LDR (Light Dependent Resistor)', '—'], ['Light intensity', 'प्रकाश']],
            [['Ultrasonic HC-SR04', '—'], ['Distance', 'दूरी']],
            [['PIR · Passive Infrared sensor', '—'], ['Motion detection', 'हलचल संसूचन']],
            [['Actuator', '—'], ['Converts signal into ACTION (motor, relay)', 'signal → क्रिया']],
          ]],
        ['pyq', {
          q: 'Which of the following is NOT a sensor in IoT?',
          opts: ['BMP280', 'DHT11', 'Photoresistor', 'More than one of the above', 'None of the above'],
          ans: 4,
          ex: ['Trick question — BMP280, DHT11 and photoresistor are ALL genuine sensors, so none is excluded.',
               'चालबाज़ी वाला प्रश्न — BMP280, DHT11, photoresistor तीनों sensor हैं; कोई बाहर नहीं।'],
          src: 'BPSC TRE 3.0 Exam-2024',
        }],
      ],
    },
    {
      id: 'protocols-hardware',
      title: ['Protocols & Hardware Platforms', 'Protocol एवं Hardware'],
      blocks: [
        ['table',
          [['Technology', 'Technology'], ['Range', 'दूरी'], ['Typical use', 'उपयोग']],
          [
            [['MQTT · Message Queuing Telemetry Transport (pub-sub)', 'MQTT'], ['Over TCP/IP', 'TCP/IP पर'], ['Lightweight IoT messaging ✓']],
            [['CoAP · Constrained Application Protocol', 'CoAP'], ['Over UDP', 'UDP पर'], ['Constrained devices']],
            [['Zigbee', 'Zigbee'], ['≈10–100 m mesh', 'mesh'], ['Home automation']],
            [['BLE · Bluetooth Low Energy', 'BLE'], ['≈10–30 m', 'कम'], ['Wearables']],
            [['LoRaWAN · Long Range Wide Area Network', 'LoRaWAN'], ['2–15 km!', 'अति दूर'], ['Smart agriculture/city']],
            [['RFID · Radio Frequency Identification / NFC · Near Field Communication', '—'], ['cm – m', 'बहुत कम'], ['Tags, payments']],
          ]],
        ['table',
          [['Board', 'Board'], ['Type', 'प्रकार'], ['Strengths', 'ख़ूबी']],
          [
            [['Arduino Uno', 'Arduino'], ['Microcontroller board', 'microcontroller'], ['Real-time control, low power, ATmega328P']],
            [['Raspberry Pi', 'Raspberry Pi'], ['Single-board computer', 'computer'], ['Full Linux OS, Python, camera/GUI']],
          ]],
      ],
    },
    {
      id: 'applications-challenges',
      title: ['Applications & Challenges', 'अनुप्रयोग एवं चुनौतियाँ'],
      blocks: [
        ['ul', [
          ['Smart home (lights, locks) · Healthcare wearables · Smart agriculture (soil moisture) · Smart city (traffic, waste) · Industry 4.0.', 'Smart home · healthcare wearable · smart agriculture · smart city · Industry 4.0।'],
          ['Challenges: security & privacy of data, interoperability standards, power for billions of devices, e-waste.', 'चुनौतियाँ: security/privacy, interoperability, ऊर्जा, e-waste।'],
          ['Resource management layer includes hub, protocols and configuration management.', 'resource management में IoT hub, protocols और configuration management आते हैं।']],
        ],
      ],
    },
  ],
};
