import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockSubmissions, mockEvaluationConfig, mockOrganizerHackathons } from '../../../data/mockOrganizerData';

const OrganizerEvaluationDetails = () => {
  const { hackathonId, submissionId } = useParams();
  const navigate = useNavigate();

  const hackathon = mockOrganizerHackathons.find(h => h.id === hackathonId);
  const submission = mockSubmissions.find(s => s.id === submissionId);
  const config = mockEvaluationConfig[hackathonId];

  // Mocking multiple judges for this view since global data doesn't have it
  const [activeRound, setActiveRound] = useState(config?.rounds[0]?.id || 'round-mid');
  
  const currentRound = config?.rounds.find(r => r.id === activeRound) || { name: 'Unknown Round', criteria: [] };

  // Generate deterministic-ish mock judge data based on submissionId
  const mockJudgeEvaluations = [
      {
          judgeName: 'Dr. Alan Grant',
          timestamp: '2026-02-03 14:30',
          feedback: 'Excellent technical implementation. The code is clean and well-structured.',
          scores: currentRound.criteria.reduce((acc, c) => ({ ...acc, [c.id]: 8 }), {}),
          total: currentRound.criteria.length * 8
      },
      {
          judgeName: 'Sarah Connor',
          timestamp: '2026-02-03 15:15',
          feedback: 'Great concept but the UI needs more polish. Navigation is a bit confusing.',
          scores: currentRound.criteria.reduce((acc, c) => ({ ...acc, [c.id]: 7 }), {}),
          total: currentRound.criteria.length * 7
      },
      {
          judgeName: 'Tony Stark',
          timestamp: '2026-02-03 16:00',
          feedback: 'Innovative solution! I can see this scaling well.',
          scores: currentRound.criteria.reduce((acc, c) => ({ ...acc, [c.id]: 9 }), {}),
          total: currentRound.criteria.length * 9
      }
  ];

  const calculateAverage = () => {
      const totalScore = mockJudgeEvaluations.reduce((acc, curr) => acc + curr.total, 0);
      return (totalScore / mockJudgeEvaluations.length).toFixed(1);
  };

  const maxPossible = currentRound.criteria.reduce((acc, c) => acc + c.maxScore, 0);

  if (!submission || !hackathon) return <DashboardLayout role="organizer" title="Evaluation Details">Items not found</DashboardLayout>;

  return (
    <DashboardLayout role="organizer" title="Evaluation Details" subtitle={`Results for ${submission.teamName}`}>
        {/* Breadcrumb / Back Navigation */}
        <div style={{ marginBottom: '1rem' }}>
            <button 
                onClick={() => navigate(`/dashboard/organizer/evaluations/${hackathonId}`)}
                style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}
            >
                &larr; Back to Evaluations List
            </button>
        </div>

        {/* Section 1: Header Context */}
        <div className="card" style={{ marginBottom: '20px', borderLeft: '4px solid #007bff' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div>
                    <div style={{ color: '#666', fontSize: '0.8rem' }}>HACKATHON</div>
                    <div style={{ fontWeight: 'bold' }}>{hackathon.name}</div>
                </div>
                <div>
                    <div style={{ color: '#666', fontSize: '0.8rem' }}>ROUND</div>
                    <div style={{ fontWeight: 'bold' }}>{currentRound.name}</div>
                </div>
                <div>
                    <div style={{ color: '#666', fontSize: '0.8rem' }}>PROJECT</div>
                    <div style={{ fontWeight: 'bold' }}>{submission.projectName}</div>
                </div>
                <div>
                    <div style={{ color: '#666', fontSize: '0.8rem' }}>STATUS</div>
                    <span style={{ 
                        background: '#e3f2fd', 
                        color: '#1565c0', 
                        padding: '2px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                    }}>
                        Evaluated
                    </span>
                </div>
            </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            
            {/* Left Column */}
            <div>
                {/* Section 5: Aggregated Results */}
                 <div className="card" style={{ marginBottom: '20px', background: 'linear-gradient(to right, #ffffff, #f8f9fa)' }}>
                    <h3 className="section-title">Aggregated Results</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2c3e50', lineHeight: 1 }}>
                                {calculateAverage()} <span style={{ fontSize: '1rem', color: '#999', fontWeight: 'normal' }}>/ {maxPossible}</span>
                            </div>
                            <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>Average Score</div>
                        </div>
                        <div style={{ height: '50px', width: '1px', background: '#ddd' }}></div>
                        <div>
                             <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#27ae60' }}>Qualified</div>
                             <div style={{ color: '#666', fontSize: '0.9rem' }}>Status</div>
                        </div>
                         <div>
                             <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f39c12' }}>#4</div>
                             <div style={{ color: '#666', fontSize: '0.9rem' }}>Projected Rank</div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Judge-wise Breakdown */}
                <h3 style={{ marginBottom: '15px', color: '#4a5568' }}>Judge Evaluations</h3>
                {mockJudgeEvaluations.map((judge, idx) => (
                    <div key={idx} className="card" style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <div>
                                <strong>{judge.judgeName}</strong>
                                <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#999' }}>{judge.timestamp}</span>
                            </div>
                            <div style={{ fontWeight: 'bold', color: '#2c5282' }}>
                                Total: {judge.total} / {maxPossible}
                            </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Scores</h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {currentRound.criteria.map(c => (
                                        <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.9rem' }}>
                                            <span>{c.name}</span>
                                            <span style={{ fontWeight: 'bold' }}>{judge.scores[c.id]} <span style={{ color: '#ccc', fontWeight: 'normal' }}>/ {c.maxScore}</span></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={{  borderLeft: '1px solid #eee', paddingLeft: '20px' }}>
                                <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Feedback</h4>
                                <p style={{ fontStyle: 'italic', color: '#4a5568', fontSize: '0.9rem', lineHeight: '1.5' }}>"{judge.feedback}"</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Right Column: Project Summary & Materials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Section 3: Submitted Materials - Read Only */}
                <div className="card">
                     <h3 className="section-title">Submitted Materials</h3>
                     
                     {/* PPT Button - Existing Feature Integration */}
                     {submission.pptFileName ? (
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>Presentation</div>
                             <a 
                                href={submission.pptFileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ 
                                    display: 'block', 
                                    padding: '10px', 
                                    background: '#fff', 
                                    border: '1px solid #cbd5e0', 
                                    borderRadius: '6px', 
                                    textDecoration: 'none',
                                    color: '#2b6cb0',
                                    textAlign: 'center',
                                    fontSize: '0.9rem',
                                    fontWeight: '500'
                                }}
                            >
                                📄 View {submission.pptFileName}
                            </a>
                        </div>
                     ) : (
                         <div style={{ padding: '10px', background: '#f7fafc', color: '#718096', fontSize: '0.9rem', textAlign: 'center', borderRadius: '4px', marginBottom: '15px' }}>No PPT Submitted</div>
                     )}

                     {/* Repo Link */}
                      <div style={{ marginBottom: '15px' }}>
                        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '5px' }}>Repository</div>
                         <a 
                            href={submission.repoLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.9rem' }}
                        >
                            🔗 {submission.repoLink}
                        </a>
                     </div>
                </div>

                {/* Section 2: Project Summary */}
                <div className="card">
                    <h3 className="section-title">Project Summary</h3>
                    <div style={{ marginBottom: '15px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '0.9rem' }}>Abstract</div>
                        <p style={{ fontSize: '0.85rem', color: '#4a5568', lineHeight: '1.5' }}>{submission.description}</p>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '0.9rem' }}>Tech Stack</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {submission.techStack && submission.techStack.map(t => (
                            <span key={t} style={{ fontSize: '0.75rem', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>{t}</span>
                        ))}
                        </div>
                    </div>
                </div>

                 {/* Section 6: Timeline/Audit */}
                 <div className="card">
                    <h3 className="section-title">Audit Log</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem' }}>
                        <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#666' }}>Submitted</span>
                            <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ color: '#666' }}>Mid Eval</span>
                            <span style={{ color: '#27ae60' }}>Completed</span>
                        </li>
                    </ul>
                 </div>
            </div>
        </div>
    </DashboardLayout>
  );
};

export default OrganizerEvaluationDetails;
