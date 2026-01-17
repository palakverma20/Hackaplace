import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockEvaluationConfig, mockOrganizerHackathons, mockSubmissions } from '../../../data/mockOrganizerData';

const OrganizerHackathonEvaluations = () => {
    const { hackathonId } = useParams();
    const navigate = useNavigate();
    const config = mockEvaluationConfig[hackathonId];
    const hackathon = mockOrganizerHackathons.find(h => h.id === hackathonId);
    
    // Default to the first round if config exists
    const [activeRound, setActiveRound] = useState(config?.rounds[0]?.id || '');

    useEffect(() => {
        if (config?.rounds?.length > 0 && !activeRound) {
            setActiveRound(config.rounds[0].id);
        }
    }, [config, activeRound]);


    if (!hackathon) return <div>Hackathon not found</div>;
    if (!config) return (
            <DashboardLayout role="organizer" title="Evaluations" subtitle={hackathon.name}>
                <div className="card">No evaluation configuration found for this hackathon.</div>
            </DashboardLayout>
        );

    const currentRound = config.rounds.find(r => r.id === activeRound);

    // Mock aggregated scores logic
    // In a real app, you would fetch evaluations for this hackathon and round,
    // group them by submission/team, and averaging the scores.
    const submissionsWithScores = mockSubmissions
        .filter(s => s.hackathonName === hackathon.name) // Using name match as mockSubmissions has name mocked. In real app use ID.
        .map(sub => {
            // Generate dummy scores based on criteria
            const dummyScores = {};
            let totalScore = 0;
            currentRound.criteria.forEach(c => {
                const score = Math.floor(Math.random() * (c.maxScore - 5) + 5); // Random score 5-10
                dummyScores[c.id] = score;
                totalScore += score;
            });

            return {
                ...sub,
                roundScores: dummyScores,
                totalScore: totalScore
            };
        });

    return (
        <DashboardLayout role="organizer" title="Evaluations" subtitle={hackathon.name}>
             {/* Round Tabs */}
             <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #ddd' }}>
                {config.rounds.map(round => (
                    <button
                        key={round.id}
                        onClick={() => setActiveRound(round.id)}
                        style={{
                            padding: '1rem 2rem',
                            border: 'none',
                            background: activeRound === round.id ? '#fff' : 'transparent',
                            borderBottom: activeRound === round.id ? '2px solid #007bff' : 'none',
                            fontWeight: activeRound === round.id ? 'bold' : 'normal',
                            cursor: 'pointer',
                            color: activeRound === round.id ? '#007bff' : '#666'
                        }}
                    >
                        {round.name} <span style={{fontSize: '0.8em', background: round.status === 'Active' ? '#28a745' : '#ccc', color: '#fff', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px'}}>{round.status}</span>
                    </button>
                ))}
            </div>

            {/* Submissions Table */}
            <div className="card">
                <h3>{currentRound.name} Results</h3>
                <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Team</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Project</th>
                                {currentRound.criteria.map(c => (
                                    <th key={c.id} style={{ padding: '12px', textAlign: 'center' }}>{c.name} (Max {c.maxScore})</th>
                                ))}
                                <th style={{ padding: '12px', textAlign: 'center' }}>Total</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissionsWithScores.map(sub => (
                                <tr key={sub.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>{sub.teamName}</td>
                                    <td style={{ padding: '12px' }}>{sub.projectName}</td>
                                    {currentRound.criteria.map(c => (
                                        <td key={c.id} style={{ padding: '12px', textAlign: 'center' }}>
                                            {sub.roundScores[c.id]}
                                        </td>
                                    ))}
                                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                                        {sub.totalScore}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <button 
                                            className="btn-secondary" 
                                            style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                                            onClick={() => navigate(`/dashboard/organizer/evaluations/${hackathonId}/submission/${sub.id}`)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default OrganizerHackathonEvaluations;
