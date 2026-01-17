import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfileView from '../../../components/dashboard/profile/ProfileView';
import ProfileSetupForm from '../../../components/dashboard/profile/ProfileSetupForm';
import { mockOrganizerProfile, mockOrganizerHackathons } from '../../../data/mockOrganizerData';

function OrganizerProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('hackaplace_organizer_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
        // Pre-fill with mock data if no local storage exists for simpler demo flow
        if (mockOrganizerProfile) {
            setProfile(mockOrganizerProfile);
            // Optionally save it immediately or wait for user edit
        }
    }
  }, []);

  const handleSaveProfile = (data) => {
    localStorage.setItem('hackaplace_organizer_profile', JSON.stringify(data));
    setProfile(data);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  // Calculate some dynamic stats
  const activeHackathons = (mockOrganizerHackathons || []).filter(h => h.status === 'Ongoing').length;
  const totalHackathons = (mockOrganizerHackathons || []).length;
  // Summing up total registrations/submissions across all mock hackathons
  const totalRegistrations = (mockOrganizerHackathons || []).reduce((acc, curr) => acc + (curr.registrationCount || 0), 0);
  
  const organizerStats = [
      { title: "Active Hackathons", value: activeHackathons, icon: "⚡" },
      { title: "Total Hackathons", value: totalHackathons, icon: "📅" },
      { title: "Total Registrations", value: totalRegistrations, icon: "👥" },
      { title: "Pending Reviews", value: "5", icon: "📝" }, // Mock pending
  ];

  return (
    <DashboardLayout 
      role="organizer" 
      title="Organizer Profile" 
      subtitle="Manage your organization profile and settings."
    >
        <div style={{ marginBottom: '2rem' }}>
            {isEditing ? (
                <ProfileSetupForm 
                    initialData={profile} 
                    onSave={handleSaveProfile} 
                    onCancel={profile ? cancelEditing : () => setIsEditing(false)}
                    role="organizer"
                />
            ) : (
                <>
                    {profile ? (
                        <ProfileView 
                            profile={profile} 
                            onEdit={startEditing} 
                            role="organizer" 
                            stats={organizerStats}
                        />
                    ) : (
                         // Fallback empty state if mock data was missing
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Welcome Organizer!</h3>
                            <button onClick={() => setIsEditing(true)} style={{
                                padding: '0.75rem 1.5rem',
                                background: '#3182ce',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}>
                                Create Organization Profile
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    </DashboardLayout>
  );
}

export default OrganizerProfile;
