import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import '../styles/NavBar.css';
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_API); // Ajusta la URL de tu backend

export default function NavBar() {
  const { user, logout, isAuthenticated } = useAuth0();
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    socket.on("new_notification", (data) => {
      console.log("Un nuevo pedido ha sido asignado");
      console.log("Notificación: " + notifications);
      setNotifications((prev) => prev + 1);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  return (
    <nav className="custom-navbar">
      <div className="navbar-left">
        <Link to="/home" className="logo"><img id="logo-navbar" src="../../public/logo.png" alt="logo antojito" /> El Antojito</Link>
        {/* Los links se han movido al sidebar */}
      </div>

      {isAuthenticated && user && (
        <div className="navbar-right">
          {/* Notificaciones */}
          <div className="notifications">
            <span className="bell">🔔</span>
            <span className="text">Notificaciones</span>
            {notifications > 0 && (
              <span className="notification-dot">
                {notifications}
              </span>
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