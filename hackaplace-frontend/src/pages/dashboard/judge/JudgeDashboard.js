import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import DashboardCard from '../../../components/dashboard/DashboardCard';
import { mockJudgeStats } from '../../../data/mockJudgeData';

const JudgeDashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout 
      role="judge" 
      title="Judge Dashboard" 
      subtitle="Evaluate projects and provide feedback."
    >
      <section className="dashboard-section">
        <h2 className="section-title">Overview</h2>
        <div className="dashboard-grid">
           <DashboardCard 
            title="Assigned Hackathons" 
            stat={mockJudgeStats.assignedHackathons}
            icon="📅"
          />
          <DashboardCard 
            title="Pending Evaluations" 
            stat={mockJudgeStats.pendingEvaluations}
            icon="⚖️"
          />
          <DashboardCard 
            title="Completed" 
            stat={mockJudgeStats.completedEvaluations}
            icon="✅"
          />
           <DashboardCard 
            title="Avg Score Given" 
            stat={mockJudgeStats.averageScoreGiven}
            icon="📊"
          />
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="dashboard-grid">
          <DashboardCard 
            title="Start Evaluation" 
            description="Go to your queue and start reviewing pending projects."
            icon="🚀"
            onClick={() => navigate('/dashboard/judge/evaluations')}
          />
          <DashboardCard 
            title="View Assignments" 
            description="See all hackathons you are assigned to judge."
            icon="📋"
            onClick={() => navigate('/dashboard/judge/hackathons')}
          />
          <DashboardCard 
            title="Evaluation History" 
            description="Review your past scores and feedback."
            icon="history_edu"
            onClick={() => navigate('/dashboard/judge/completed')}
          />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default JudgeDashboard;
