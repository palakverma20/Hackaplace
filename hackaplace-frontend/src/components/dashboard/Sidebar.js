import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  // Define links for each role
  const getLinks = () => {
    switch (role) {
      case 'participant':
        return [
          { icon: '🏠', label: 'Dashboard', path: '/dashboard/participant' },
          { icon: '🚀', label: 'Join Hackathon', path: '/dashboard/participant/internal-hackathons' },
          { icon: '👤', label: 'My Profile', path: '/dashboard/participant/profile' },
          { icon: '🔖', label: 'Bookmarks', path: '/dashboard/participant/bookmarks' },
          { icon: '🌍', label: 'External Hackathons', path: '/dashboard/participant/external' },
        ];
      case 'organizer':
        return [
          { icon: '📊', label: 'Dashboard Home', path: '/dashboard/organizer' },
          { icon: '🚀', label: 'My Hackathons', path: '/dashboard/organizer/hackathons' },
          { icon: '➕', label: 'Create Hackathon', path: '/dashboard/organizer/create-hackathon' },
          { icon: '👥', label: 'Participants', path: '/dashboard/organizer/participants' },
          { icon: '📥', label: 'Submissions', path: '/dashboard/organizer/submissions' },
          { icon: '⚖️', label: 'Evaluations', path: '/dashboard/organizer/evaluations' },
          { icon: '📢', label: 'Announcements', path: '/dashboard/organizer/announcements' },
          { icon: '👤', label: 'Profile', path: '/dashboard/organizer/profile' },
        ];
      case 'judge':
        return [
          { icon: '🏠', label: 'Dashboard Home', path: '/dashboard/judge' },
          { icon: '📋', label: 'Assigned Hackathons', path: '/dashboard/judge/hackathons' },
          { icon: '⚖️', label: 'Pending Evaluations', path: '/dashboard/judge/evaluations' },
          { icon: '✅', label: 'Completed', path: '/dashboard/judge/completed' },
          { icon: '👤', label: 'Profile', path: '/dashboard/judge/profile' },
        ];
      case 'admin':
        return [
          { icon: '🛠️', label: 'Control Panel', path: '/dashboard/admin' },
          { icon: '👥', label: 'Users', path: '/dashboard/admin/users' },
          { icon: '📅', label: 'Hackathons', path: '/dashboard/admin/hackathons' },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <a href="/" className="sidebar-brand">
          🚀 Hackaplace
        </a>
        <span className="user-role-badge">{role}</span>
      </div>

      <nav className="sidebar-nav">
        {links.map((link, index) => (
          <div 
            key={index}
            className={`nav-item ${isActive(link.path) ? 'active' : ''}`}
            onClick={() => navigate(link.path)}
          >
            <span className="nav-icon">{link.icon}</span>
            <span>{link.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
