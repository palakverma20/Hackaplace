import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';

const ParticipantRegisteredEvents = () => {
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    
    const savedIds = JSON.parse(localStorage.getItem('hackaplace_registrations') || '[]');
    
   
    const allEvents = [
        { id: 'hack-1', name: "Hackaplace Innovation Challenge 2026", status: "Ongoing", date: "Feb 01, 2026" },
        { id: 'hack-2', name: "AI for Social Good", status: "Upcoming", date: "Mar 15, 2026" }
    ];

    const userEvents = allEvents.filter(e => savedIds.includes(e.id));
    
      
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
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', paddingLeft: "5px"}}>
                <span className={`status-badge ${event.status === 'Ongoing' ? 'badge-green' : 'badge-blue'}`}>
                    {event.status}
                </span>
             </div>
             <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#2d3748', paddingLeft: "15px" }}>{event.name}</h3>
             <p style={{ color: '#718096', fontSize: '0.9rem', marginBottom: '1.5rem', paddingLeft: "16px"  }}>Start Date: {event.date}</p>
             
             <button className="btn-primary" style={{ width: '100%', marginLeft: "10px"}}>
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
