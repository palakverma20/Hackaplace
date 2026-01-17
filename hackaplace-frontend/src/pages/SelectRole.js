import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import './SelectRole.css';

const SelectRole = () => {
    const navigate = useNavigate();
    
    const handleRoleSelect = async (role) => {
        const user = auth.currentUser;
        
        if (!user) {
            alert('No user found, please login again');
            navigate('/login');
            return;
        }

        try {
            // Save role to Local Storage instead of Firestore
            const userData = {
                uid: user.uid,
                email: user.email,
                role: role,
                displayName: user.displayName || user.email.split('@')[0],
                photoURL: user.photoURL || '',
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem(`user_${user.uid}`, JSON.stringify(userData));

            // Redirect to appropriate dashboard
            navigate(`/dashboard/${role}`);
        } catch (error) {
            console.error("Error saving role:", error);
            alert("Failed to save role. Please try again.");
        }
    };

    return (
        <div className="role-container">
            <h1 className="role-title">Select Your Role</h1>
            <p className="role-subtitle">Choose how you want to participate in Hackaplace</p>
            
            <div className="role-cards">
                <button 
                    className="role-card participant"
                    onClick={() => handleRoleSelect('participant')}
                >
                    <h2>Participant</h2>
                    <p>Join hackathons, form teams, and submit projects.</p>
                </button>

                <button 
                    className="role-card organizer"
                    onClick={() => handleRoleSelect('organizer')}
                >
                    <h2>Organizer</h2>
                    <p>Create and manage hackathon events.</p>
                </button>

                <button 
                    className="role-card judge"
                    onClick={() => handleRoleSelect('judge')}
                >
                    <h2>Judge</h2>
                    <p>Evaluate submissions and give feedback.</p>
                </button>
            </div>
        </div>
    );
};

export default SelectRole;
