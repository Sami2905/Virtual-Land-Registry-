import React from 'react';
import ProfileMenu from './ProfileMenu';

function Navbar({ currentView, onNavigate, isAuthenticated, principal, onLogout, onLogin }) {
  const navStyle = (active) => ({
    marginRight: '20px',
    fontWeight: active ? 'bold' : 'normal',
    cursor: 'pointer',
    color: active ? 'black' : 'gray',
  });

  return (
    <nav
      style={{
        backgroundColor: '#eee',
        padding: '10px 20px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <span style={navStyle(currentView === 'mint')} onClick={() => onNavigate('mint')}>Mint Land</span>
        <span style={navStyle(currentView === 'market')} onClick={() => onNavigate('market')}>Marketplace</span>
        <span style={navStyle(currentView === 'my')} onClick={() => onNavigate('my')}>My Lands</span>
      </div>

      <div>
        {isAuthenticated ? (
          <ProfileMenu principal={principal} onLogout={onLogout} />
        ) : (
          <button onClick={onLogin}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
