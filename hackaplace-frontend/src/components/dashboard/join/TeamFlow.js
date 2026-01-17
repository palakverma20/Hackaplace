import React, { useState } from 'react';

const TeamFlow = ({ onBack, onComplete }) => {
  const [mode, setMode] = useState(null); // 'solo', 'team'
  const [teamAction, setTeamAction] = useState(null); // 'create', 'join'
  const [teamData, setTeamData] = useState({ name: '', code: '' });

  const handleFinish = () => {
    // Construct final payload based on choices
    const result = {
        mode,
        teamAction: mode === 'solo' ? null : teamAction,
        teamName: (mode === 'team' && teamAction === 'create') ? teamData.name : null,
        teamCode: (mode === 'team' && teamAction === 'join') ? teamData.code : null
    };

    if (mode === 'team') {
        if (teamAction === 'create' && !teamData.name) {
            alert("Please enter a team name.");
            return;
        }
        if (teamAction === 'join' && !teamData.code) {
            alert("Please enter a team code.");
            return;
        }
    }

    onComplete(result);
  };

  const renderInitialChoice = () => (
    <div className="team-choice-container">
      <h3>How would you like to participate?</h3>
      <div className="choice-cards">
        <div 
            className={`choice-card ${mode === 'solo' ? 'selected' : ''}`}
            onClick={() => { setMode('solo'); setTeamAction(null); }}
        >
            <h4>Go Solo</h4>
            <p>Participate individually. You can join a team later if allowed.</p>
        </div>
        <div 
            className={`choice-card ${mode === 'team' ? 'selected' : ''}`}
            onClick={() => setMode('team')}
        >
            <h4>Participate as a Team</h4>
            <p>Create a new team or join an existing one with a code.</p>
        </div>
      </div>
    </div>
  );

  const renderTeamOptions = () => (
    <div className="team-options-container">
        <h4>Team Options</h4>
        <div className="radio-group">
            <label>
                <input 
                    type="radio" 
                    name="teamAction" 
                    value="create" 
                    checked={teamAction === 'create'} 
                    onChange={() => setTeamAction('create')} 
                />
                Create a New Team
            </label>
            <label>
                <input 
                    type="radio" 
                    name="teamAction" 
                    value="join" 
                    checked={teamAction === 'join'} 
                    onChange={() => setTeamAction('join')} 
                />
                Join Existing Team
            </label>
        </div>

        <div className="team-input-area">
            {teamAction === 'create' && (
                <div className="form-group">
                    <label>Team Name</label>
                    <input 
                        type="text"
                        className="form-input" 
                        value={teamData.name} 
                        onChange={(e) => setTeamData({...teamData, name: e.target.value})}
                        placeholder="Enter cool team name"
                    />
                </div>
            )}
            {teamAction === 'join' && (
                <div className="form-group">
                    <label>Team Code</label>
                    <input 
                        type="text" 
                        className="form-input"
                        value={teamData.code} 
                        onChange={(e) => setTeamData({...teamData, code: e.target.value})}
                        placeholder="Enter 6-digit invite code"
                    />
                </div>
            )}
        </div>
    </div>
  );

  return (
    <div className="team-flow-wrapper">
      {renderInitialChoice()}
      
      {mode === 'team' && renderTeamOptions()}

      <div className="flow-actions" style={{marginTop: '30px', display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={onBack} className="btn-secondary">Back</button>
        {mode && (
            <button onClick={handleFinish} className="btn-primary">
                {mode === 'solo' ? 'Register as Individual' : (teamAction === 'create' ? 'Create Team & Register' : 'Join Team & Register')}
            </button>
        )}
      </div>

      <style jsx>{`
        .choice-cards { display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap; }
        .choice-card { 
            border: 2px solid #eee; padding: 20px; flex: 1; min-width: 250px; cursor: pointer; border-radius: 8px; transition: all 0.2s;
        }
        .choice-card:hover { border-color: #aaa; }
        .choice-card.selected { border-color: #007bff; background-color: #f0f7ff; }
        
        .radio-group { display: flex; gap: 20px; margin-bottom: 20px; }
        .radio-group label { cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 500; }
        .team-options-container { margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px; animation: fadeIn 0.3s; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .form-input { 
            width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; font-size: 1rem;
        }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: 600; }
      `}</style>
    </div>
  );
};

export default TeamFlow;
