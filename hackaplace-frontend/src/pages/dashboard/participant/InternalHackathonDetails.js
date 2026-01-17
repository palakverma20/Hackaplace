import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { internalHackathons } from '../../../data/mockInternalHackathons';

const InternalHackathonDetails = () => {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const hackathon = internalHackathons.find(h => h.id === hackathonId);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('hackaplace_registrations') || '[]');
    if (saved.includes(hackathonId)) {
      setIsRegistered(true);
    }
  }, [hackathonId]);

  if (!hackathon) {
    return (
      <DashboardLayout role="participant" title="Hackathon Not Found">
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>The requested hackathon could not be found.</p>
          <button className="btn-secondary" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusClass = (status) => {
    if (status === 'Ongoing') return 'badge-green';
    if (status === 'Upcoming') return 'badge-blue';
    return 'badge-orange';
  };

  return (
    <DashboardLayout role="participant" title="Hackathon Details">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className={`status-badge ${getStatusClass(hackathon.status)}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {hackathon.status}
            </span>
             <span className="status-badge" style={{ background: '#edf2f7', color: '#4a5568' }}>
              {hackathon.mode}
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', color: '#2d3748', marginBottom: '0.5rem' }}>{hackathon.name}</h1>
          <p style={{ color: '#718096', fontSize: '1.1rem' }}>by <strong>{hackathon.organizer}</strong></p>
        </div>

        {/* Action Buttons Top */}
        <div style={{ display: 'flex', interval: '1rem', marginBottom: '2rem', gap: '1rem' }}>
          {isRegistered ? (
               <button 
                disabled
                style={{ 
                  padding: '0.75rem 2rem', 
                  fontSize: '1.1rem',
                  background: '#e2e8f0', 
                  color: '#718096', 
                  border: 'none', 
                  borderRadius: '6px', 
                  fontWeight: '600',
                  cursor: 'not-allowed'
                }}
              >
                Already Joined
              </button>
          ) : (
            <button 
              className="btn-primary" 
              style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
              onClick={() => navigate(`/dashboard/participant/internal-hackathons/${hackathon.id}/join`)}
            >
              Join Event
            </button>
          )}
          <button 
            className="btn-secondary"
            onClick={() => navigate(-1)}
          >
            Back to List
          </button>
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          {/* Main Info */}
          <div>
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ borderBottom: '2px solid #3182ce', display: 'inline-block', paddingBottom: '0.3rem', marginBottom: '1rem' }}>About the Hackathon</h3>
              <p style={{ lineHeight: '1.6', color: '#4a5568' }}>{hackathon.description}</p>
            </section>

             <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ borderBottom: '2px solid #3182ce', display: 'inline-block', paddingBottom: '0.3rem', marginBottom: '1rem' }}>Problem Domains</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {hackathon.problemDomains.map((domain, index) => (
                  <span key={index} style={{ background: '#ebf8ff', color: '#2b6cb0', padding: '0.3rem 0.8rem', borderRadius: '15px', fontSize: '0.9rem' }}>
                    {domain}
                  </span>
                ))}
              </div>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ borderBottom: '2px solid #3182ce', display: 'inline-block', paddingBottom: '0.3rem', marginBottom: '1rem' }}>Prizes</h3>
              <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#4a5568' }}>
                 {hackathon.prizes.map((prize, idx) => <li key={idx} style={{ marginBottom: '0.5rem' }}>{prize}</li>)}
              </ul>
            </section>
             
             <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ borderBottom: '2px solid #3182ce', display: 'inline-block', paddingBottom: '0.3rem', marginBottom: '1rem' }}>Evaluation Criteria</h3>
              <p style={{ lineHeight: '1.6', color: '#4a5568' }}>{hackathon.evaluationCriteria}</p>
            </section>
          </div>

          {/* Sidebar Info */}
          <div style={{ background: '#f7fafc', padding: '1.5rem', borderRadius: '8px', height: 'fit-content' }}>
            <h4 style={{ marginBottom: '1rem', color: '#2d3748' }}>Timeline</h4>
            <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <div style={{ marginBottom: '0.5rem' }}><strong>Registration Deadline:</strong><br/>{hackathon.deadline}</div>
              <div style={{ marginBottom: '0.5rem' }}><strong>Event Start:</strong><br/>{hackathon.startDate}</div>
              <div style={{ marginBottom: '0.5rem' }}><strong>Event End:</strong><br/>{hackathon.endDate}</div>
            </div>

            <h4 style={{ marginBottom: '1rem', color: '#2d3748' }}>Participation</h4>
            <div style={{ fontSize: '0.9rem' }}>
              <div style={{ marginBottom: '0.5rem' }}><strong>Team Type:</strong><br/>{hackathon.teamType}</div>
              <div style={{ marginBottom: '0.5rem' }}><strong>Eligibility:</strong><br/>{hackathon.eligibility}</div>
            </div>
             <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              <div style={{ marginBottom: '0.5rem' }}><strong>Rules:</strong><br/>{hackathon.rules}</div>
             </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default InternalHackathonDetails;
