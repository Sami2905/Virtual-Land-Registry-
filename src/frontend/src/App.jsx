import React, { useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { backend } from '../../declarations/backend';
import Navbar from './components/Navbar';
import MintLandForm from './components/MintLandForm';
import { getIdentityProvider } from './identity';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);

  useEffect(() => {
    AuthClient.create().then(async (authClient) => {
      if (await authClient.isAuthenticated()) {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
        setPrincipal(principal);
        setIsAuthenticated(true);
      }
    });
  }, []);

  const login = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: getIdentityProvider(),
      onSuccess: () => window.location.reload(),
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />

      {isAuthenticated ? (
        <>
          <p>Logged in as: {principal}</p>
          <MintLandForm principal={principal} />
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
