import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockEvaluationQueue } from '../../../data/mockJudgeData';

const JudgeEvaluations = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="judge" title="Pending Evaluations" subtitle="Projects waiting for your review.">
      {mockEvaluationQueue.length === 0 ? (
          <div className="card">No pending evaluations. Great job!</div>
      ) : (
          <div className="dashboard-grid">
            {mockEvaluationQueue.map((item) => (
              <div key={item.id} className="project-card">
                 <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                   {item.hackathonName}
                 </div>
                 <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.projectName}</h3>
                 <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>Team: {item.teamName}</p>
                 <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                   {item.description}
                 </p>
                 <button 
                    className="btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => navigate(`/dashboard/judge/project/${item.submissionId}`)}
                 >
                    Evaluate Now
                 </button>
              </div>
            ))}
          </div>
      )}
    </DashboardLayout>
  );
};

export default JudgeEvaluations;
