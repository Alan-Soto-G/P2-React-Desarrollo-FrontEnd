// src/pages/Home.tsx
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/loading";
import '../styles/Home.css';

export default function Home() {
  const { user, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loading />;

  if (!isAuthenticated) {
    alert("Debes iniciar sesión");
    logout({ logoutParams: { returnTo: window.location.origin } });
    return null;
  }

  return (
    <div className="home-content">
      <p>Correo: {user?.email}</p>
    </div>
  );
}
