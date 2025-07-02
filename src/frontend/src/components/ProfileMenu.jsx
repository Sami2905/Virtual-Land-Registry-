import React, { useState } from 'react';

function ProfileMenu({ principal, onLogout }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const truncatePrincipal = (id) => id.slice(0, 5) + '...' + id.slice(-3);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div
        onClick={toggle}
        style={{
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          backgroundColor: '#aaa',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
        }}
        title="Account"
      >
        👤
      </div>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: 0,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: '10px',
            width: '220px',
            zIndex: 10,
          }}
        >
          <p><strong>Principal:</strong><br />{truncatePrincipal(principal)}</p>
          <button onClick={onLogout} style={{ marginTop: '10px' }}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
