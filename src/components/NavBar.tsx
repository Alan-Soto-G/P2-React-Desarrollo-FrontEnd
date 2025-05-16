// src/components/NavBar.tsx
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import '../styles/NavBar.css';

export default function NavBar() {
  const { user, logout, isAuthenticated } = useAuth0();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/conductores">Conductores</Link>
      </div>

      {isAuthenticated && user && (
        <div className="profile-box" onClick={() => setProfileOpen(!profileOpen)}>
          <img src={user.picture} alt="Perfil" className="profile-pic" />
          <span className="username">{user.name}</span>
          {profileOpen && (
            <div className="profile-dropdown">
              <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
