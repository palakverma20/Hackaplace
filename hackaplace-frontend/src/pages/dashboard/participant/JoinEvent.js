import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { internalHackathons } from '../../../data/mockInternalHackathons';
import ParticipantDetailsForm from '../../../components/dashboard/join/ParticipantDetailsForm';
import TeamFlow from '../../../components/dashboard/join/TeamFlow';

const JoinEvent = () => {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const hackathon = internalHackathons.find(h => h.id === hackathonId);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      contact: '',
      altContact: '',
      college: '',
      eduCity: '',
      eduCountry: '',
      degree: '',
      branch: '',
      gradYear: '',
      city: '',
      state: '',
      country: ''
  });

  if (!hackathon) {
    return <DashboardLayout role="participant" title="Not Found">Hackathon not found</DashboardLayout>;
  }

  const handleDetailsSubmit = () => {
      setStep(2);
  };

  const handleTeamFlowComplete = (teamResult) => {
      // 1. Save Registration State (Mock Backend)
      // We save the hackathon ID to the list of registered events
      const existing = JSON.parse(localStorage.getItem('hackaplace_registrations') || '[]');
      if (!existing.includes(hackathonId)) {
        localStorage.setItem('hackaplace_registrations', JSON.stringify([...existing, hackathonId]));
      }

      // 2. Log Result (For Debugging / Future Integration)
      console.log('Registration Complete:', {
          event: hackathonId,
          participant: formData,
          team: teamResult
      });

      // 3. User Feedback
      alert(`🎉 Successfully registered for ${hackathon.name}! Redirecting to your workspace...`);

      // 4. Redirect to Workspace
      navigate(`/dashboard/participant/event/${hackathonId}`);
  };

  return (
    <DashboardLayout role="participant" title={`Join ${hackathon.name}`}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        
        {/* Progress Stepper */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <div style={{ fontWeight: step === 1 ? 'bold' : 'normal', color: step === 1 ? '#3182ce' : '#cbd5e0' }}>
                <span style={{ marginRight: '8px', border: `1px solid ${step === 1 ? '#3182ce' : '#cbd5e0'}`, borderRadius: '50%', width: '24px', height: '24px', display: 'inline-block', textAlign: 'center', lineHeight: '22px' }}>1</span>
                Participant Details
            </div>
            <div style={{ fontWeight: step === 2 ? 'bold' : 'normal', color: step === 2 ? '#3182ce' : '#cbd5e0' }}>
                <span style={{ marginRight: '8px', border: `1px solid ${step === 2 ? '#3182ce' : '#cbd5e0'}`, borderRadius: '50%', width: '24px', height: '24px', display: 'inline-block', textAlign: 'center', lineHeight: '22px' }}>2</span>
                Participation Preference
            </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
            <ParticipantDetailsForm 
                data={formData} 
                onUpdate={setFormData} 
                onNext={handleDetailsSubmit} 
            />
        )}

        {step === 2 && (
            <TeamFlow 
                onBack={() => setStep(1)} 
                onComplete={handleTeamFlowComplete} 
            />
        )}

      </div>
    </DashboardLayout>
  );
};

export default JoinEvent;
