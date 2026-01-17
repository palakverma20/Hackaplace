import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockSubmissions } from '../../../data/mockOrganizerData';

const OrganizerSubmissions = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="organizer" title="Submissions" subtitle="Review incoming project submissions.">
      <div className="dashboard-content">
        {mockSubmissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {mockSubmissions.map((submission) => (
              <div key={submission.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>{submission.projectName}</h3>
                  <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>
                    <span style={{ marginRight: '1rem' }}>👤 {submission.teamName}</span>
                    <span>📅 {new Date(submission.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#95a5a6' }}>Hackathon: {submission.hackathonName}</div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', backgroundColor: submission.status === 'Submitted' ? '#e3f2fd' : '#fff3cd', color: submission.status === 'Submitted' ? '#1976d2' : '#856404' }}>{submission.status}</span>
                   <button onClick={() => navigate(`/dashboard/organizer/submissions/${submission.id}`)} style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default OrganizerSubmissions;
