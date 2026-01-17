import React from 'react';

const EvaluationSection = ({ evaluation }) => {
  if (!evaluation.mid && !evaluation.final) {
      return (
        <div className="card" style={{ textAlign: 'center', padding: '2rem', borderLeft: '4px solid #ecc94b' }}>
            <h3 style={{ color: '#d69e2e', margin: 0 }}>Evaluation Pending</h3>
            <p style={{ color: '#718096', marginTop: '0.5rem' }}>Judges are reviewing submissions. Feedback will appear here shortly.</p>
        </div>
      );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {evaluation.mid && (
            <div className="card" style={{ borderLeft: '4px solid #4299e1' }}>
                <h3 style={{ color: '#2b6cb0', marginBottom: '1rem' }}>📋 Mid-Evaluation Feedback</h3>
                <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>"{evaluation.mid.feedback}"</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#4a5568' }}>
                    <span><strong>Score:</strong> {evaluation.mid.score}</span>
                </div>
            </div>
        )}

        {evaluation.final && (
            <div className="card" style={{ borderLeft: '4px solid #805ad5' }}>
                 <h3 style={{ color: '#6b46c1', marginBottom: '1rem' }}>🏆 Final Results</h3>
                  {/* Placeholder for Final Result UI */}
                 <p>Results pending...</p>
            </div>
        )}
    </div>
  );
};

export default EvaluationSection;
