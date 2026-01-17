import React from 'react';

const ProjectCard = ({ project, onViewDetails }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted': return 'status-submitted';
      case 'shortlisted': return 'status-shortlisted';
      case 'winner': return 'status-winner';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  const statusColors = {
    winner: { bg: '#c6f6d5', color: '#22543d' },
    shortlisted: { bg: '#bee3f8', color: '#2a4365' },
    submitted: { bg: '#edf2f7', color: '#2d3748' },
    ongoing: { bg: '#feebc8', color: '#744210' },
    default: { bg: '#edf2f7', color: '#2d3748' }
  };

  const statusStyle = statusColors[project.status.toLowerCase()] || statusColors.default;

  return (
    <div className="project-card" onClick={onViewDetails} style={{ cursor: 'pointer', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem', backgroundColor: 'white', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: statusStyle.bg, color: statusStyle.color }}>
          {project.status}
        </span>
        <span style={{ fontSize: '0.8rem', color: '#718096' }}>{project.teamType}</span>
      </div>
      
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#2d3748' }}>{project.title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '0.5rem' }}>
        <strong>Hackathon:</strong> {project.hackathonName}
      </p>
      
      <p style={{ fontSize: '0.95rem', color: '#4a5568', marginBottom: '1rem', lineHeight: '1.5', minHeight: '3rem' }}>
        {project.description.length > 80 
          ? project.description.substring(0, 80) + '...' 
          : project.description}
      </p>

      <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {project.techStack.map((tech, index) => (
          <span key={index} style={{ fontSize: '0.75rem', backgroundColor: '#edf2f7', color: '#4a5568', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{tech}</span>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', textAlign: 'right' }}>
        <span style={{ fontSize: '0.9rem', color: '#5a67d8', fontWeight: '600' }}>
          View Details →
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;