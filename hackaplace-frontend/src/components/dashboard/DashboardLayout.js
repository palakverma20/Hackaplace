import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';

const DashboardLayout = ({ children, role, title, subtitle }) => {
  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">{title}</h1>
          {subtitle && <p className="dashboard-subtitle">{subtitle}</p>}
        </header>
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
