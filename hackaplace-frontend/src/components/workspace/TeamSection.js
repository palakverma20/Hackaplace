import React, { useState } from 'react';

const TeamSection = ({ team }) => {
  const [showManage, setShowManage] = useState(false);

  // Toggle for Management View (Leader Only)
  if (showManage && team.isLeader) {
     return (
       <div className="card" style={{ height: '100%' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
            <h3 className="section-title" style={{ margin: 0 }}>Team Management</h3>
            <button className="btn-secondary" onClick={() => setShowManage(false)} style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>Close</button>
         </div>
         
         <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Team Name</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" className="form-input" defaultValue={team.name} />
                <button className="btn-secondary">Update</button>
            </div>
         </div>

         <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Members</h4>
             <ul style={{ listStyle: 'none', padding: 0 }}>
              {team.members.map(member => (
                <li key={member.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                   <span>{member.name} <span style={{ color: '#718096', fontSize: '0.8rem' }}>({member.role})</span></span>
                   {member.role !== 'Leader' && <button style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>}
                </li>
              ))}
            </ul>
         </div>

         <div style={{ padding: '1rem', background: '#fff5f5', borderRadius: '6px', border: '1px solid #fed7d7' }}>
            <h4 style={{ color: '#c53030', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Danger Zone</h4>
             <button style={{ background: '#c53030', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Delete Team</button>
         </div>
       </div>
     )
  }

  // Standard View
  return (
    <div className="card" style={{ height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 className="section-title" style={{ margin: 0 }}>Team: {team.name}</h3>
        {team.isLeader && (
            <button 
                className="status-badge" 
                style={{ background: '#e2e8f0', color: '#2d3748', border: 'none', cursor: 'pointer' }}
                onClick={() => setShowManage(true)}
            >
                ⚙️ Manage
            </button>
        )}
      </div>

      <div style={{ marginBottom: '1.5rem', background: '#ebf8ff', padding: '1rem', borderRadius: '8px' }}>
         <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#2b6cb0', letterSpacing: '0.5px' }}>Team Code</span>
         <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2c5282', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {team.code}
            <button 
                onClick={() => alert('Code copied!')}
                style={{ background: 'none', border: 'none', color: '#2b6cb0', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
                Copy
            </button>
         </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '1rem', color: '#4a5568', fontSize: '1rem' }}>Members ({team.members.length})</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {team.members.map(member => (
            <li key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
               <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                 {member.name.charAt(0)}
               </div>
               <div>
                  <div style={{ fontWeight: '500', color: '#2d3748' }}>{member.name} {member.id === 'u1' && '(You)'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#718096' }}>{member.role}</div>
               </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamSection;
