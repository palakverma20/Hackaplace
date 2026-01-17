import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockSubmissions } from '../../../data/mockOrganizerData';

const OrganizerSubmissionDetails = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const submission = mockSubmissions.find(s => s.id === submissionId);

  if (!submission) {
    return (
      <DashboardLayout role="organizer" title="Details">
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ color: 'red' }}>Submission not found</h2>
            <button
                onClick={() => navigate('/dashboard/organizer/submissions')}
                style={{ marginTop: '1rem', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Back to Submissions
            </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="organizer" title="Submission Details" subtitle={`Reviewing ${submission.projectName}`}>
       <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>{submission.projectName}</h2>
              <p style={{ margin: '5px 0 0 0', color: '#666' }}>Team: <strong>{submission.teamName}</strong></p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ 
                padding: '5px 10px', 
                borderRadius: '15px', 
                backgroundColor: submission.status === 'Submitted' ? '#e3f2fd' : '#fff3cd',
                color: submission.status === 'Submitted' ? '#1e88e5' : '#856404',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}>
                {submission.status}
              </span>
              {submission.score && <p style={{ marginTop: '5px', fontWeight: 'bold' }}>Score: {submission.score}/100</p>}
            </div>
         </div>

         <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ borderBottom: '2px solid #007bff', display: 'inline-block', paddingBottom: '5px', marginBottom: '10px' }}>Project Description</h3>
                <p style={{ lineHeight: '1.6', color: '#444' }}>{submission.description}</p>
              </div>
              {submission.problem && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Problem Statement</h3>
                  <p style={{ lineHeight: '1.6', color: '#444' }}>{submission.problem}</p>
                </div>
              )}
              {submission.solution && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Solution</h3>
                  <p style={{ lineHeight: '1.6', color: '#444' }}>{submission.solution}</p>
                </div>
              )}

              {/* Presentation / PPT Section - EXTENDED FEATURE */}
              <div style={{ marginBottom: '20px', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📊 Presentation / PPT
                </h3>
                
                {submission.pptFileName ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '1rem', borderRadius: '6px', border: '1px solid #cbd5e0' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.5rem' }}>📄</span>
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#2c5282' }}>{submission.pptFileName}</div>
                          <div style={{ fontSize: '0.8rem', color: '#718096' }}>Document</div>
                        </div>
                     </div>
                     <div style={{ display: 'flex', gap: '10px' }}>
                        <a 
                          href={submission.pptFileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-secondary"
                          style={{ textDecoration: 'none', fontSize: '0.9rem' }}
                        >
                          View PPT
                        </a>
                        <a 
                          href={submission.pptFileUrl} 
                          download
                          className="btn-secondary"
                          style={{ textDecoration: 'none', fontSize: '0.9rem' }}
                        >
                          Download
                        </a>
                     </div>
                  </div>
                ) : (
                  <div style={{ color: '#718096', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                    No presentation submitted by this team.
                  </div>
                )}
              </div>

            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
               <h3 style={{ marginTop: 0, fontSize: '1.1rem' }}>Submission Info</h3>
               <p style={{ fontSize: '0.9rem' }}><strong>Submitted:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
               <p style={{ fontSize: '0.9rem' }}><strong>Hackathon:</strong> {submission.hackathonName}</p>
               
               <h3 style={{ fontSize: '1.1rem', marginTop: '20px' }}>Tech Stack</h3>
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                 {submission.techStack && submission.techStack.map(tech => (
                   <span key={tech} style={{ backgroundColor: '#e9ecef', padding: '3px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>{tech}</span>
                 ))}
               </div>

               <h3 style={{ fontSize: '1.1rem', marginTop: '20px' }}>Links</h3>
               <ul style={{ listStyle: 'none', padding: 0 }}>
                 {submission.repoLink && (
                   <li style={{ marginBottom: '8px' }}><a href={submission.repoLink} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>📦 GitHub Repository</a></li>
                 )}
                 {submission.demoLink && (
                    /* Only Show Demo Link if explicitly needed, but instructions said to focus on PPT */
                   <li style={{ marginBottom: '8px' }}><a href={submission.demoLink} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>🔗 Live Demo</a></li>
                 )}
               </ul>
            </div>
         </div>
         
         <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <button onClick={() => navigate('/dashboard/organizer/submissions')} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back</button>
         </div>
       </div>
    </DashboardLayout>
  );
};
export default OrganizerSubmissionDetails;
