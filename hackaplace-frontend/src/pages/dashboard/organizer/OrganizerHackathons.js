import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockOrganizerHackathons } from '../../../data/mockOrganizerData';

const OrganizerHackathons = () => {
  const navigate = useNavigate();
  const [hackathons] = useState(mockOrganizerHackathons);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Ongoing': return 'badge-green';
      case 'Upcoming': return 'badge-blue';
      case 'Completed': return 'badge-gray';
      case 'Draft': return 'badge-orange';
      default: return 'badge-gray';
    }
  };

  const handleManageClick = (id) => {
    navigate(`/dashboard/organizer/hackathon/${id}`);
  };

  return (
    <DashboardLayout 
      role="organizer" 
      title="My Hackathons" 
      subtitle="View and manage all your hackathons."
    >
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          className="btn-primary"
          onClick={() => navigate('/dashboard/organizer/create-hackathon')}
        >
          + Create New Hackathon
        </button>
      </div>

      <div className="dashboard-grid">
        {hackathons.map((hackathon) => (
          <div key={hackathon.id} className="project-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span className={`status-badge ${getStatusBadge(hackathon.status)}`}>
                {hackathon.status}
              </span>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>{hackathon.mode}</span>
            </div>
            
            <h3 style={{ margin: '0 0 0.5rem 0' }}>{hackathon.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {hackathon.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div>
                <strong>{hackathon.registrationCount}</strong> Registered
              </div>
              <div>
                <strong>{hackathon.submissionCount}</strong> Submissions
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button 
                className="btn-secondary"
                onClick={() => handleManageClick(hackathon.id)}
              >
                Manage
              </button>
              <button className="btn-secondary" style={{ backgroundColor: '#f0f0f0', border: 'none' }}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default OrganizerHackathons;
