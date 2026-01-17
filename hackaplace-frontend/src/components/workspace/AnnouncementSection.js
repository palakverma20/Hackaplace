import React from 'react';
import { mockAnnouncements } from '../../data/mockOrganizerData';
import './AnnouncementSection.css';

const AnnouncementSection = ({ hackathonId }) => {
  // Filter announcements for Global or specific to this hackathon
  const announcements = mockAnnouncements.filter(
    (a) => a.type === 'Global' || (a.type === 'Event' && a.hackathonId === hackathonId)
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="announcement-section">
      <h3>Announcements</h3>
      {announcements.length === 0 ? (
        <p className="no-announcements">No announcements yet.</p>
      ) : (
        <div className="announcement-list">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="announcement-card">
              <div className="announcement-header">
                <h4>{announcement.title}</h4>
                <span className="announcement-date">
                  {new Date(announcement.date).toLocaleDateString()} {new Date(announcement.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="announcement-content">{announcement.content}</p>
              <div className="announcement-footer">
                <span className={`announcement-tag ${announcement.type.toLowerCase()}`}>
                  {announcement.type}
                </span>
                <span className="announcement-author">By {announcement.author}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementSection;
