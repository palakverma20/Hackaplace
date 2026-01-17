import React from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import ExternalHackathons from '../../ExternalHackathons';

function ParticipantExternal() {
  return (
    <DashboardLayout role="participant" title="External Hackathons" subtitle="AI-powered discovery.">
       {/* You might want to pass props or refactor ExternalHackathons to fit nicely if it has its own layout */}
       <div style={{ marginTop: '-2rem' }}> 
          {/* Negative margin to counteract dashboard padding if ExternalHackathons has its own header spacing */}
          <ExternalHackathons />
       </div>
    </DashboardLayout>
  );
}

export default ParticipantExternal;
