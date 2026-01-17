import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockOrganizerHackathons, mockTeams } from '../../../data/mockOrganizerData';

const OrganizerParticipants = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State to manage view hierarchy: 'hackathons' -> 'teams'
  const [viewMode, setViewMode] = useState('hackathons'); 
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  // Resume state if navigating back
  useEffect(() => {
    if (location.state?.selectedHackathonId) {
        const hackathon = mockOrganizerHackathons.find(h => h.id === location.state.selectedHackathonId);
        if (hackathon) {
            setSelectedHackathon(hackathon);
            setViewMode('teams');
        }
    }
  }, [location.state]);

  const handleHackathonSelect = (hackathon) => {
    setSelectedHackathon(hackathon);
    setViewMode('teams');
  };

  const handleBackToHackathons = () => {
    setSelectedHackathon(null);
    setViewMode('hackathons');
  };

  // --- SUB-COMPONENT: HACKATHON LIST ---
  const HackathonList = () => (
    <div className="dashboard-grid">
        {mockOrganizerHackathons.map(h => (
            <div key={h.id} className="project-card">
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className={`status-badge ${h.status === 'Ongoing' ? 'badge-green' : 'badge-gray'}`}>{h.status}</span>
                 </div>
                 <h3>{h.name}</h3>
                 <div style={{ margin: '1rem 0', display: 'flex', gap: '2rem', color: '#666', fontSize: '0.9rem' }}>
                    <div>👥 {mockTeams.filter(t => t.hackathonId === h.id).length} Teams</div>
                    <div>📅 {new Date(h.startDate).toLocaleDateString()}</div>
                 </div>
                 <button 
                    className="btn-primary" 
                    style={{ width: '100%' }}
                    onClick={() => handleHackathonSelect(h)}
                 >
                    Manage Teams
                 </button>
            </div>
        ))}
    </div>
  );

  // --- SUB-COMPONENT: TEAM LIST ---
  const TeamList = () => {
      const teams = mockTeams.filter(t => t.hackathonId === selectedHackathon.id);
      
      return (
        <div>
            <button 
                onClick={handleBackToHackathons}
                style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}
            >
                ← Back to Hackathons
            </button>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3>Teams for: {selectedHackathon.name}</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <span className="status-badge badge-green">Active: {teams.filter(t => t.status === 'Active').length}</span>
                        <span className="status-badge badge-red">Disqualified: {teams.filter(t => t.status === 'Disqualified').length}</span>
                    </div>
                </div>

                {teams.length === 0 ? (
                    <p style={{ color: '#666', textAlign: 'center', margin: '2rem 0' }}>No teams registered yet.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f8f9fa', textAlign: 'left' }}>
                                <th style={{ padding: '0.75rem' }}>Team Name</th>
                                <th style={{ padding: '0.75rem' }}>Code</th>
                                <th style={{ padding: '0.75rem' }}>Leader</th>
                                <th style={{ padding: '0.75rem' }}>Size</th>
                                <th style={{ padding: '0.75rem' }}>Status</th>
                                <th style={{ padding: '0.75rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map(team => (
                                <tr key={team.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{team.name}</td>
                                    <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>{team.code}</td>
                                    <td style={{ padding: '0.75rem' }}>{team.leaderName}</td>
                                    <td style={{ padding: '0.75rem' }}>{team.memberCount}</td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <span className={`status-badge ${team.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                                            {team.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <button 
                                            className="btn-secondary" 
                                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                                            onClick={() => navigate(`/dashboard/organizer/participants/${selectedHackathon.id}/team/${team.id}`)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
      );
  };

  return (
    <DashboardLayout 
        role="organizer" 
        title="Participants Management" 
        subtitle="Manage teams and participants across your hackathons."
    >
        {viewMode === 'hackathons' ? <HackathonList /> : <TeamList />}
    </DashboardLayout>
  );
};

export default OrganizerParticipants;
