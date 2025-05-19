import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import '../styles/NavBar.css';

export default function NavBar() {
  const { user, logout, isAuthenticated } = useAuth0();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Tienes notificaciones nuevas" },
    { id: 2, text: "Tienes notificaciones nuevas" }
  ]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-left">
        <Link to="/home" className="logo"><img id="logo-navbar" src="../../public/logo.png" alt="logo antojito" /> El Antojito</Link>
        {/* Los links se han movido al sidebar */}
      </div>

      {isAuthenticated && user && (
        <div className="navbar-right">
          {/* Notificaciones */}
          <div className="notifications" onClick={toggleNotifications}>
            <span className="bell">🔔</span>
            <span className="text">Notificaciones</span>
            {notifications.length > 0 && <span className="notification-dot"></span>}

            {showNotifications && (
              <div className="notifications-dropdown">
                {notifications.length > 0 ? (
                  <>
                    <div className="notification-info">Tienes nuevas notificaciones.</div>
                    {notifications.map((n) => (
                      <div key={n.id} className="notification-item">
                        {n.text}
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="notification-item empty">
                    ¡Sin notificaciones por ahora! 🎉
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Perfil y logout */}
          <div className="profile">
            <img src={user.picture} alt="Perfil" className="profile-pic" />
            <span className="username">{user.name}</span>
          </div>

          <button
            className="logout-button"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            ⏻
          </button>
        </div>
      )}
    </nav>
  );
}
