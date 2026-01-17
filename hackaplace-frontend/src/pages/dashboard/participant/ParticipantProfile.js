import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfileView from '../../../components/dashboard/profile/ProfileView';
import ProfileSetupForm from '../../../components/dashboard/profile/ProfileSetupForm';

function ParticipantProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Mock initial auth data for pre-fill
  const authUser = {
    name: "Alex Coder",
    email: "alex@example.com",
    avatar: "https://ui-avatars.com/api/?name=Alex+Coder&background=0D8ABC&color=fff"
  };

  useEffect(() => {
    const savedProfile = localStorage.getItem('hackaplace_user_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    // Else profile remains null -> Empty State
  }, []);

  const handleSaveProfile = (data) => {
    localStorage.setItem('hackaplace_user_profile', JSON.stringify(data));
    setProfile(data);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  return (
    <DashboardLayout 
      role="participant" 
      title="My Profile" 
      subtitle="Manage your personal information and settings."
    >
        <div style={{ marginBottom: '2rem' }}>
            {isEditing ? (
                <ProfileSetupForm 
                    initialData={profile || authUser} 
                    onSave={handleSaveProfile} 
                    onCancel={profile ? cancelEditing : () => setIsEditing(false)} 
                />
            ) : (
                <>
                    {profile ? (
                        <ProfileView profile={profile} onEdit={startEditing} />
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👋</div>
                            <h3 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Welcome to HackaPlace!</h3>
                            <p style={{ color: '#718096', marginBottom: '1.5rem' }}>Please set up your profile to get started with hackathons.</p>
                            <button onClick={() => setIsEditing(true)} style={{
                                padding: '0.75rem 1.5rem',
                                background: '#3182ce',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem'
                            }}>
                                Set up Profile
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    </DashboardLayout>
  );
}

export default ParticipantProfile;
