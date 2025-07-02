import React from 'react';

function Navbar({ currentView, onNavigate }) {
  const navStyle = (active) => ({
    marginRight: '20px',
    fontWeight: active ? 'bold' : 'normal',
    cursor: 'pointer',
    color: active ? 'black' : 'gray',
  });

  return (
    <nav style={{ backgroundColor: '#eee', padding: '10px', marginBottom: '20px' }}>
      <span style={navStyle(currentView === 'mint')} onClick={() => onNavigate('mint')}>Mint Land</span>
      <span style={navStyle(currentView === 'market')} onClick={() => onNavigate('market')}>Marketplace</span>
      <span style={navStyle(currentView === 'my')} onClick={() => onNavigate('my')}>My Lands</span>
    </nav>
  );
}

export default Navbar;

