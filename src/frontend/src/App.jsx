import React, { useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { backend } from "../../declarations/backend";
import Navbar from "./components/Navbar";
import MintLandForm from "./components/MintLandForm";
import MyLands from "./components/MyLands";
import { getIdentityProvider } from "./identity";
import { createActor } from "./actor";
import Marketplace from "./components/Marketplace";

function App() {
  const [authClient, setAuthClient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [backendActor, setBackendActor] = useState(null);
  const [view, setView] = useState("mint");

  // Common logic to set authenticated user
  const setAuthenticatedUser = (identity) => {
    try {
      const principalId = identity.getPrincipal().toText();
      const actor = createActor(identity);

      setPrincipal(principalId);
      setIsAuthenticated(true);
      setBackendActor(actor);
    } catch (error) {
      console.error("Authentication setup failed:", error);
    }
  };

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      if (await client.isAuthenticated()) {
        const identity = client.getIdentity();
        setAuthenticatedUser(identity);
      }
    });
  }, []);

  const login = async () => {
    await authClient.login({
      identityProvider: getIdentityProvider(),
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        setAuthenticatedUser(identity);
      },
    });
  };

  const logout = async () => {
    await authClient.logout();
    setPrincipal(null);
    setIsAuthenticated(false);
    setBackendActor(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Navbar
        currentView={view}
        onNavigate={setView}
        isAuthenticated={isAuthenticated}
        principal={principal}
        onLogin={login}
        onLogout={logout}
      />

      {!isAuthenticated ? (
        <p>You are not logged in.</p>
      ) : (
        <>
          {view === "mint" && (
            <MintLandForm principal={principal} backend={backendActor} />
          )}
          {view === "my" && (
            <MyLands principal={principal} backend={backendActor} />
          )}
          {view === "market" && (
            <Marketplace principal={principal} backend={backendActor} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
