import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import DashboardCard from '../../../components/dashboard/DashboardCard';
import { mockOrganizerStats } from '../../../data/mockOrganizerData';

function OrganizerDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout 
      role="organizer" 
      title="Organizer Dashboard" 
      subtitle="Manage your hackathons and track participant progress."
    >
      <section className="dashboard-section">
        <h2 className="section-title">Overview</h2>
        <div className="dashboard-grid">
          <DashboardCard 
            title="Total Hackathons" 
            stat={mockOrganizerStats.totalHackathons}
            icon="🚀"
          />
          <DashboardCard 
            title="Active Events" 
            stat={mockOrganizerStats.activeHackathons}
            icon="🟢"
          />
          <DashboardCard 
            title="Total Participants" 
            stat={mockOrganizerStats.totalParticipants}
            icon="👥"
          />
           <DashboardCard 
            title="Total Teams" 
            stat={mockOrganizerStats.totalTeams}
            icon="🛡️"
          />
           <DashboardCard 
            title="Submissions" 
            stat={mockOrganizerStats.submissionsReceived}
            icon="📥"
          />
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Management Actions</h2>
        <div className="dashboard-grid">
          <DashboardCard 
            title="Create Hackathon" 
            description="Launch a new event and set up challenges."
            icon="➕"
            onClick={() => navigate('/dashboard/organizer/create-hackathon')}
          />
          <DashboardCard 
            title="My Hackathons" 
            description="View and manage your existing events."
            icon="📋"
            onClick={() => navigate('/dashboard/organizer/hackathons')}
          />
          <DashboardCard 
            title="Submissions" 
            description="Review project submissions from participants."
            icon="👀"
            onClick={() => navigate('/dashboard/organizer/submissions')}
          />
        </div>
      </section>
    </DashboardLayout>
  );
}

export default OrganizerDashboard;
