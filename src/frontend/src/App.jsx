import React, { useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { backend } from '../../declarations/backend';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [myLands, setMyLands] = useState([]);

  useEffect(() => {
    AuthClient.create().then(async (authClient) => {
      if (await authClient.isAuthenticated()) {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
        setPrincipal(principal);
        setIsAuthenticated(true);

        const authedCanister = backend;
        const lands = await authedCanister.get_my_land();
        setMyLands(lands);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  const login = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: 'https://identity.ic0.app/#authorize',
      onSuccess: async () => {
        window.location.reload(); // reload to refetch data
      },
    });
  };

  return (
    <div>
      <h1>🌍 Virtual Land Registry</h1>

      {isAuthenticated ? (
        <>
          <p>Logged in as: {principal}</p>
          <h2>My Lands</h2>
          <ul>
            {myLands.map((land, i) => (
              <li key={i}>
                #{land.id} - {land.name} ({land.coordinates.x},{land.coordinates.y})
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <button onClick={login}>Login with Internet Identity</button>
        </>
      )}
    </div>
  );
}

export default App;
