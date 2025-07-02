import React from "react";
import ProfileMenu from "./ProfileMenu";

function Navbar({
  currentView,
  onNavigate,
  isAuthenticated,
  principal,
  onLogout,
  onLogin,
}) {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand" onClick={() => onNavigate("mint")}>
        Land Registry
      </a>
      <div className="navbar-links">
        <span
          className={`nav-link ${currentView === "mint" ? "active" : ""}`}
          onClick={() => onNavigate("mint")}
        >
          Mint Land
        </span>
        <span
          className={`nav-link ${currentView === "market" ? "active" : ""}`}
          onClick={() => onNavigate("market")}
        >
          Marketplace
        </span>
        <span
          className={`nav-link ${currentView === "my" ? "active" : ""}`}
          onClick={() => onNavigate("my")}
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
