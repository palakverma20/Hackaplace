import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockOrganizerHackathons } from '../../../data/mockOrganizerData';

const OrganizerEvaluations = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="organizer" title="Evaluations" subtitle="Manage evaluations for your hackathons.">
      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {mockOrganizerHackathons.map(hackathon => (
          <div key={hackathon.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem' }}>{hackathon.name}</h3>
              <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: '#e2e8f0', fontSize: '0.8rem' }}>{hackathon.status}</span>
            </div>
            
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
               <p>Current Phase: <strong>{hackathon.currentPhase}</strong></p>
               <p>Submissions: {hackathon.submissionCount}</p>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button 
                className="btn-primary" 
                style={{ width: '100%' }}
                onClick={() => navigate(`/dashboard/organizer/evaluations/${hackathon.id}`)}
              >
                View Evaluations
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default OrganizerEvaluations;
