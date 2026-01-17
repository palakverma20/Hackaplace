import React, { useState, useEffect } from 'react';
import ProfileAvatar from './ProfileAvatar';

const ProfileSetupForm = ({ initialData, onSave, onCancel, role = 'participant' }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        bio: '',
        email: '',
        contact: '',
        altContact: '',
        skills: '',
        expertise: '',
        organization: '',
        website: '',
        avatar: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full Name is required';
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        
        if (role === 'organizer' && !formData.organization?.trim()) {
             newErrors.organization = 'Organization name is required';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSave(formData);
    };

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '6px',
        border: '1px solid #e2e8f0',
        marginTop: '0.5rem',
        marginBottom: '1rem',
        fontSize: '1rem'
    };

    const labelStyle = {
        display: 'block',
        color: '#4a5568',
        fontWeight: '500',
        fontSize: '0.875rem'
    };

    const sectionStyle = {
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto'
    };

    return (
        <div style={sectionStyle}>
            <h2 style={{ marginBottom: '1.5rem', color: '#2d3748' }}>{initialData && initialData.username ? 'Edit Profile' : 'Set up Profile'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                    <ProfileAvatar src={formData.avatar} name={formData.name} size="80px" />
                    <div>
                         <label style={{...labelStyle, cursor: 'pointer', color: '#3182ce', textDecoration: 'underline'}}>
                             Change Photo
                             <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                         </label>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            style={{...inputStyle, borderColor: errors.name ? 'red' : '#e2e8f0'}} 
                        />
                        {errors.name && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '-0.5rem' }}>{errors.name}</p>}
                    </div>
                    <div>
                        <label style={labelStyle}>Username *</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            style={{...inputStyle, borderColor: errors.username ? 'red' : '#e2e8f0'}} 
                        />
                        {errors.username && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '-0.5rem' }}>{errors.username}</p>}
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Bio</label>
                    <textarea 
                        name="bio" 
                        value={formData.bio} 
                        onChange={handleChange} 
                        style={{...inputStyle, minHeight: '80px', fontFamily: 'inherit'}} 
                        placeholder="Tell us a bit about yourself..."
                    />
                </div>

                {role === 'organizer' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Organization *</label>
                            <input type="text" name="organization" value={formData.organization} onChange={handleChange} style={{...inputStyle, borderColor: errors.organization ? 'red' : '#e2e8f0'}} />
                             {errors.organization && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '-0.5rem' }}>{errors.organization}</p>}
                        </div>
                        <div>
                            <label style={labelStyle}>Website</label>
                            <input type="text" name="website" value={formData.website} onChange={handleChange} style={inputStyle} placeholder="https://..." />
                        </div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Contact Number</label>
                        <input type="text" name="contact" value={formData.contact} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Alt. Contact</label>
                        <input type="text" name="altContact" value={formData.altContact} onChange={handleChange} style={inputStyle} />
                    </div>
                </div>

                {role === 'participant' && (
                    <div>
                        <label style={labelStyle}>Skills (comma separated)</label>
                        <input 
                            type="text" 
                            name="skills" 
                            value={formData.skills} 
                            onChange={handleChange} 
                            style={inputStyle} 
                            placeholder="React, Java, Design, ..."
                        />
                    </div>
                )}

                {role === 'judge' && (
                    <div>
                        <label style={labelStyle}>Expertise Areas (comma separated)</label>
                        <input 
                            type="text" 
                            name="expertise" 
                            value={formData.expertise} 
                            onChange={handleChange} 
                            style={inputStyle} 
                            placeholder="AI/ML, Blockchain, UX, ..."
                        />
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    {onCancel && (
                        <button type="button" onClick={onCancel} style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            color: '#4a5568',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}>
                            Cancel
                        </button>
                    )}
                    <button type="submit" style={{
                         padding: '0.75rem 1.5rem',
                         background: '#3182ce',
                         color: 'white',
                         border: 'none',
                         borderRadius: '6px',
                         cursor: 'pointer',
                         fontWeight: '600'
                    }}>
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSetupForm;