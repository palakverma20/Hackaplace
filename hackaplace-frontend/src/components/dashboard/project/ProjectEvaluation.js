import React from 'react';

const ProjectEvaluation = ({ evaluations }) => {
  if (!evaluations || evaluations.length === 0) return (
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748' }}>Evaluations</h2>
        <p style={{ color: '#718096' }}>Evaluation results will be available soon.</p>
      </div>
  );

  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#2d3748' }}>Judge Feedback</h2>
      
      {evaluations.map((evalItem, index) => (
        <div key={index} style={{ marginBottom: '1.5rem', borderBottom: index !== evaluations.length - 1 ? '1px solid #edf2f7' : 'none', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: '#2d3748' }}>{evalItem.round}</span>
                <span style={{ fontWeight: 'bold', color: '#5a67d8' }}>{evalItem.score}</span>
            </div>
            <p style={{ color: '#4a5568', fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '0.5rem' }}>"{evalItem.feedback}"</p>
            <div style={{ fontSize: '0.8rem', color: '#a0aec0' }}>{evalItem.date}</div>
        </div>
      ))}
    </div>
  );
};

export default ProjectEvaluation;