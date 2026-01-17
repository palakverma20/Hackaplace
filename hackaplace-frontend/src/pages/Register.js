import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-card">
        {/* App Title */}
        <h1 className="register-title">Hackaplace</h1>
        <p className="register-tagline">Create your Hackaplace account</p>

        {/* Register Form */}
        <form className="register-form">
          <div>
            <input 
              type="text" 
              className="register-input"
              placeholder="Full Name" 
              required 
            />
          </div>
          <div>
            <input 
              type="email" 
              className="register-input"
              placeholder="Email address" 
              required 
            />
          </div>
          <div>
            <input 
              type="password" 
              className="register-input"
              placeholder="Password" 
              required 
            />
          </div>
          <div>
            <input 
              type="password" 
              className="register-input"
              placeholder="Confirm Password" 
              required 
            />
          </div>
          
          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {/* Footer Link */}
        <div className="register-footer">
          Already have an account? 
          <a href="/login" className="login-link">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
