import React from 'react';
import './Dashboard.css';

const DashboardCard = ({ icon, title, description, onClick, stat, href }) => {
  const Component = href ? 'a' : 'div';
  
  return (
    <Component 
      className={`dashboard-card ${stat ? 'stat-card' : ''}`} 
      onClick={onClick}
      href={href}
      style={{ cursor: (onClick || href) ? 'pointer' : 'default', textDecoration: 'none' }}
    >
      {icon && <div className="card-icon">{icon}</div>}
      {stat && <div className="card-stat">{stat}</div>}
      <h3 className="card-title">{title}</h3>
      {description && <p className="card-description">{description}</p>}
    </Component>
  );
};

export default DashboardCard;
