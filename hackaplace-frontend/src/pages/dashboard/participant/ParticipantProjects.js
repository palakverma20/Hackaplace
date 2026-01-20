import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProjectCard from '../../../components/dashboard/project/ProjectCard';
import { getProjects } from '../../../data/projectUtils';

function ParticipantProjects() {
  const navigate = useNavigate();
  const projects = getProjects();

  const handleViewDetails = (projectId) => {
    navigate(`/dashboard/participant/projects/${projectId}`);
  };

  return (
    <DashboardLayout
      role="participant"
      title="My Projects"
      subtitle="Manage and track your hackathon submissions"
    >
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '0.5rem' }}>My Projects</h1>
          <p style={{ color: '#718096' }}>Manage and track your hackathon submissions</p>
        </div>

        {projects.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {projects.map((project) => (
                <ProjectCard
                key={project.projectId}
                project={project}
                onViewDetails={() => handleViewDetails(project.projectId)}
                />
            ))}
            </div>
        ) : (
             <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: '8px', border: '1px dashed #e2e8f0' }}>
                 <p style={{ color: '#a0aec0', fontSize: '1.2rem' }}>You haven't submitted any projects yet.</p>
                 <button onClick={() => navigate('/dashboard/participant/external')} className="btn-primary" style={{ marginTop: '1rem' }}>
                     Find Hackathons to Join
                 </button>
             </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ParticipantProjects;
