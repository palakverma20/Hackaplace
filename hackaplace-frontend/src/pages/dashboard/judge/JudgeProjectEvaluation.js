import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockEvaluationQueue } from '../../../data/mockJudgeData';
import { mockEvaluationConfig } from '../../../data/mockOrganizerData';

const JudgeProjectEvaluation = () => {
    const { submissionId } = useParams();
    const navigate = useNavigate();
    
    // In real app, fetch submission details by ID
    const project = mockEvaluationQueue.find(p => p.submissionId === submissionId);


    // Determine configuration based on hackathon and phase
    // Fallback/Default config if logic misses
    const defaultConfig = { criteria: [] };
    const hackathonConfig = project ? mockEvaluationConfig[project.hackathonId] : null;
    // Find the round config based on the project phase. 
    // If project.phase is 'Mid Evaluation', we look for a round with name 'Mid Evaluation' or match some ID.
    // For this mock, we'll try to find a round that matches the phase name, or default to the first active round.
    const roundConfig = hackathonConfig?.rounds.find(r => r.name === project?.phase) || hackathonConfig?.rounds[0] || defaultConfig;

    // Form State initialization
    const [scores, setScores] = useState({});
    const [feedback, setFeedback] = useState('');

    // Initialize scores based on criteria when config loads
    useEffect(() => {
        if (roundConfig.criteria) {
            const initialScores = {};
            roundConfig.criteria.forEach(c => {
                initialScores[c.id] = 0; // Default score
            });
            setScores(initialScores);
        }
    }, [roundConfig]);


    const calculateTotal = () => {
        return Object.values(scores).reduce((a, b) => a + Number(b), 0);
    };

    const calculateMaxTotal = () => {
         return roundConfig.criteria ? roundConfig.criteria.reduce((a, b) => a + b.maxScore, 0) : 0;
    };

    const handleScoreChange = (e) => {
        const { name, value } = e.target;
        // Find max score for this criterion
        const criterion = roundConfig.criteria.find(c => c.id === name);
        const max = criterion ? criterion.maxScore : 10;
        
        // Limit score 0-max
        const val = Math.max(0, Math.min(max, Number(value)));
        setScores(prev => ({ ...prev, [name]: val }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const total = calculateTotal();
        const maxTotal = calculateMaxTotal();
        alert(`Evaluation Submitted for ${project.phase}!\nTotal Score: ${total}/${maxTotal}\nFeedback: ${feedback}`);
        navigate('/dashboard/judge/evaluations');
    };

    if (!project) return <div>Project not found</div>;

    return (
        <DashboardLayout role="judge" title="Evaluate Project" subtitle={`Reviewing: ${project.projectName} (${project.phase})`}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                
                {/* Left Column: Project Details */}
                <div>
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3>Project Details</h3>
                        <div style={{ marginTop: '1rem' }}>
                            <p><strong>Team:</strong> {project.teamName}</p>
                            <p><strong>Hackathon:</strong> {project.hackathonName}</p>
                            <p><strong>Phase:</strong> {project.phase}</p>
                            <div style={{ margin: '1rem 0', padding: '1rem', background: '#f5f7fa', borderRadius: '4px' }}>
                                <strong>Description:</strong>
                                <p style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>{project.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3>Submission Links</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>
                                View GitHub Repository
                            </a>
                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textAlign: 'center', textDecoration: 'none' }}>
                                View Live Demo
                            </a>
                            
                            <div style={{ marginTop: '0.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                                <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Presentation</h4>
                                {project.pptLink ? (
                                    <a 
                                        href={project.pptLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="btn-secondary" 
                                        style={{ 
                                            textAlign: 'center', 
                                            textDecoration: 'none', 
                                            display: 'block', 
                                            background: '#fff', 
                                            border: '1px solid #e2e8f0',
                                            color: '#2b6cb0'
                                        }}
                                    >
                                        📄 View Presentation (PDF/PPT)
                                    </a>
                                ) : (
                                    <div style={{ fontSize: '0.9rem', color: '#a0aec0', fontStyle: 'italic', textAlign: 'center', padding: '0.5rem' }}>
                                        No presentation uploaded for this project.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Evaluation Form */}
                <div className="card">
                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1.5rem' }}>Evaluation Form - {roundConfig.name}</h3>
                    
                    {roundConfig.criteria && roundConfig.criteria.length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            
                            {roundConfig.criteria.map(criterion => (
                                <div key={criterion.id} style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <label style={{ fontWeight: 'bold' }}>{criterion.name} (Max {criterion.maxScore})</label>
                                        <span style={{ fontWeight: 'bold', color: '#4a90e2' }}>{scores[criterion.id] || 0}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max={criterion.maxScore} 
                                        name={criterion.id} 
                                        value={scores[criterion.id] || 0} 
                                        onChange={handleScoreChange}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            ))}

                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Feedback</label>
                                <textarea
                                    className="input-field"
                                    rows="4"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Provide constructive feedback for the team..."
                                    style={{ width: '100%', padding: '0.5rem' }}
                                />
                            </div>

                            <div style={{ padding: '1rem', background: '#f0f4f8', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
                                <span style={{ fontSize: '0.9rem', color: '#666' }}>Total Score</span>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c3e50' }}>{calculateTotal()} / {calculateMaxTotal()}</div>
                            </div>
                            
                            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }}>Submit Evaluation</button>
                        </form>
                    ) : (
                        <div>No criteria defined for this phase.</div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default JudgeProjectEvaluation;
