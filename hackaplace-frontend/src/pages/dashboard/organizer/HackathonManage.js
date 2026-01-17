import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockOrganizerHackathons, mockParticipants, mockSubmissions } from '../../../data/mockOrganizerData';

const HackathonManage = () => {
  const { hackathonId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the hackathon data (mock)
  const hackathon = mockOrganizerHackathons.find(h => h.id === hackathonId) || mockOrganizerHackathons[0];

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="dashboard-grid">
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <h3>Event Status: <span className="status-badge badge-green">{hackathon.status}</span></h3>
              <p>{hackathon.description}</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem' }}>
                 <div><strong>Starts:</strong> {hackathon.startDate}</div>
                 <div><strong>Ends:</strong> {hackathon.endDate}</div>
              </div>
            </div>
            <div className="card">
               <h4>Quick Stats</h4>
               <p>Registrations: {hackathon.registrationCount}</p>
               <p>Submissions: {hackathon.submissionCount}</p>
            </div>
          </div>
        );
      case 'participants':
        return (
          <div className="card">
            <h3>Participants & Teams</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                <tr>
                  <th style={{ padding: '0.5rem' }}>Name</th>
                  <th style={{ padding: '0.5rem' }}>Team</th>
                  <th style={{ padding: '0.5rem' }}>Status</th>
                  <th style={{ padding: '0.5rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockParticipants.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>{user.name}</td>
                    <td style={{ padding: '0.5rem' }}>{user.team}</td>
                    <td style={{ padding: '0.5rem' }}><span className="status-badge badge-green">{user.status}</span></td>
                    <td style={{ padding: '0.5rem' }}>
                      <button className="btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'submissions':
        return (
          <div className="card">
            <h3>Submissions</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                <tr>
                  <th style={{ padding: '0.5rem' }}>Project Name</th>
                  <th style={{ padding: '0.5rem' }}>Team</th>
                  <th style={{ padding: '0.5rem' }}>Submitted At</th>
                  <th style={{ padding: '0.5rem' }}>Status</th>
                  <th style={{ padding: '0.5rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockSubmissions.map(sub => (
                  <tr key={sub.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem' }}>{sub.projectName}</td>
                    <td style={{ padding: '0.5rem' }}>{sub.teamName}</td>
                    <td style={{ padding: '0.5rem' }}>{new Date(sub.submittedAt).toLocaleDateString()}</td>
                    <td style={{ padding: '0.5rem' }}>{sub.status}</td>
                    <td style={{ padding: '0.5rem' }}>
                      <button className="btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <DashboardLayout role="organizer" title={hackathon.name} subtitle="Event Management Console">
      
      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid #ddd' }}>
        {['overview', 'participants', 'submissions', 'evaluations', 'settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.5rem 1.5rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === tab ? '3px solid #007bff' : '3px solid transparent',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              color: activeTab === tab ? '#007bff' : '#666',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderContent()}

    </DashboardLayout>
  );
};

export default HackathonManage;
