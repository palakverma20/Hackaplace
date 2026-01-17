import React from 'react';

const ProjectTimeline = ({ timeline }) => {
  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)' }}>
       <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748' }}>Activity Log</h2>
       <div style={{ position: 'relative', borderLeft: '2px solid #e2e8f0', marginLeft: '0.6rem', paddingLeft: '1.5rem', paddingTop: '0.2rem' }}>
          {timeline.map((item, index) => (
              <div key={index} style={{ marginBottom: '1.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-2.05rem', top: '0.25rem', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#5a67d8', border: '3px solid white', boxShadow: '0 0 0 1px #e2e8f0' }}></div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2d3748', margin: 0, marginBottom: '0.2rem' }}>{item.event}</h4>
                  <span style={{ fontSize: '0.8rem', color: '#718096' }}>{item.date}</span>
              </div>
          ))}
       </div>
    </div>
  );
};

export default ProjectTimeline;