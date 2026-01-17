import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectHeader = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: '2rem' }}>
      <button 
        onClick={() => navigate('/dashboard/participant/projects')}
        style={{ background: 'none', border: 'none', color: '#718096', cursor: 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        ← Back to Projects
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '0.5rem' }}>{project.title}</h1>
          <button 
             onClick={() => navigate(`/dashboard/participant/event/${project.hackathonId || '1'}`)}
             style={{ background: 'none', border: 'none', padding: 0, fontSize: '1.1rem', color: '#4a5568', cursor: 'pointer', textDecoration: 'underline', textAlign: 'left' }}
             title="Go to Event Workspace"
          >
              {project.hackathonName} ↗
          </button>
        </div>
        <div style={{ textAlign: 'right' }}>
             <span style={{ 
                display: 'inline-block',
                padding: '0.5rem 1rem', 
                borderRadius: '9999px', 
                fontWeight: 'bold', 
                backgroundColor: project.status === 'Winner' ? '#C6F6D5' : '#E2E8F0',
                color: project.status === 'Winner' ? '#22543D' : '#2D3748'
            }}>
                {project.status}
            </span>
             {project.status === 'Winner' && <span style={{ marginLeft: '0.5rem', fontSize: '1.5rem' }}>🏆</span>}
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;