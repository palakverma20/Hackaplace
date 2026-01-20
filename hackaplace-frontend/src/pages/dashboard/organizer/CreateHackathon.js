import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import api from '../../../services/api';

const CreateHackathon = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        mode: 'Online',
        hackathonType: 'Internal',
        teamType: 'Both',
        regStartDate: '',
        regEndDate: '',
        startDate: '',
        endDate: '',
        eligibility: '',
        teamSizeMin: 1,
        teamSizeMax: 4,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally send data to API
        console.log('Hackathon Created:', formData);
        navigate('/dashboard/organizer/hackathons');
    };

    return (
        <DashboardLayout role="organizer" title="Create Hackathon" subtitle="Launch a new event.">
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Progress Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                    {['Basic Details', 'Timeline', 'Rules', 'Review'].map((label, index) => (
                        <div key={label} style={{ 
                            color: step > index ? '#4a90e2' : step === index + 1 ? '#333' : '#999',
                            fontWeight: step === index + 1 ? 'bold' : 'normal'
                        }}>
                            <span style={{ 
                                display: 'inline-block', 
                                width: '24px', 
                                height: '24px', 
                                borderRadius: '50%', 
                                background: step > index ? '#4a90e2' : step === index + 1 ? '#333' : '#eee',
                                color: step > index || step === index + 1 ? '#fff' : '#666',
                                textAlign: 'center',
                                marginRight: '8px'
                            }}>{index + 1}</span>
                            {label}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Basic Details */}
                    {step === 1 && (
                        <div>
                            <h3>Basic Details</h3>
                            <div className="form-group">
                                <label>Hackathon Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    className="form-control" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea 
                                    name="description" 
                                    className="form-control" 
                                    rows="4" 
                                    value={formData.description} 
                                    onChange={handleChange} 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Mode</label>
                                <select name="mode" className="form-control" value={formData.mode} onChange={handleChange}>
                                    <option>Online</option>
                                    <option>Offline</option>
                                    <option>Hybrid</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Participation Type</label>
                                <select name="teamType" className="form-control" value={formData.teamType} onChange={handleChange}>
                                    <option>Solo</option>
                                    <option>Team</option>
                                    <option>Both</option>
                                </select>
                            </div>
                            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                                <button type="button" className="btn-primary" onClick={nextStep}>Next: Timeline</button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Timeline */}
                    {step === 2 && (
                        <div>
                            <h3>Timeline</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Registration Start</label>
                                    <input type="date" name="regStartDate" className="form-control" value={formData.regStartDate} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Registration End</label>
                                    <input type="date" name="regEndDate" className="form-control" value={formData.regEndDate} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Hackathon Start</label>
                                    <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Hackathon End</label>
                                    <input type="date" name="endDate" className="form-control" value={formData.endDate} onChange={handleChange} required />
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                                <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>
                                <button type="button" className="btn-primary" onClick={nextStep}>Next: Rules</button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Rules */}
                    {step === 3 && (
                        <div>
                            <h3>Rules & Eligibility</h3>
                            <div className="form-group">
                                <label>Eligibility Criteria</label>
                                <textarea name="eligibility" className="form-control" rows="3" value={formData.eligibility} onChange={handleChange} placeholder="Who can participate?" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label>Min Team Size</label>
                                    <input type="number" name="teamSizeMin" className="form-control" value={formData.teamSizeMin} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Max Team Size</label>
                                    <input type="number" name="teamSizeMax" className="form-control" value={formData.teamSizeMax} onChange={handleChange} />
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                                <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>
                                <button type="button" className="btn-primary" onClick={nextStep}>Next: Review</button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Final Review */}
                    {step === 4 && (
                        <div>
                            <h3>Final Review</h3>
                            <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                                <p><strong>Name:</strong> {formData.name}</p>
                                <p><strong>Mode:</strong> {formData.mode}</p>
                                <p><strong>Type:</strong> {formData.hackathonType}</p>
                                <p><strong>Registration:</strong> {formData.regStartDate} to {formData.regEndDate}</p>
                                <p><strong>Event Date:</strong> {formData.startDate} to {formData.endDate}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>
                                <button type="submit" className="btn-primary" style={{ background: '#28a745' }}>Publish Hackathon</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </DashboardLayout>
    );
};

export default CreateHackathon;
