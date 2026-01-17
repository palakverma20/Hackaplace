import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockParticipants, mockTeams, mockOrganizerHackathons } from '../../../data/mockOrganizerData';

const OrganizerTeamDetails = () => {
    const { hackathonId, teamId } = useParams();
    const navigate = useNavigate();

    // Data State (Simulate fetching)
    const hackathon = mockOrganizerHackathons.find(h => h.id === hackathonId);
    const [team, setTeam] = useState(mockTeams.find(t => t.id === teamId));
    const [teamMembers, setTeamMembers] = useState(mockParticipants.filter(p => p.teamId === teamId));

    if (!team || !hackathon) return <div>Data not found</div>;

    const getStatusBadge = (status) => {
        if (status === 'Active') return 'badge-green';
        if (status === 'Disqualified') return 'badge-red';
        return 'badge-gray';
    };

    const handleDisqualifyTeam = () => {
        if (window.confirm(`Are you sure you want to DISQUALIFY team "${team.name}"? This will block submissions and evaluation.`)) {
            setTeam(prev => ({ ...prev, status: 'Disqualified' }));
            // Also disqualify all members (visually)
            setTeamMembers(prev => prev.map(m => ({ ...m, status: 'Disqualified' })));
        }
    };

    const handleDisqualifyParticipant = (participantId) => {
         if (window.confirm("Are you sure you want to disqualify this participant?")) {
            setTeamMembers(prev => prev.map(p => 
                p.id === participantId ? { ...p, status: 'Disqualified' } : p
            ));
         }
    };

    return (
        <DashboardLayout role="organizer" title="Team Details" subtitle={`${team.name} (${hackathon.name})`}>
            
            <div style={{ marginBottom: '1rem' }}>
                <span 
                    onClick={() => navigate('/dashboard/organizer/participants')} 
                    style={{ cursor: 'pointer', color: '#007bff', marginRight: '0.5rem' }}
                >
                    Hackathons
                </span>
                / 
                <span 
                    onClick={() => navigate('/dashboard/organizer/participants', { state: { selectedHackathonId: hackathonId } })} 
                    style={{ cursor: 'pointer', color: '#007bff', margin: '0 0.5rem' }}
                >
                    Teams
                </span>
                / {team.name}
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ margin: 0 }}>{team.name} <span style={{ fontSize: '1rem', color: '#666', fontWeight: 'normal' }}>({team.code})</span></h2>
                        <p style={{ marginTop: '0.5rem', color: '#666' }}>Leader: {team.leaderName}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                             <span className={`status-badge ${getStatusBadge(team.status)}`}>{team.status}</span>
                        </div>
                        {team.status === 'Active' && (
                             <button 
                                className="btn-secondary" 
                                style={{ color: 'red', borderColor: 'red' }}
                                onClick={handleDisqualifyTeam}
                             >
                                 Disqualify Team
                             </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="card">
                <h3>Team Members ({teamMembers.length})</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                         <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem' }}>Name</th>
                            <th style={{ padding: '0.75rem' }}>Role</th>
                            <th style={{ padding: '0.75rem' }}>Email</th>
                            <th style={{ padding: '0.75rem' }}>Status</th>
                            <th style={{ padding: '0.75rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembers.map(member => (
                            <tr key={member.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '0.75rem' }}>{member.name}</td>
                                <td style={{ padding: '0.75rem' }}>{member.role}</td>
                                <td style={{ padding: '0.75rem' }}>{member.email}</td>
                                <td style={{ padding: '0.75rem' }}>
                                    <span className={`status-badge ${getStatusBadge(member.status)}`}>
                                        {member.status}
                                    </span>
                                </td>
                                <td style={{ padding: '0.75rem' }}>
                                    {member.status === 'Active' && team.status === 'Active' && (
                                        <button 
                                            style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                                            onClick={() => handleDisqualifyParticipant(member.id)}
                                        >
                                            Disqualify
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </DashboardLayout>
    );
};

export default OrganizerTeamDetails;
