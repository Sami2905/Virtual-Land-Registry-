import React from 'react';

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#eee', padding: '10px', marginBottom: '20px' }}>
      <a style={{ marginRight: '20px', fontWeight: 'bold' }}>Mint Land</a>
      <a style={{ marginRight: '20px', color: 'gray' }}>Marketplace</a>
      <a style={{ color: 'gray' }}>My Lands</a>
    </nav>
  );
}

export default Navbar;
