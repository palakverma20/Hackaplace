import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import DashboardCard from '../../../components/dashboard/DashboardCard';

function ParticipantDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout 
      role="participant" 
      title="Welcome, Participant!" 
      subtitle="Ready to build something amazing today?"
    >
      <section className="dashboard-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="dashboard-grid">
          <DashboardCard 
            title="Find Hackathons" 
            description="Use AI to discover top upcoming hackathons from around the world."
            icon="🌍"
            onClick={() => navigate('/dashboard/participant/external')}
          />
          <DashboardCard 
            title="Registered Events" 
            description="View hackathons you have signed up for."
            icon="📅"
            onClick={() => navigate('/dashboard/participant/registered-events')} 
          />
          <DashboardCard 
            title="My Projects" 
            description="Manage your submissions and team details."
            icon="💻"
            onClick={() => navigate('/dashboard/participant/projects')}
          />
          <DashboardCard 
            title="Bookmarks" 
            description="Events you have saved for later."
            icon="🔖"
            onClick={() => navigate('/dashboard/participant/bookmarks')}
          />
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Upcoming Deadlines</h2>
        <div className="dashboard-grid">
           {/* Placeholder for future implementation */}
           <div style={{ padding: '1rem', color: '#666', fontStyle: 'italic' }}>
             No upcoming deadlines. You are all caught up!
           </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default ParticipantDashboard;
