import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import InternalHackathonCard from '../../../components/dashboard/InternalHackathonCard';
import { hackathonsAPI } from '../../../services/api';

const ParticipantInternalHackathons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('All');
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [hackathonsData, userData] = await Promise.all([
          hackathonsAPI.getAll(),
          // For now, we'll get user from localStorage, but this should be from auth context
          Promise.resolve(JSON.parse(localStorage.getItem('user') || 'null'))
        ]);

        setHackathons(hackathonsData);
        setUser(userData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load hackathons. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hackathon.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = filterMode === 'All' || hackathon.mode === filterMode;
    return matchesSearch && matchesMode;
  });

  const ongoingEvents = filteredHackathons.filter(h => h.status === 'ongoing');
  const upcomingEvents = filteredHackathons.filter(h => h.status === 'upcoming');

  if (loading) {
    return (
      <DashboardLayout
        role="participant"
        title="Join Event"
        subtitle="Discover and join exclusive events hosted on Hackaplace."
      >
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          Loading hackathons...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout
        role="participant"
        title="Join Event"
        subtitle="Discover and join exclusive events hosted on Hackaplace."
      >
        <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
          {error}
        </div>
      </DashboardLayout>
    );
  }

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
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
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
                key={hackathon._id}
                hackathon={hackathon}
                isRegistered={user && hackathon.participants && hackathon.participants.some(p => p._id === user._id)}
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
                key={hackathon._id}
                hackathon={hackathon}
                isRegistered={user && hackathon.participants && hackathon.participants.some(p => p._id === user._id)}
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
