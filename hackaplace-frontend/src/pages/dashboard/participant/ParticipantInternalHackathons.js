import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import InternalHackathonCard from '../../../components/dashboard/InternalHackathonCard';
import { internalHackathons } from '../../../data/mockInternalHackathons';

const ParticipantInternalHackathons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('All');
  const [registeredIds, setRegisteredIds] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('hackaplace_registrations') || '[]');
    setRegisteredIds(saved);
  }, []);

  const filteredHackathons = internalHackathons.filter(hackathon => {
    const matchesSearch = hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hackathon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = filterMode === 'All' || hackathon.mode === filterMode;
    return matchesSearch && matchesMode;
  });

  const ongoingEvents = filteredHackathons.filter(h => h.status === 'Ongoing');
  const upcomingEvents = filteredHackathons.filter(h => h.status === 'Upcoming');

  return (
    <DashboardLayout 
      role="participant" 
      title="Join Event" 
      subtitle="Discover and join exclusive events hosted on Hackaplace."
    >
      {/* Search and Filter Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search hackathons..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="form-input" 
            style={{ width: 'auto' }}
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
          >
            <option value="All">All Modes</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Ongoing Hackathons Section */}
      <div className="dashboard-section">
        <h3 className="section-title">Ongoing Hackathons</h3>
        {ongoingEvents.length > 0 ? (
          <div className="dashboard-grid">
            {ongoingEvents.map(hackathon => (
              <InternalHackathonCard 
                key={hackathon.id} 
                hackathon={hackathon} 
                isRegistered={registeredIds.includes(hackathon.id)}
              />
            ))}
          </div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#718096', background: 'white', borderRadius: '12px' }}>
            No ongoing hackathons found matching your criteria.
          </div>
        )}
      </div>

      {/* Upcoming Hackathons Section */}
      <div className="dashboard-section">
        <h3 className="section-title">Upcoming Hackathons</h3>
        {upcomingEvents.length > 0 ? (
          <div className="dashboard-grid">
            {upcomingEvents.map(hackathon => (
              <InternalHackathonCard 
                key={hackathon.id} 
                hackathon={hackathon} 
                isRegistered={registeredIds.includes(hackathon.id)}
              />
            ))}
          </div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#718096', background: 'white', borderRadius: '12px' }}>
            No upcoming hackathons found matching your criteria.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ParticipantInternalHackathons;
