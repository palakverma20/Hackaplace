import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import EventOverview from '../../../components/workspace/EventOverview';
import TeamSection from '../../../components/workspace/TeamSection';
import TeamChat from '../../../components/workspace/TeamChat';
import SubmissionSection from '../../../components/workspace/SubmissionSection';
import EvaluationSection from '../../../components/workspace/EvaluationSection';
import AnnouncementSection from '../../../components/workspace/AnnouncementSection';

// State simulating backend
import { mockWorkspaceData } from '../../../data/mockEventWorkspaceData';

const ParticipantEventWorkspace = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  
  // In a real app, this would be a fetch call
  const eventData = mockWorkspaceData[eventId];

  if (!eventData) {
      return (
          <DashboardLayout role="participant" title="Workspace Not Found">
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                  <p>Could not load workspace for ID: {eventId}</p>
                  <button className="btn-secondary" onClick={() => navigate('/dashboard/participant/registered-events')}>Back to Events</button>
              </div>
          </DashboardLayout>
      );
  }

  return (
    <DashboardLayout role="participant" title={null} >
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '1rem' }}>
            <span 
                style={{ cursor: 'pointer', color: '#718096' }}
                onClick={() => navigate('/dashboard/participant/registered-events')}
            >
                ← Back to Registered Events
            </span>
        </div>

        {/* Section 1: Overview and Announcements */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <EventOverview event={eventData} />
            <AnnouncementSection hackathonId={eventId} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
             {/* Section 2: Team */}
             <TeamSection team={eventData.team} />
             
             {/* Section 3: Chat */}
             <TeamChat chatHistory={eventData.chat} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            {/* Section 4: Submission */}
             <div>
                <SubmissionSection submission={eventData.submission} phase={eventData.phase} />
             </div>

             {/* Section 6: Evaluation (Sidebar style) */}
             <div>
                 <h3 className="section-title" style={{ fontSize: '1.2rem' }}>Feedback & Results</h3>
                 <EvaluationSection evaluation={eventData.evaluation} />
             </div>
        </div>
    </DashboardLayout>
  );
};

export default ParticipantEventWorkspace;
