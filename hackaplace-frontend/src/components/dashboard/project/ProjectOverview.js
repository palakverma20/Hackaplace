import React from 'react';

const Section = ({ title, content }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748', marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ color: '#4a5568', lineHeight: '1.6' }}>{content}</p>
  </div>
);

const ProjectOverview = ({ project }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', color: '#2d3748' }}>Overview</h2>
      
      <Section title="Description" content={project.description} />
      <Section title="Problem Statement" content={project.problem} />
      <Section title="Solution" content={project.solution} />

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748', marginBottom: '0.5rem' }}>Tech Stack</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {project.techStack.map(tech => (
                <span key={tech} style={{ backgroundColor: '#EDF2F7', padding: '0.25rem 0.5rem', borderRadius: '4px', color: '#4A5568', fontSize: '0.9rem' }}>
                    {tech}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;