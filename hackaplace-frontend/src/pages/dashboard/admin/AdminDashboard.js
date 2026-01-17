import React from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import DashboardCard from '../../../components/dashboard/DashboardCard';

function AdminDashboard() {
  return (
    <DashboardLayout 
      role="admin" 
      title="Admin Control Panel" 
      subtitle="System-wide settings and analytics."
    >
      <section className="dashboard-section">
        <h2 className="section-title">Platform Stats</h2>
        <div className="dashboard-grid">
          <DashboardCard 
            title="Total Users" 
            stat="1,240"
            icon="👥"
          />
          <DashboardCard 
            title="Total Events" 
            stat="45"
            icon="📅"
          />
          <DashboardCard 
            title="Active Hackathons" 
            stat="8"
            icon="🔥"
          />
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">System Management</h2>
        <div className="dashboard-grid">
          <DashboardCard 
            title="Manage Users" 
            description="View, ban, or update user permissions."
            icon="👤"
            onClick={() => {}}
          />
          <DashboardCard 
            title="Platform Settings" 
            description="Configure global application settings."
            icon="⚙️"
            onClick={() => {}}
          />
          <DashboardCard 
            title="View Reports" 
            description="Check system logs and user reports."
            icon="⚠️"
            onClick={() => {}}
          />
        </div>
      </section>
    </DashboardLayout>
  );
}

export default AdminDashboard;
