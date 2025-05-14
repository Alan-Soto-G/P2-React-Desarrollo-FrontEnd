// src/components/NavBar.tsx
import '../styles/NavBar.css';
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Login</Link>
        <Link to="/conductores">Conductores</Link>
        <Link to="/conductores/nuevo">Nuevo Conductor</Link>
      </div>
    </nav>
  );
}
