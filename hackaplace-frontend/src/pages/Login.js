import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const checkUserRoleAndRedirect = async (user) => {
    try {
      // Check Local Storage for user data instead of Firestore
      const storedData = localStorage.getItem(`user_${user.uid}`);

      if (storedData) {
        const userData = JSON.parse(storedData);
        if (userData.role) {
          // User exists and has a role -> Go to dashboard
          navigate(`/dashboard/${userData.role}`);
          return;
        }
      }
      
      // User is new or has no role -> Go to select role
      navigate('/select-role');
    } catch (error) {
      console.error("Error checking user data:", error);
      // Fallback: Default to selection page
      navigate('/select-role');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Authenticated User:", user);
      // Removed alert to streamline flow
      await checkUserRoleAndRedirect(user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert(`Login Failed: ${error.message}`);
    }
  };

  // Optional: You can implement a similar check for email/password login success
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    // Placeholder logic for demo: Login assumes success for now in email flow
    // or redirects. For real auth, integrate createUserWithEmailAndPassword
    alert("Email/Password login not fully wired in this demo. Please use Google Login.");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* App Title */}
        <h1 className="login-title">Hackaplace</h1>
        <p className="login-tagline">Welcome back, hacker!</p>

        {/* Login Form */}
        <form className="login-form" onSubmit={handleEmailLogin}>
          <div>
            <input 
              type="email" 
              className="form-input"
              placeholder="Email address" 
              required 
            />
          </div>
          <div>
            <input 
              type="password" 
              className="form-input"
              placeholder="Password" 
              required 
            />
          </div>
          
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>


        <div className="divider">OR</div>

        <button 
          type="button" 
          className="google-button"
          onClick={handleGoogleSignIn}
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google logo" 
            width="18" 
            height="18" 
          />
          Continue with Google
        </button>

        {/* Footer Link */}
        <div className="login-footer">
          Don't have an account? 
          <a href="/register" className="create-account-link">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
