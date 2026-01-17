export const mockOrganizerProfile = {
  name: 'Tech Corp Admin',
  email: 'admin@techcorp.com',
  username: 'techcorp_admin',
  organization: 'Tech Corp',
  website: 'https://techcorp.com',
  bio: 'We organize world class innovation hackathons aiming to solve real world problems.',
  contact: '123-456-7890',
  avatar: '' 
};

export const mockOrganizerHackathons = [
  {
    id: 'h1',
    name: 'Hackaplace Innovation Challenge 2026',
    status: 'Ongoing',
    registrationCount: 154,
    submissionCount: 12,
    mode: 'Online',
    startDate: '2026-02-01',
    endDate: '2026-02-03',
    currentPhase: 'Submission',
    description: 'A global hackathon to build the future of AI.'
  },
  {
    id: 'h2',
    name: 'Green Earth Hackathon',
    status: 'Upcoming',
    registrationCount: 45,
    submissionCount: 0,
    mode: 'Hybrid',
    startDate: '2026-03-15',
    endDate: '2026-03-17',
    currentPhase: 'Registration',
    description: 'Solve environmental challenges using technology.'
  },
  {
    id: 'h3',
    name: 'FinTech Revolution',
    status: 'Completed',
    registrationCount: 200,
    submissionCount: 45,
    mode: 'Offline',
    startDate: '2025-11-10',
    endDate: '2025-11-12',
    currentPhase: 'Completed',
    description: 'Revolutionizing the financial sector.'
  },
  {
    id: 'h4',
    name: 'EdTech for All',
    status: 'Draft',
    registrationCount: 0,
    submissionCount: 0,
    mode: 'Online',
    startDate: '2026-05-20',
    endDate: '2026-05-22',
    currentPhase: 'Draft',
    description: 'Making education accessible to everyone.'
  }
];

export const mockParticipants = [
  { id: 'p1', name: 'Alice Johnson', email: 'alice@example.com', teamId: 't1', hackathonId: 'h1', role: 'Leader', status: 'Active' },
  { id: 'p2', name: 'Bob Smith', email: 'bob@example.com', teamId: 't1', hackathonId: 'h1', role: 'Member', status: 'Active' },
  { id: 'p3', name: 'Charlie Brown', email: 'charlie@example.com', teamId: 't2', hackathonId: 'h1', role: 'Leader', status: 'Active' },
  { id: 'p4', name: 'Diana Prince', email: 'diana@example.com', teamId: 't3', hackathonId: 'h1', role: 'Leader', status: 'Active' },
];

export const mockTeams = [
  { id: 't1', name: 'CodeWizards', code: 'CW2026', hackathonId: 'h1', leaderName: 'Alice Johnson', memberCount: 2, status: 'Active' },
  { id: 't2', name: 'SoloDev', code: 'SD001', hackathonId: 'h1', leaderName: 'Charlie Brown', memberCount: 1, status: 'Active' },
  { id: 't3', name: 'WonderTeam', code: 'WT999', hackathonId: 'h1', leaderName: 'Diana Prince', memberCount: 1, status: 'Disqualified' },
];

export const mockSubmissions = [
  {
    id: 's1',
    projectId: 'proj1',
    projectName: 'AI Tutor',
    hackathonName: 'Hackaplace Innovation Challenge 2026',
    teamName: 'CodeWizards',
    submittedAt: '2026-02-02T14:30:00',
    status: 'Submitted',
    score: null,
    description: 'An AI-powered personalized learning assistant that adapts to student pace and style.',
    problem: 'Traditional education systems often fail to cater to individual learning speeds.',
    solution: 'Our platform uses machine learning to analyze student performance in real-time.',
    techStack: ['React', 'Python', 'TensorFlow'],
    repoLink: 'https://github.com/codewizards/aitutor',
    demoLink: 'https://aitutor.demo.com',
    videoLink: 'https://youtube.com/watch?v=xyz',
    pptFileName: 'AI_Tutor_Pitch_Deck.pdf',
    pptFileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    files: [
      { name: 'architecture_diagram.png', url: '#' }
    ]
  },
  {
    id: 's2',
    projectId: 'proj2',
    projectName: 'EcoTracker',
    hackathonName: 'Hackaplace Innovation Challenge 2026',
    teamName: 'GreenTeam',
    submittedAt: '2026-02-02T16:45:00',
    status: 'Under Review',
    score: 85,
    description: 'Mobile app to track carbon footprint and suggest eco-friendly alternatives.',
    problem: 'People want to reduce their environmental impact but lack accessible tools.',
    solution: 'A mobile application that tracks user habits and calculates carbon footprint.',
    techStack: ['Flutter', 'Firebase'],
    repoLink: 'https://github.com/greenteam/ecotracker',
    demoLink: 'https://ecotracker.demo.com',
    videoLink: null,
    files: [
      { name: 'demo_video.mp4', url: '#' }
    ]
  }
];

export const mockOrganizerStats = {
  totalHackathons: 12,
  activeHackathons: 3,
  totalParticipants: 845,
  totalTeams: 120,
  submissionsReceived: 45
};



export const mockEvaluationConfig = {
  'h1': {
    rounds: [
      {
        id: 'round-mid',
        name: 'Mid Evaluation',
        status: 'Active',
        criteria: [
           { id: 'c1', name: 'Innovation', maxScore: 10 },
           { id: 'c2', name: 'Feasibility', maxScore: 10 }
        ]
      },
      {
        id: 'round-final',
        name: 'Final Evaluation',
        status: 'Pending',
        criteria: [
           { id: 'c1', name: 'Innovation', maxScore: 10 },
           { id: 'c2', name: 'Feasibility', maxScore: 10 },
           { id: 'c3', name: 'UI/UX', maxScore: 10 },
           { id: 'c4', name: 'Presentation', maxScore: 10 }
        ]
      }
    ]
  }
};

export const mockAnnouncements = [
  {
    id: 'a1',
    title: 'Welcome to Hackaplace Innovation Challenge!',
    content: 'We are excited to have you all here. The opening ceremony starts at 10 AM.',
    date: '2026-01-15T09:00:00',
    type: 'Global', 
    author: 'Tech Corp Admin',
    hackathonId: null
  },
  {
    id: 'a2',
    title: 'Submission Deadline Extended',
    content: 'Due to popular demand, we are extending the submission deadline by 2 hours.',
    date: '2026-01-16T14:00:00',
    type: 'Event',
    author: 'Tech Corp Admin',
    hackathonId: 'h1'
  }
];
