import React from 'react';
import ProfileAvatar from './ProfileAvatar';
import DashboardCard from '../DashboardCard';

const ProfileView = ({ profile, onEdit, role = 'participant', stats = [] }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                padding: '2rem', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                     <ProfileAvatar src={profile.avatar} name={profile.name} size="120px" />
                     <div style={{ flex: 1 }}>
                        <h2 style={{ margin: '0 0 0.5rem 0', color: '#2d3748', fontSize: '1.8rem' }}>{profile.name}</h2>
                        {profile.username && <p style={{ margin: '0 0 0.5rem 0', color: '#718096', fontWeight: '500' }}>@{profile.username}</p>}
                        {profile.organization && <p style={{ margin: '0 0 0.25rem 0', color: '#4a5568', fontWeight: 'bold' }}>🏢 {profile.organization}</p>}
                        {profile.bio && <p style={{ margin: '0 0 1rem 0', color: '#4a5568', fontStyle: 'italic' }}>{profile.bio}</p>}
                        
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button onClick={onEdit} style={{
                                padding: '0.5rem 1rem',
                                background: '#3182ce',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}>
                                Edit Profile
                            </button>
                        </div>
                     </div>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#718096', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>Contact Information</h4>
                        <div style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> {profile.email}</div>
                        {profile.contact && <div style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> {profile.contact}</div>}
                        {profile.website && <div style={{ marginBottom: '0.5rem' }}><strong>Website:</strong> <a href={profile.website} target="_blank" rel="noreferrer" style={{color: '#3182ce'}}>{profile.website}</a></div>}
                    </div>
                    {role !== 'organizer' && (
                        <div>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#718096', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                                {role === 'judge' ? 'Expertise' : 'Skills'}
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {(role === 'judge' ? profile.expertise : profile.skills) && (role === 'judge' ? profile.expertise : profile.skills).split(',').map((item, index) => (
                                    <span key={index} style={{
                                        background: '#edf2f7',
                                        color: '#2d3748',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.875rem'
                                    }}>
                                        {item.trim()}
                                    </span>
                                ))}
                                {!(role === 'judge' ? profile.expertise : profile.skills) && <span style={{ color: '#a0aec0' }}>Not listed</span>}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <section className="dashboard-section">
                <h2 className="section-title">Your Stats</h2>
                <div className="dashboard-grid">
                    {stats && stats.length > 0 ? (
                        stats.map((stat, index) => (
                            <DashboardCard 
                                key={index}
                                title={stat.title} 
                                stat={stat.value} 
                                icon={stat.icon} 
                                onClick={stat.link ? () => {} : undefined} 
                            />
                        ))
                    ) : (
                         <div style={{color: '#718096', fontStyle: 'italic'}}>No statistics available yet.</div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ProfileView;