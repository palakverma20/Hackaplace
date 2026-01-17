import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import DashboardCard from '../../../components/dashboard/DashboardCard';
import AnnouncementSection from '../../../components/workspace/AnnouncementSection';

function ParticipantHome() {
  const navigate = useNavigate();

  return (
    <DashboardLayout 
      role="participant" 
      title="Dashboard Home" 
      subtitle="Welcome back! Ready to explore?"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          <div>
            <section className="dashboard-section">
                <h2 className="section-title">Quick Actions</h2>
                <div className="dashboard-grid">
                <DashboardCard 
                    title="Join Hackathons" 
                    description="Browse and join internal events."
                    icon="🚀"
                    onClick={() => navigate('/dashboard/participant/internal-hackathons')}
                />
                <DashboardCard 
                    title="View Registered Events" 
                    description="Track events you are participating in."
                    icon="📅"
                    onClick={() => navigate('/dashboard/participant/registered-events')} 
                />
                <DashboardCard 
                    title="My Projects" 
                    description="Manage your hackathon submissions."
                    icon="🏆"
                    onClick={() => navigate('/dashboard/participant/projects')}
                />
                </div>
            </section>
          </div>
          <div>
            <AnnouncementSection />
          </div>
      </div>
    </DashboardLayout>
  );
}

export default ParticipantHome;

