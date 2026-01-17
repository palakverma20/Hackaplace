import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import InternalHackathonCard from '../../../components/dashboard/InternalHackathonCard';
import { useBookmarks } from '../../../context/BookmarkContext';

const ExternalBookmarkCard = ({ event }) => {
  const { toggleBookmark } = useBookmarks();
  
  const handleRemove = (e) => {
      e.stopPropagation();
      toggleBookmark({ ...event, type: 'external' });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Upcoming': return 'badge-blue';
      case 'Ongoing': return 'badge-green';
      default: return 'badge-gray';
    }
  };

  return (
    <div className="project-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <span className={`status-badge ${getStatusClass(event.status)}`}>
          {event.status}
        </span>
        <button 
           onClick={handleRemove}
           title="Remove Bookmark"
           style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#e53e3e' }}
        >
          🗑️
        </button>
      </div>
      
      <h3 className="card-title">{event.name || event.title}</h3>
      
      <div style={{ fontSize: '0.85rem', color: '#4a5568', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <div>📅 <strong>Start:</strong> {event.startDate}</div>
        <div>⏳ <strong>Due:</strong> {event.deadline}</div>
        <div>🏷️ <strong>Mode:</strong> {event.mode}</div>
        <div>🔗 <strong>Source:</strong> External ({event.source || 'Aggregator'})</div>
      </div>

      <div className="project-footer">
         <a 
            href={event.link} 
            target="_blank" 
            rel="noreferrer"
            style={{ 
                background: 'none', 
                border: 'none', 
                color: '#5a67d8', 
                fontWeight: '600', 
                cursor: 'pointer',
                textDecoration: 'none'
            }}
         >
           View Details ↗
         </a>
      </div>
    </div>
  );
};

const ParticipantBookmarks = () => {
  const { bookmarks } = useBookmarks();
  const [activeTab, setActiveTab] = useState('internal');
  const [registeredIds, setRegisteredIds] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('hackaplace_registrations') || '[]');
    setRegisteredIds(saved);
  }, []);

  // Filter bookmarks by active tab
  const filteredBookmarks = bookmarks.filter(b => {
      if (activeTab === 'internal') return b.type === 'internal';
      return b.type === 'external';
  });

  return (
    <DashboardLayout 
      role="participant" 
      title="My Booksmarks" 
      subtitle="Manage your saved hackathons and events."
    >
      {/* Tabs */}
      <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem', 
          borderBottom: '1px solid #e2e8f0',
          paddingBottom: '0.5rem'
      }}>
        <button
          onClick={() => setActiveTab('internal')}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'internal' ? '2px solid #3182ce' : 'none',
            color: activeTab === 'internal' ? '#2b6cb0' : '#718096',
            fontWeight: activeTab === 'internal' ? '600' : '400',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Internal Hackathons
        </button>
        <button
          onClick={() => setActiveTab('external')}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'external' ? '2px solid #3182ce' : 'none',
            color: activeTab === 'external' ? '#2b6cb0' : '#718096',
            fontWeight: activeTab === 'external' ? '600' : '400',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          External Events
        </button>
      </div>

      {/* Content */}
      <div className="dashboard-grid">
        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((item) => (
            activeTab === 'internal' ? (
                <InternalHackathonCard 
                    key={item.id} 
                    hackathon={item} 
                    isRegistered={registeredIds.includes(item.id)}
                />
            ) : (
                <ExternalBookmarkCard 
                    key={item.id} 
                    event={item}
                />
            )
          ))
        ) : (
          <div style={{ 
            gridColumn: '1 / -1', 
            padding: '3rem', 
            textAlign: 'center', 
            color: '#a0aec0', 
            background: 'white', 
            borderRadius: '12px',
            border: '1px dashed #e2e8f0'
          }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No bookmarks found in this category.</p>
            <p style={{ fontSize: '0.9rem' }}>
                Browse {activeTab} events to find something interesting!
            </p>
          </div>
        )}
      </div>

    </DashboardLayout>
  );
};

export default ParticipantBookmarks;
