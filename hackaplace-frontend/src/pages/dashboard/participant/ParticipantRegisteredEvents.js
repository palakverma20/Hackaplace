import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';

const ParticipantRegisteredEvents = () => {
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch details for these IDs
    // For this demo, we'll map IDs to static data that matches our workspace mock
    // Using IDs 'hack-1', 'hack-2' to align with mockEventWorkspaceData.js
    const savedIds = JSON.parse(localStorage.getItem('hackaplace_registrations') || '[]');
    
    // Combining mock data for list display (Simplified version of internalHackathons)
    const allEvents = [
        { id: 'hack-1', name: "Hackaplace Innovation Challenge 2026", status: "Ongoing", date: "Feb 01, 2026" },
        { id: 'hack-2', name: "AI for Social Good", status: "Upcoming", date: "Mar 15, 2026" }
    ];

    const userEvents = allEvents.filter(e => savedIds.includes(e.id));
    
    // Fallback: If local storage is empty, show at least one demo event so the user sees the feature
    // Logic: if storage is empty, show hack-1 as a demo. If storage has items, show those items.
    if (savedIds.length === 0) {
        setRegisteredEvents([allEvents[0]]);
    } else {
        setRegisteredEvents(userEvents);
    }

  }, []);

  return (
    <DashboardLayout 
      role="participant" 
      title="Registered Events" 
      subtitle="Access your active hackathon workspaces."
    >
      <div className="dashboard-grid">
        {registeredEvents.map(event => (
          <div 
            key={event.id} 
            className="card" 
            style={{ cursor: 'pointer', transition: 'transform 0.2s', borderLeft: `4px solid ${event.status === 'Ongoing' ? '#48bb78' : '#4299e1'}` }}
            onClick={() => navigate(`/dashboard/participant/event/${event.id}`)}
          >
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className={`status-badge ${event.status === 'Ongoing' ? 'badge-green' : 'badge-blue'}`}>
                    {event.status}
                </span>
             </div>
             <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#2d3748' }}>{event.name}</h3>
             <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Start Date: {event.date}</p>
             
             <button className="btn-primary" style={{ width: '100%' }}>
                Enter Workspace
             </button>
          </div>
        ))}
        {registeredEvents.length === 0 && (
            <p>You haven't joined any hackathons yet.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ParticipantRegisteredEvents;
