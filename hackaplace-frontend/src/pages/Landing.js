import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="header-content">
          <div className="logo">
            <h1>Hackaplace</h1>
          </div>
          <nav className="nav-buttons">
            <button className="btn-login" onClick={handleLogin}>Login</button>
            <button className="btn-register" onClick={handleRegister}>Register</button>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2>Welcome to Hackaplace</h2>
          <p>The ultimate platform for hackathons, innovation, and collaboration.</p>
          <button className="btn-primary" onClick={handleRegister}>Get Started</button>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h3>Why Choose Hackaplace?</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>Organize Hackathons</h4>
              <p>Create and manage hackathons with ease.</p>
            </div>
            <div className="feature-card">
              <h4>Team Collaboration</h4>
              <p>Form teams and work together on projects.</p>
            </div>
            <div className="feature-card">
              <h4>Judging & Evaluation</h4>
              <p>Fair and transparent evaluation process.</p>
            </div>
            <div className="feature-card">
              <h4>Community</h4>
              <p>Join a vibrant community of innovators.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <h3>About Hackaplace</h3>
          <p>Hackaplace is a comprehensive platform designed to bring together participants, organizers, and judges for an unparalleled hackathon experience. Whether you're looking to innovate, organize, or evaluate, Hackaplace has everything you need.</p>
        </div>
      </section>

      <section className="gallery">
        <div className="container">
          <h3>Hackathon Highlights</h3>
          <div className="gallery-grid">
            <div className="gallery-placeholder">
              <div className="placeholder-icon">💻</div>
              <p>Hackathon Coding</p>
            </div>
            <div className="gallery-placeholder">
              <div className="placeholder-icon">👥</div>
              <p>Team Collaboration</p>
            </div>
            <div className="gallery-placeholder">
              <div className="placeholder-icon">🏆</div>
              <p>Winning Projects</p>
            </div>
            <div className="gallery-placeholder">
              <div className="placeholder-icon">🚀</div>
              <p>Innovation Hub</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2026 Hackaplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
