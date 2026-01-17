import React from 'react';

const EventOverview = ({ event }) => {
  const steps = [
    { label: 'Registration', isActive: true, isCompleted: true },
    { label: 'Team Formation', isActive: event.phase === 'TeamFormation' || event.phase === 'Submission' || event.phase === 'Evaluation', isCompleted: event.phase !== 'TeamFormation' && event.phase !== 'Registration' },
    { label: 'Submission', isActive: event.phase === 'Submission' || event.phase === 'Evaluation', isCompleted: event.phase === 'Evaluation' || event.phase === 'Completed' },
    { label: 'Evaluation', isActive: event.phase === 'Evaluation' || event.phase === 'Completed', isCompleted: event.phase === 'Completed' }
  ];

  return (
    <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, #4c51bf, #667eea)', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{event.eventName}</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '15px', fontSize: '0.9rem' }}>
              {event.status}
            </span>
            <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              Current Phase: <strong>{event.phase.replace(/([A-Z])/g, ' $1').trim()}</strong>
            </span>
          </div>
        </div>
        
        <div style={{ textAlign: 'right', fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px' }}>
          <div style={{ marginBottom: '0.3rem' }}>📅 Start: {event.timeline.start}</div>
          <div style={{ marginBottom: '0.3rem' }}>⚠️ Deadline: {event.timeline.deadline}</div>
          <div>🏆 Evaluation: {event.timeline.evaluation}</div>
        </div>
      </div>

      {/* Simplified Progress Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
         {/* Line */}
        <div style={{ position: 'absolute', top: '15px', left: '0', right: '0', height: '2px', background: 'rgba(255,255,255,0.3)', zIndex: 0 }}></div>
        
        {steps.map((step, idx) => (
          <div key={idx} style={{ position: 'relative', zIndex: 1, textAlign: 'center', flex: 1 }}>
            <div style={{ 
              width: '30px', height: '30px', borderRadius: '50%', 
              background: step.isCompleted ? '#48bb78' : (step.isActive ? 'white' : 'rgba(255,255,255,0.3)'),
              color: step.isActive && !step.isCompleted ? '#4c51bf' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', margin: '0 auto 0.5rem auto'
            }}>
              {step.isCompleted ? '✓' : idx + 1}
            </div>
            <span style={{ fontSize: '0.8rem', opacity: step.isActive ? 1 : 0.6, fontWeight: step.isActive ? 'bold' : 'normal' }}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventOverview;
