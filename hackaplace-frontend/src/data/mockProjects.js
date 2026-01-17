export const mockProjects = [
  {
    projectId: '1',
    hackathonId: '101',
    title: 'EduLearn AI',
    hackathonName: 'Global AI Summit 2024',
    teamType: 'Team',
    status: 'Winner',
    submittedOn: '2025-12-15',
    techStack: ['React', 'Python', 'TensorFlow'],
    description: 'An AI-powered personalized learning assistant that adapts to student pace and style.',
    problem: 'Traditional education systems often fail to cater to individual learning speeds and styles, leaving faster students bored and slower students struggling.',
    solution: 'Our platform uses machine learning to analyze student performance in real-time and dynamically adjust the curriculum, providing personalized resources and quizzes. We integrated a dashboard for teachers to monitor student anxiety levels using sentiment analysis.',
    teamMembers: [
      { name: 'Alex Johnson', role: 'Frontend Dev', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=random' },
      { name: 'Sam Smith', role: 'Data Scientist', avatar: 'https://ui-avatars.com/api/?name=Sam+Smith&background=random' },
      { name: 'You', role: 'Backend Dev', avatar: 'https://ui-avatars.com/api/?name=Acer&background=random' }
    ],
    links: {
      github: 'https://github.com/example/edulearn',
      demo: 'https://edulearn.demo.com',
      video: 'https://youtube.com/watch?v=example'
    },
    evaluations: [
      { round: 'Round 1 (Mentorship)', score: '8.5/10', feedback: 'Great concept, but clarify the revenue model.', date: '2025-12-10' },
      { round: 'Final Round', score: '9.5/10', feedback: 'Excellent execution and presentation. The demo was flawless.', date: '2025-12-15' }
    ],
    timeline: [
      { event: 'Project Created', date: '2025-12-01' },
      { event: 'Team Formed', date: '2025-12-02' },
      { event: 'Round 1 Submission', date: '2025-12-10' },
      { event: 'Final Submission', date: '2025-12-15' },
      { event: 'Won 1st Prize 🏆', date: '2025-12-16' }
    ]
  },
  {
    projectId: '2',
    hackathonId: '102',
    title: 'GreenEarth Tracker',
    hackathonName: 'Sustainability Hack',
    teamType: 'Solo',
    status: 'Shortlisted',
    submittedOn: '2026-01-10',
    techStack: ['Flutter', 'Firebase'],
    description: 'Mobile app to track carbon footprint and suggest eco-friendly alternatives.',
    problem: 'People want to reduce their environmental impact but lack accessible, easy-to-use tools to measure and improve their daily choices.',
    solution: 'A mobile application that tracks user habits, calculates carbon footprint, and gamifies the experience of reducing it through challenges and rewards.',
    teamMembers: [
      { name: 'You', role: 'Full Stack Dev', avatar: 'https://ui-avatars.com/api/?name=Acer&background=random' }
    ],
    links: {
      github: 'https://github.com/example/greenearth',
      demo: null,
      video: 'https://youtube.com/watch?v=example2'
    },
    evaluations: [
         { round: 'Idea Phase', score: '7/10', feedback: 'Good potential. Needs more unique features.', date: '2026-01-05' }
    ],
    timeline: [
      { event: 'Project Created', date: '2026-01-03' },
      { event: 'Submission', date: '2026-01-10' },
      { event: 'Shortlisted', date: '2026-01-12' }
    ]
  },
  {
    projectId: '3',
    hackathonId: '103',
    title: 'CryptoVault',
    hackathonName: 'Web3 Future',
    teamType: 'Team',
    status: 'Submitted',
    submittedOn: '2026-01-14',
    techStack: ['Solidity', 'Next.js', 'Hardhat'],
    description: 'A decentralized secure vault for digital assets with social recovery.',
    problem: 'Self-custody of crypto assets is risky; losing keys means losing funds forever. Social recovery wallets are often complex to set up.',
    solution: 'CryptoVault simplifies social recovery using a DAO-based guardian system, allowing users to recover their funds without compromising security.',
    teamMembers: [
       { name: 'You', role: 'Smart Contract Dev', avatar: 'https://ui-avatars.com/api/?name=Acer&background=random' },
       { name: 'Maria Garcia', role: 'Frontend Dev', avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=random' }
    ],
    links: {
      github: 'https://github.com/example/cryptovault',
      demo: 'https://cryptovault.app',
      video: null
    },
    evaluations: [],
    timeline: [
        { event: 'Project Created', date: '2026-01-12' },
        { event: 'Submission', date: '2026-01-14' }
    ]
  },
    {
      projectId: '4',
      hackathonId: '104',
      title: 'MediConnect',
      hackathonName: 'HealthTech 2026',
      teamType: 'Team',
      status: 'Ongoing',
      submittedOn: null,
      techStack: ['Angular', 'Node.js', 'MongoDB'],
      description: 'Telemedicine platform connecting rural patients with urban specialists.',
      problem: 'Access to specialized healthcare is severely limited in rural areas due to geographical barriers and shortage of doctors.',
      solution: 'A video-conferencing platform designed for low-bandwidth areas, integrating with digital diagnostic tools to enable remote consultations. We use WebRTC for seamless communication.',
      teamMembers: [
          { name: 'You', role: 'Backend', avatar: 'https://ui-avatars.com/api/?name=Acer&background=random' },
          { name: 'John Doe', role: 'Frontend', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random' }
      ],
      links: {
          github: 'https://github.com/example/mediconnect',
          demo: null,
          video: null
      },
      evaluations: [],
      timeline: [
          { event: 'Project Created', date: '2026-01-15' }
      ]
  }
];