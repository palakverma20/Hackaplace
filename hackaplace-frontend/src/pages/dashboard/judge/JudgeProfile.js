import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ProfileView from '../../../components/dashboard/profile/ProfileView';
import ProfileSetupForm from '../../../components/dashboard/profile/ProfileSetupForm';
import { mockJudgeProfile, mockJudgeStats } from '../../../data/mockJudgeData';

const JudgeProfile = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
  
    useEffect(() => {
      const savedProfile = localStorage.getItem('hackaplace_judge_profile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
          // Use mock data as default
          setProfile(mockJudgeProfile);
      }
    }, []);
  
    const handleSaveProfile = (data) => {
      localStorage.setItem('hackaplace_judge_profile', JSON.stringify(data));
      setProfile(data);
      setIsEditing(false);
    };
  
    const judgeStats = [
        { title: "Evaluations Done", value: mockJudgeStats ? mockJudgeStats.completedEvaluations : 0, icon: "✅" },
        { title: "Pending", value: mockJudgeStats ? mockJudgeStats.pendingEvaluations : 0, icon: "⏳" },
        { title: "Assigned Events", value: mockJudgeStats ? mockJudgeStats.assignedHackathons : 0, icon: "📅" },
        { title: "Avg Score Given", value: mockJudgeStats ? mockJudgeStats.averageScoreGiven : 0, icon: "📊" },
    ];

    return (
        <DashboardLayout role="judge" title="My Judge Profile" subtitle="Manage your expertise and view stats.">
             <div style={{ marginBottom: '2rem' }}>
                {isEditing ? (
                    <ProfileSetupForm 
                        initialData={profile} 
                        onSave={handleSaveProfile} 
                        onCancel={() => setIsEditing(false)} 
                        role="judge"
                    />
                ) : (
                    profile ? (
                        <ProfileView 
                            profile={profile} 
                            onEdit={() => setIsEditing(true)} 
                            role="judge"
                            stats={judgeStats}
                        />
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Welcome Judge!</h3>
                            <button onClick={() => setIsEditing(true)} style={{
                                padding: '0.75rem 1.5rem',
                                background: '#3182ce',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}>
                                Create Profile
                            </button>
                        </div>
                    )
                )}
            </div>
        </DashboardLayout>
    );
};

export default JudgeProfile;
