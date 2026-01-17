import React, { useState } from 'react';

const TeamChat = ({ chatHistory, currentUserName = 'You' }) => {
  const [messages, setMessages] = useState(chatHistory);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
        id: Date.now(),
        sender: currentUserName,
        text: newMessage,
        time: 'Just now'
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', background: '#f7fafc' }}>
        <h3 className="section-title" style={{ margin: 0, fontSize: '1.1rem' }}>💬 Team Chat</h3>
      </div>
      
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map(msg => {
            const isMe = msg.sender === currentUserName;
            return (
                <div key={msg.id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{ 
                        background: isMe ? '#5a67d8' : '#edf2f7', 
                        color: isMe ? 'white' : '#2d3748',
                        padding: '0.8rem 1rem', 
                        borderRadius: '12px',
                        borderBottomRightRadius: isMe ? '0' : '12px',
                        borderBottomLeftRadius: isMe ? '12px' : '0'
                    }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.2rem', opacity: 0.8 }}>{msg.sender}</div>
                        {msg.text}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#a0aec0', marginTop: '0.3rem', textAlign: isMe ? 'right' : 'left' }}>{msg.time}</div>
                </div>
            )
        })}
      </div>

      <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem' }}>
        <input 
            type="text" 
            className="form-input" 
            placeholder="Type a message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ marginBottom: 0 }}
        />
        <button type="submit" className="btn-primary" style={{ padding: '0 1.5rem' }}>Send</button>
      </form>
    </div>
  );
};

export default TeamChat;
