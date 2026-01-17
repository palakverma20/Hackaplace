import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { internalHackathons } from '../../../data/mockInternalHackathons';

const JudgeHackathonDetails = () => {
    const { hackathonId } = useParams();
    const navigate = useNavigate();
    const [hackathon, setHackathon] = useState(null);

    useEffect(() => {
        // Find the hackathon details from the mock data
        const found = internalHackathons.find(h => h.id === hackathonId);
        setHackathon(found);
    }, [hackathonId]);

    if (!hackathon) {
        return (
            <DashboardLayout role="judge" title="Hackathon Details">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h3>Hackathon not found</h3>
                    <button className="btn-secondary" onClick={() => navigate('/dashboard/judge/hackathons')}>
                        Back to Assigned Hackathons
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Ongoing': return 'badge-green';
            case 'Upcoming': return 'badge-blue';
            case 'Completed': return 'badge-gray';
            default: return 'badge-gray';
        }
    };

    return (
        <DashboardLayout role="judge" title="Hackathon Details" subtitle={`Viewing details for: ${hackathon.name}`}>
            
            {/* Breadcrumb / Back Navigation */}
            <div style={{ marginBottom: '1rem' }}>
                 <button onClick={() => navigate('/dashboard/judge/hackathons')} style={{ background: 'none', border: 'none', color: '#3182ce', cursor: 'pointer', fontSize: '0.9rem' }}>
                    &larr; Back to Assigned Hackathons
                 </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                
                {/* Main Content Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Section 1: Basic Information */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', color: '#2d3748', margin: 0 }}>{hackathon.name}</h2>
                            <span className={`status-badge ${getStatusBadge(hackathon.status)}`}>{hackathon.status}</span>
                        </div>
                        <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '1.5rem' }}>{hackathon.description}</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                            <div>
                                <small style={{ color: '#718096', display: 'block' }}>Organizer</small>
                                <strong>{hackathon.organizer}</strong>
                            </div>
                            <div>
                                <small style={{ color: '#718096', display: 'block' }}>Mode</small>
                                <strong>{hackathon.mode}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Rules & Eligibility */}
                    <div className="card">
                        <h3 className="section-title">Rules & Eligibility</h3>
                        
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#2d3748' }}>Eligibility</h4>
                            <p style={{ color: '#4a5568' }}>{hackathon.eligibility}</p>
                        </div>
                        
                         <div style={{ marginBottom: '1.5rem' }}>
                            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#2d3748' }}>Rules</h4>
                            <p style={{ color: '#4a5568' }}>{hackathon.rules}</p>
                        </div>

                         <div>
                            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#2d3748' }}>Team Requirements</h4>
                            <p style={{ color: '#4a5568' }}>{hackathon.teamType}</p>
                        </div>
                    </div>

                    {/* Section 4: Evaluation Criteria */}
                    <div className="card">
                        <h3 className="section-title">Evaluation Criteria</h3>
                        <p style={{ color: '#4a5568', marginBottom: '1rem' }}>Projects will be judged based on the following parameters:</p>
                        
                        <div style={{ background: '#ebf8ff', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #4299e1' }}>
                             <p style={{ fontWeight: '500', color: '#2b6cb0' }}>{hackathon.evaluationCriteria}</p>
                        </div>
                         <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '1rem' }}>
                            Scoring Scale: 1 - 10 per parameter.
                        </p>
                    </div>

                </div>

                {/* Sidebar Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                     {/* Section 6: Quick Actions */}
                     <div className="card">
                        <h3 className="section-title">Quick Actions</h3>
                        <button 
                            className="btn-primary" 
                            style={{ width: '100%', marginBottom: '1rem' }}
                            onClick={() => navigate('/dashboard/judge/evaluations')}
                        >
                            Go to Evaluations
                        </button>
                         <button 
                            className="btn-secondary" 
                            style={{ width: '100%' }}
                            onClick={() => navigate('/dashboard/judge/hackathons')}
                        >
                            Back to List
                        </button>
                    </div>

                    {/* Section 2: Timeline */}
                    <div className="card">
                        <h3 className="section-title">Timeline</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid #e2e8f0' }}>
                                <small style={{ color: '#718096' }}>Start Date</small>
                                <div style={{ fontWeight: '500' }}>{new Date(hackathon.startDate).toLocaleDateString()}</div>
                            </li>
                            <li style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid #e2e8f0' }}>
                                <small style={{ color: '#718096' }}>Submission Deadline</small>
                                <div style={{ fontWeight: '500', color: '#e53e3e' }}>{new Date(hackathon.deadline).toLocaleDateString()}</div>
                            </li>
                             <li style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '2px solid #e2e8f0' }}>
                                <small style={{ color: '#718096' }}>End Date</small>
                                <div style={{ fontWeight: '500' }}>{new Date(hackathon.endDate).toLocaleDateString()}</div>
                            </li>
                        </ul>
                    </div>

                    {/* Section 5: Participation Overview */}
                    <div className="card">
                        <h3 className="section-title">Participation</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                                <span style={{ color: '#666' }}>Registered Teams</span>
                                <strong>24</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                                <span style={{ color: '#666' }}>Participants</span>
                                <strong>86</strong>
                            </div>
                             <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                <span style={{ color: '#666' }}>Submissions</span>
                                <strong>18</strong>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default JudgeHackathonDetails;
