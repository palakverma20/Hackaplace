import React, { useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { mockAnnouncements, mockOrganizerHackathons } from '../../../data/mockOrganizerData';
import { mockOrganizerProfile } from '../../../data/mockOrganizerData';
import './OrganizerDashboard.css'; // Reusing dashboard styles

const OrganizerAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [showModal, setShowModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'Global',
    hackathonId: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement({ ...newAnnouncement, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const announcement = {
      id: `a${Date.now()}`,
      ...newAnnouncement,
      date: new Date().toISOString(),
      author: mockOrganizerProfile.name,
      hackathonId: newAnnouncement.type === 'Global' ? null : newAnnouncement.hackathonId
    };
    
    setAnnouncements([announcement, ...announcements]);
    setShowModal(false);
    setNewAnnouncement({ title: '', content: '', type: 'Global', hackathonId: '' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  return (
    <DashboardLayout role="organizer">
      <div className="dashboard-content-wrapper">
        <div className="content-header">
          <div>
            <h1>Announcements</h1>
            <p>Manage announcements for your hackathons and global updates.</p>
          </div>
          <button className="primary-btn" onClick={() => setShowModal(true)}>
            + New Announcement
          </button>
        </div>

        <div className="evaluations-list-container"> {/* Reusing container style */}
          {announcements.length === 0 ? (
            <div className="empty-state">No announcements created yet.</div>
          ) : (
            <div className="announcements-grid">
               {/* Inline styles for grid for simplicity, or add to CSS later */}
               {announcements.map(announcement => (
                 <div key={announcement.id} style={{
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    border: '1px solid #eee',
                    marginBottom: '15px'
                 }}>
                   <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                     <h3 style={{margin: 0}}>{announcement.title}</h3>
                     <div>
                        <span style={{
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            backgroundColor: announcement.type === 'Global' ? '#e0e7ff' : '#d1fae5',
                            color: announcement.type === 'Global' ? '#4f46e5' : '#059669',
                            fontSize: '0.8rem',
                            marginRight: '10px'
                        }}>
                          {announcement.type} {announcement.type === 'Event' && ` - ${mockOrganizerHackathons.find(h => h.id === announcement.hackathonId)?.name || 'Unknown Event'}`}
                        </span>
                        <button 
                            onClick={() => handleDelete(announcement.id)}
                            style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer'}}
                        >
                            Delete
                        </button>
                     </div>
                   </div>
                   <p style={{color: '#555', marginBottom: '15px'}}>{announcement.content}</p>
                   <div style={{fontSize: '0.85rem', color: '#999'}}>
                     Posted on {new Date(announcement.date).toLocaleDateString()}
                   </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>New Announcement</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={newAnnouncement.title} 
                  onChange={handleInputChange} 
                  required 
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select 
                  name="type" 
                  value={newAnnouncement.type} 
                  onChange={handleInputChange} 
                  className="form-control"
                >
                  <option value="Global">Global</option>
                  <option value="Event">Event Specific</option>
                </select>
              </div>
              
              {newAnnouncement.type === 'Event' && (
                <div className="form-group">
                  <label>Select Event</label>
                  <select 
                    name="hackathonId" 
                    value={newAnnouncement.hackathonId} 
                    onChange={handleInputChange} 
                    required={newAnnouncement.type === 'Event'}
                    className="form-control"
                  >
                    <option value="">Select Hackathon</option>
                    {mockOrganizerHackathons.map(h => (
                      <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Content</label>
                <textarea 
                  name="content" 
                  value={newAnnouncement.content} 
                  onChange={handleInputChange} 
                  required 
                  rows="4"
                  className="form-control"
                ></textarea>
              </div>

              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary-btn">Post Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default OrganizerAnnouncements;

