import React from 'react';

const ProjectSubmission = ({ links, submissionDate }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>
       <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748' }}>Submission Details</h2>
       
       <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#718096' }}>
            Submitted on: {submissionDate || 'Not submitted yet'}
       </div>

       <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {links && links.github && (
                <a href={links.github} target="_blank" rel="noopener noreferrer" style={{ color: '#5a67d8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                    <span>📦</span> Github Repository ↗
                </a>
            )}
            {links && links.demo && (
                <a href={links.demo} target="_blank" rel="noopener noreferrer" style={{ color: '#5a67d8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                    <span>🚀</span> Live Demo ↗
                </a>
            )}
            {links && links.video && (
                <a href={links.video} target="_blank" rel="noopener noreferrer" style={{ color: '#5a67d8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                    <span>📺</span> Pitch Video ↗
                </a>
            )}
            {(!links || (!links.github && !links.demo && !links.video)) && <p style={{color: '#718096'}}>No links submitted.</p>}
       </div>

       <button style={{ 
           width: '100%', 
           marginTop: '1.5rem', 
           padding: '0.5rem', 
           backgroundColor: '#f7fafc', 
           border: '1px solid #cbd5e0', 
           borderRadius: '4px', 
           color: '#4a5568', 
           cursor: 'pointer',
           fontWeight: '600'
        }}>
           Edit Submission
       </button>
    </div>
  );
};

export default ProjectSubmission;