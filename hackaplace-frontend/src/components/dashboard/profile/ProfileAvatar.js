import React from 'react';

const ProfileAvatar = ({ src, name, size = '100px', fontSize = '2rem' }) => {
  const getInitials = (n) => {
    if (!n) return '?';
    const split = n.split(' ');
    if (split.length === 1) return split[0].charAt(0).toUpperCase();
    return (split[0].charAt(0) + split[split.length - 1].charAt(0)).toUpperCase();
  };

  const getRandomColor = (n) => {
    let hash = 0;
    for (let i = 0; i < n.length; i++) {
        hash = n.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  const backgroundColor = name ? getRandomColor(name) : '#ccc';

  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: backgroundColor,
    color: '#fff',
    fontSize: fontSize,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  };

  if (src) {
    return <img src={src} alt={name || 'Profile'} style={{...style, backgroundColor: 'transparent'}} />;
  }

  return (
    <div style={style}>
      {getInitials(name || '')}
    </div>
  );
};

export default ProfileAvatar;
