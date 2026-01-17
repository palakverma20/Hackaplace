import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockAssignedHackathons } from '../../../data/mockJudgeData';

const JudgeAssignedHackathons = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ongoing': return 'badge-green';
      case 'Upcoming': return 'badge-blue';
      case 'Completed': return 'badge-gray';
      default: return 'badge-gray';
    }
  };

  return (
    <DashboardLayout role="judge" title="Assigned Hackathons" subtitle="View hackathons you are judging.">
      <div className="dashboard-grid">
        {mockAssignedHackathons.map((hackathon) => (
          <div key={hackathon.id} className="project-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span className={`status-badge ${getStatusBadge(hackathon.status)}`}>
                {hackathon.status}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Due: {new Date(hackathon.deadline).toLocaleDateString()}</span>
            </div>
            
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{hackathon.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Organizer: {hackathon.organizer}
            </p>
             <p style={{ color: '#333', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
              Phase: {hackathon.evaluationPhase}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.9rem', backgroundColor: '#f9f9f9', padding: '0.5rem', borderRadius: '4px' }}>
               <div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Submissions</div>
                  <strong>{hackathon.pendingCount + hackathon.completedCount + 10}</strong> {/* Simulated total */}
               </div>
               <div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Pending</div>
                  <strong>{hackathon.pendingCount}</strong>
               </div>
               <div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Completed</div>
                  <strong>{hackathon.completedCount}</strong>
               </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button 
                  className="btn-secondary" 
                  onClick={() => navigate(`/dashboard/judge/hackathons/${hackathon.id}/details`)}
              >
                  View Details
              </button>
              <button 
                  className="btn-primary" 
                  onClick={() => navigate('/dashboard/judge/evaluations')}
              >
                  Start Evaluation
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default JudgeAssignedHackathons;
