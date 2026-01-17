import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProjectHeader from '../../../components/dashboard/project/ProjectHeader';
import ProjectOverview from '../../../components/dashboard/project/ProjectOverview';
import ProjectSubmission from '../../../components/dashboard/project/ProjectSubmission';
import ProjectEvaluation from '../../../components/dashboard/project/ProjectEvaluation';
import ProjectTimeline from '../../../components/dashboard/project/ProjectTimeline';
import { mockProjects } from '../../../data/mockProjects';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate(); // Add hook
  const project = mockProjects.find(p => p.projectId === projectId);

  if (!project) {
    return <Navigate to="/dashboard/participant/projects" replace />;
  }

  return (
    <DashboardLayout>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <ProjectHeader project={project} />
        
        <div className="project-layout-grid">
          {/* Main Column (Left on desktop) */}
          <div style={{ minWidth: '0' }}>
            <ProjectOverview project={project} />
            <ProjectEvaluation evaluations={project.evaluations} />
          </div>

          {/* Sidebar Column (Right on desktop) */}
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Action Buttons */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button 
                    onClick={() => navigate(`/dashboard/participant/event/${project.hackathonId || '1'}`)}
                    className="btn-primary" 
                    style={{ width: '100%', textAlign: 'center' }}
                >
                     Go to Event Workspace
                </button>
                <button 
                    onClick={() => navigate(`/dashboard/participant/internal-hackathons/${project.hackathonId || '1'}`)}
                    style={{ 
                        width: '100%', 
                        textAlign: 'center',
                        padding: '0.75rem',
                        backgroundColor: 'white',
                        border: '1px solid #cbd5e0',
                        borderRadius: '0.375rem',
                        color: '#4a5568',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                     View Hackathon Details
                </button>
             </div>

            {/* Team Section */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748' }}>Team Members</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {project.teamMembers.map((member, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={member.avatar} alt={member.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{member.name}</div>
                                <div style={{ fontSize: '0.8rem', color: '#718096' }}>{member.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ProjectSubmission links={project.links} submissionDate={project.submittedOn} />
            <ProjectTimeline timeline={project.timeline} />
            
            <button style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '0.5rem 0' }}>
               Delete Project
            </button>
          </div>
        </div>
      </div>
      
      {/* Responsive Grid Fix: Override grid-template-columns for large screens to be 2/3 - 1/3 if supported, or use flexbox above. 
          Actually the simple grid above with auto-fit might stack weirdly. Let's force a layout style. */}
      <style>{`
        @media (min-width: 1024px) {
            .project-layout-grid {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 2rem;
            }
        }
        @media (max-width: 1023px) {
            .project-layout-grid {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default ProjectDetails;
