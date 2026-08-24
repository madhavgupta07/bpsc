export default {
  num: 5,
  title: ['Operating Systems', 'ऑपरेटिंग सिस्टम'],
  intro: [
    'The resource manager between hardware and user — processes, scheduling, memory and files.',
    'हार्डवेयर और उपयोगकर्ता के बीच संसाधन-प्रबंधक — प्रोसेस, शेड्यूलिंग, मेमोरी और फ़ाइलें।',
  ],
  sections: [
    {
      id: 'intro-os',
      title: ['What is an Operating System?', 'ऑपरेटिंग सिस्टम क्या है?'],
      blocks: [
        ['p',
          'An OS is system software that manages hardware resources and provides services to application programs (Linux, Windows, Android).',
          'OS एक system software है जो हार्डवेयर संसाधनों का प्रबंधन करता है और application programs को सेवाएँ देता है (Linux, Windows, Android)।'],
        ['pyq', {
          q: 'Which of the following is an example of system software?',
          opts: ['Linux', 'Windows', 'Both A and B', 'PowerPoint'],
          ans: 2,
          ex: ['Both Linux and Windows are operating systems = system software. PowerPoint is application software.',
               'Linux और Windows दोनों OS = system software हैं। PowerPoint application software है।'],
          src: 'Bihar STET C.S. · 18.09.2020 (Shift-I)',
        }],
        ['ul', [
          ['Functions: process management, memory management, file system, device I/O, security, user interface.', 'कार्य: process management, memory management, file system, device I/O, सुरक्षा, user interface।'],
          ['Types: batch, multiprogramming, time-sharing, real-time (RTOS – Real-Time Operating System), distributed, embedded.', 'प्रकार: batch, multiprogramming, time-sharing, real-time (RTOS – Real-Time Operating System), distributed, embedded।'],
        ]],
      ],
    },
    {
      id: 'processes',
      title: ['Processes & Threads', 'प्रोसेस एवं थ्रेड'],
      blocks: [
        ['ul', [
          ['Process states: New → Ready → Running → Waiting/Blocked → Terminated.', 'Process states: New → Ready → Running → Waiting/Blocked → Terminated।'],
          ['PCB (Process Control Block) stores PID (Process ID), state, PC, registers, memory info.', 'PCB में PID, state, PC, registers, memory जानकारी होती है।'],
          ['Thread = lightweight process inside a process sharing code/data/files but having its own stack.', 'Thread = process के भीतर हल्की इकाई; code/data shared, stack अलग।']],
        ],
      ],
    },
    {
      id: 'scheduling',
      title: ['CPU Scheduling Algorithms', 'CPU शेड्यूलिंग एल्गोरिद्म'],
      blocks: [
        ['table',
          [['Algorithm', 'एल्गोरिद्म'], ['Type', 'प्रकार'], ['Key point', 'मुख्य बात'], ['Drawback', 'दोष']],
          [
            [['FCFS · First Come First Serve', 'FCFS'], ['Non-preemptive', 'Non-preemptive'], ['First come first served (queue)', 'जो पहले आया'], ['Convoy effect', 'Convoy effect']],
            [['SJF · Shortest Job First', 'SJF'], ['Non-preemptive', 'Non-preemptive'], ['Minimum average waiting time ✓', 'न्यूनतम औसत प्रतीक्षा समय'], ['Starvation of long jobs', 'लंबे job भूखे']],
            [['SRTF · Shortest Remaining Time First', 'SRTF'], ['Preemptive SJF', 'Preemptive SJF'], ['Preempts on shorter arrival', 'छोटा job आते ही रोकता है'], ['More context switches', 'अधिक context switch']],
            [['Round Robin', 'Round Robin'], ['Preemptive', 'Preemptive'], ['Fixed time quantum, cyclic queue', 'निश्चित time quantum'], ['Quantum too big → FCFS-like', 'quantum बड़ा हो तो FCFS जैसा']],
            [['Priority', 'Priority'], ['Either', 'कोई भी'], ['Highest priority first; aging fixes starvation', 'उच्च प्राथमिकता पहले; aging से starvation हटती है'], ['Starvation', 'भुखमरी']],
          ]],
      ],
    },
    {
      id: 'deadlock',
      title: ['Deadlock', 'डेडलॉक'],
      blocks: [
        ['p',
          'A set of processes are blocked, each holding a resource and waiting for another’s.',
          'प्रक्रियाओं का ऐसा समूह जो अवरुद्ध है — प्रत्येक एक संसाधन पकड़े दूसरे की प्रतीक्षा कर रहा है।'],
        ['ul', [
          ['Coffman conditions (ALL four required): Mutual exclusion, Hold & Wait, No preemption, Circular wait.', 'Coffman शर्तें (चारों आवश्यक): Mutual exclusion, Hold & Wait, No preemption, Circular wait।'],
          ['Handling: Prevention (break a condition) · Avoidance (Banker’s algorithm) · Detection & Recovery · Ignorance (Ostrich).', 'समाधान: Prevention (शर्त तोड़ें) · Avoidance (Banker’s algorithm) · Detection/Recovery · Ignorance।'],
        ]],
        ['callout', 'warn',
          ["Banker's algorithm is deadlock AVOIDANCE — it grants a request only if the state stays safe.",
           "Banker's algorithm deadlock AVOIDANCE है — request तभी देता है जब state safe रहे।"]],
      ],
    },
    {
      id: 'memory-mgmt',
      title: ['Memory Management', 'मेमोरी प्रबंधन'],
      blocks: [
        ['table',
          [['Term', 'शब्द'], ['Meaning', 'अर्थ'], ['Fix', 'समाधान']],
          [
            [['Internal fragmentation', 'Internal fragmentation'], ['Wasted space INSIDE fixed-size block/page', 'fixed page के भीतर बर्बाद जगह'], ['Smaller pages', 'छोटे page']],
            [['External fragmentation', 'External fragmentation'], ['Free memory scattered in small holes', 'खाली स्मृति छोटे टुकड़ों में बिखरी'], ['Compaction / paging', 'Compaction/paging']],
            [['Thrashing', 'Thrashing'], ['Excessive paging; CPU busy swapping not working', 'अत्यधिक paging, CPU swap में ही'], ['Reduce multiprogramming / more RAM', 'multiprogramming घटाएँ']],
          ]],
        ['pyq', {
          q: 'What is compaction?',
          opts: ['A technique for overcoming internal fragmentation', 'A paging technique', 'A technique for overcoming external fragmentation', 'None of the above'],
          ans: 2,
          ex: ['Compaction shuffles memory contents to merge scattered free holes into one big block — cures external fragmentation.',
               'Compaction बिखरे होles को जोड़कर एक बड़ा free block बनाती है — external fragmentation का इलाज।'],
          src: 'BPSC TRE 3.0 Exam-2024',
        }],
        ['callout', 'def',
          ['Virtual memory: run programs larger than RAM using demand paging; only needed pages live in memory (page fault brings them in).',
           'Virtual memory: RAM से बड़े प्रोग्राम चलाने की तकनीक; आवश्यक page ही मेमोरी में लाए जाते हैं (page fault)।']],
      ],
    },
    {
      id: 'files-devices',
      title: ['File Systems & Device Management', 'फ़ाइल प्रणाली एवं उपकरण प्रबंधन'],
      blocks: [
        ['table',
          [['Disk scheduling', 'Disk scheduling'], ['Strategy', 'रणनीति'], ['Note', 'नोट']],
          [
            [['FCFS', 'FCFS'], ['Requests in arrival order', 'आने के क्रम में'], ['Simple, fair, slow', 'सरल पर धीमा']],
            [['SSTF · Shortest Seek Time First', 'SSTF'], ['Nearest request first', 'सबसे नज़दीकी request'], ['Starvation possible', 'starvation संभव']],
            [['SCAN (elevator)', 'SCAN'], ['Sweep end-to-end servicing', 'एक सिरे से दूसरे तक'], ['Like a lift', 'लिफ्ट जैसा']],
            [['C-SCAN', 'C-SCAN'], ['One-way sweep, jump back', 'एकदिशीय sweep, वापस कूद'], ['Uniform wait ✓', 'समान प्रतीक्षा']],
          ]],
      ],
    },
  ],
};
