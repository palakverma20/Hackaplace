export const mockJudgeProfile = {
  name: 'Jane Doe',
  email: 'jane.judge@example.com',
  username: 'jane_judge',
  expertise: 'AI, Machine Learning, Data Science',
  contact: '987-654-3210',
  bio: 'Senior Data Scientist with 10 years of experience in AI.',
  avatar: ''
};

export const mockJudgeStats = {
  assignedHackathons: 3,
  pendingEvaluations: 5,
  completedEvaluations: 12,
  averageScoreGiven: 8.5
};

export const mockAssignedHackathons = [
  {
    id: 'hack-1',
    name: 'Hackaplace Innovation Challenge 2026',
    organizer: 'Hackaplace Tech Team',
    status: 'Ongoing',
    evaluationPhase: 'Mid Evaluation',
    pendingCount: 3,
    completedCount: 5,
    deadline: '2026-02-05'
  },
  {
    id: 'hack-2',
    name: 'AI for Social Good',
    organizer: 'AI Foundation',
    status: 'Upcoming',
    evaluationPhase: 'Pending Start',
    pendingCount: 0,
    completedCount: 0,
    deadline: '2026-03-20'
  }
];

export const mockEvaluationQueue = [
  {
    id: 'e1',
    submissionId: 's1',
    projectId: 'proj1',
    hackathonName: 'Hackaplace Innovation Challenge 2026',
    hackathonId: 'h1',
    phase: 'Mid Evaluation',
    teamName: 'CodeWizards',
    projectName: 'AI Tutor',
    description: 'An AI-powered tutor for students that adapts to their learning pace.',
    repoLink: 'https://github.com/codewizards/aitutor',
    demoLink: 'https://aituror.demo.com',
    pptLink: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    status: 'Pending',
    assignedDate: '2026-02-03'
  },
  {
    id: 'e2',
    submissionId: 's2',
    projectId: 'proj2',
    hackathonName: 'Hackaplace Innovation Challenge 2026',
    hackathonId: 'h1',
    phase: 'Mid Evaluation',
    teamName: 'GreenTeam',
    projectName: 'EcoTracker',
    description: 'IoT based solution to track carbon footprint in real-time.',
    repoLink: 'https://github.com/greenteam/ecotracker',
    demoLink: 'https://ecotracker.iot',
    pptLink: null,
    status: 'Pending',
    assignedDate: '2026-02-03'
  }
];

export const mockCompletedEvaluations = [
  {
    id: 'e10',
    submissionId: 's10',
    hackathonId: 'h1',
    phase: 'Mid Evaluation',
    projectName: 'Legacy Converter',
    teamName: 'OldTimers',
    score: 17,
    feedback: 'Great technical implementation. The UI could be improved.',
    completedAt: '2026-02-01',
    scores: {
      c1: 8,
      c2: 9
    }
  }
];
