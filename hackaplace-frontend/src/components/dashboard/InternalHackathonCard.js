import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmarks } from '../../context/BookmarkContext';

const InternalHackathonCard = ({ hackathon, isRegistered }) => {
  const navigate = useNavigate();
  const { bookmarks, toggleBookmark } = useBookmarks();

  const isBookmarked = bookmarks.some(b => b.id === hackathon.id && b.type === 'internal');

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleBookmark({ ...hackathon, type: 'internal' });
  };

  const handleCardClick = (e) => {
    if (isRegistered) {
      return; // Do nothing if already registered
    }
    navigate(`/dashboard/participant/internal-hackathons/${hackathon.id}/join`);
  };

  const handleJoinClick = (e) => {
    e.stopPropagation();
    navigate(`/dashboard/participant/internal-hackathons/${hackathon.id}/join`);
  };

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    navigate(`/dashboard/participant/internal-hackathons/${hackathon.id}`);
  };

  const getStatusClass = (status) => {
    if (status === 'Ongoing') return 'badge-green';
    if (status === 'Upcoming') return 'badge-blue';
    return 'badge-orange';
  };

  return (
    <div 
      className="project-card" 
      onClick={handleCardClick}
      style={{ 
        cursor: isRegistered ? 'default' : 'pointer', 
        transition: 'transform 0.2s',
        opacity: isRegistered ? 0.9 : 1
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <span className={`status-badge ${getStatusClass(hackathon.status)}`}>
          {hackathon.status}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#718096' }}>
            {hackathon.mode}
          </span>
          <button 
            onClick={handleBookmarkClick}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '1.2rem',
              padding: 0,
              lineHeight: 1,
              color: isBookmarked ? '#ECC94B' : '#CBD5E0',
              transition: 'color 0.2s'
            }}
            title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
          >
            {isBookmarked ? '★' : '☆'}
          </button>
        </div>
      </div>

      <h3 className="card-title">{hackathon.name}</h3>
      <div style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '0.5rem' }}>
        by <strong>{hackathon.organizer}</strong>
      </div>

      <p className="card-description" style={{ marginBottom: '1rem' }}>
        {hackathon.description}
      </p>

      <div style={{ fontSize: '0.85rem', color: '#4a5568', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <div>📅 <strong>Start:</strong> {hackathon.startDate}</div>
        <div>⏳ <strong>Deadline:</strong> {hackathon.deadline}</div>
        <div>👥 <strong>Team:</strong> {hackathon.teamType}</div>
      </div>

      <div className="project-footer" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          style={{ 
             background: 'none', border: 'none', color: '#718096', fontWeight: '500', cursor: 'pointer', padding: '5px' 
          }}
          onClick={handleDetailsClick}
        >
          View Details
        </button>

        {isRegistered ? (
          <button 
            disabled
            style={{ 
              padding: '0.5rem 1rem', 
              background: '#e2e8f0', 
              color: '#718096', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: '600',
              cursor: 'not-allowed'
            }}
          >
            Joined
          </button>
        ) : (
          <button 
            className="btn-primary"
            style={{ padding: '0.5rem 1rem' }}
            onClick={handleJoinClick}
          >
            Join Event
          </button>
        )}
      </div>
    </div>
  );
};

export default InternalHackathonCard;
