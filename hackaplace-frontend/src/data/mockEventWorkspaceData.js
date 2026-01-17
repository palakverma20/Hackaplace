export const mockWorkspaceData = {
  'hack-1': {
    eventId: 'hack-1',
    eventName: "Hackaplace Innovation Challenge 2026",
    status: 'Ongoing', 
    phase: 'Submission', // Registration, TeamFormation, Submission, Evaluation, Completed
    timeline: {
        start: '2026-02-01',
        deadline: '2026-02-03',
        evaluation: '2026-02-05'
    },
    team: {
        id: 'team-alpha',
        name: 'Alpha Squad',
        code: 'ALPHA-2026',
        isLeader: true,
        members: [
            { id: 'u1', name: 'You (Alex)', email: 'alex@example.com', role: 'Leader' },
            { id: 'u2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'Member' },
            { id: 'u3', name: 'Mike Ross', email: 'm.ross@example.com', role: 'Member' }
        ]
    },
    chat: [
        { id: 1, sender: 'Sarah Chen', text: 'Started working on the frontend components.', time: '10:30 AM' },
        { id: 2, sender: 'Mike Ross', text: 'Backend API is almost ready for testing.', time: '11:15 AM' },
        { id: 3, sender: 'You', text: 'Great progress team! Lets sync at 2 PM.', time: '11:20 AM' }
    ],
    submission: {
        status: 'submitted', 
        history: null,
        pptFileName: 'Proposal_v1.pdf',
        pptUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        submittedData: {
            title: 'AgriTech IQ',
            description: 'IoT solution for smart farming monitoring soil moisture and automated irrigation.',
            techStack: 'React, Firebase, Arduino',
            repoLink: 'https://github.com/example/agritech',
            demoLink: 'https://youtube.com/watch?v=demo'
        }
    },
    evaluation: {
        mid: { feedback: 'Great concept, focus more on the UI.', score: '8/10' },
        final: null
    }
  },
  'hack-2': {
    eventId: 'hack-2',
    eventName: "AI for Social Good",
    status: 'Upcoming', 
    phase: 'TeamFormation',
    timeline: {
        start: '2026-03-15',
        deadline: '2026-03-17',
        evaluation: '2026-03-20'
    },
    team: {
        id: 'team-beta',
        name: 'Green AI',
        code: 'GREEN-AI-99',
        isLeader: false,
        members: [
            { id: 'u5', name: 'David Kim', email: 'david@example.com', role: 'Leader' },
            { id: 'u1', name: 'You (Alex)', email: 'alex@example.com', role: 'Member' }
        ]
    },
    chat: [
        { id: 1, sender: 'David Kim', text: 'Welcome to the team everyone!', time: 'Yesterday' }
    ],
    submission: { status: 'locked', history: null },
    evaluation: { mid: null, final: null }
  }
};
