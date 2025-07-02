// // import React from 'react';
// // import ProfileMenu from './ProfileMenu';

// // function Navbar({ currentView, onNavigate, isAuthenticated, principal, onLogout, onLogin }) {
// //   const navStyle = (active) => ({
// //     marginRight: '20px',
// //     fontWeight: active ? 'bold' : 'normal',
// //     cursor: 'pointer',
// //     color: active ? 'black' : 'gray',
// //   });

// //   return (
// //     <nav
// //       style={{
// //         backgroundColor: '#eee',
// //         padding: '10px 20px',
// //         marginBottom: '20px',
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //       }}
// //     >
// //       <div>
// //         <span style={navStyle(currentView === 'mint')} onClick={() => onNavigate('mint')}>Mint Land</span>
// //         <span style={navStyle(currentView === 'market')} onClick={() => onNavigate('market')}>Marketplace</span>
// //         <span style={navStyle(currentView === 'my')} onClick={() => onNavigate('my')}>My Lands</span>
// //       </div>

// //       <div>
// //         {isAuthenticated ? (
// //           <ProfileMenu principal={principal} onLogout={onLogout} />
// //         ) : (
// //           <button onClick={onLogin}>Login</button>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;

// import React from 'react';
// import ProfileMenu from './ProfileMenu';

// function Navbar({ currentView, onNavigate, isAuthenticated, principal, onLogout, onLogin }) {
//   // navStyle is no longer needed as styles are handled by CSS classes
//   // const navStyle = (active) => ({
//   //   marginRight: '20px',
//   //   fontWeight: active ? 'bold' : 'normal',
//   //   cursor: 'pointer',
//   //   color: active ? 'black' : 'gray',
//   // });

//   return (
//     <nav className="navbar"> {/* Added class name */}
//       <div className="navbar-links"> {/* Added class name */}
//         <span
//           className={`nav-link ${currentView === 'mint' ? 'active' : ''}`} // Added class names
//           onClick={() => onNavigate('mint')}
//         >
//           Mint Land
//         </span>
//         <span
//           className={`nav-link ${currentView === 'market' ? 'active' : ''}`} // Added class names
//           onClick={() => onNavigate('market')}
//         >
//           Marketplace
//         </span>
//         <span
//           className={`nav-link ${currentView === 'my' ? 'active' : ''}`} // Added class names
//           onClick={() => onNavigate('my')}
//         >
//           My Lands
//         </span>
//       </div>

//       <div>
//         {isAuthenticated ? (
//           <ProfileMenu principal={principal} onLogout={onLogout} />
//         ) : (
//           <button onClick={onLogin}>Login</button>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';
import ProfileMenu from './ProfileMenu';

function Navbar({ currentView, onNavigate, isAuthenticated, principal, onLogout, onLogin }) {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand" onClick={() => onNavigate('mint')}>
        Land Registry
      </a>
      <div className="navbar-links">
        <span
          className={`nav-link ${currentView === 'mint' ? 'active' : ''}`}
          onClick={() => onNavigate('mint')}
        >
          Mint Land
        </span>
        <span
          className={`nav-link ${currentView === 'market' ? 'active' : ''}`}
          onClick={() => onNavigate('market')}
        >
          Marketplace
        </span>
        <span
          className={`nav-link ${currentView === 'my' ? 'active' : ''}`}
          onClick={() => onNavigate('my')}
        >
          My Lands
        </span>
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