import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/loading";

export default function Home() {
    const { user, logout, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <Loading/>
    }

    if (!isAuthenticated) {
        alert("Debes iniciar sesión");
        logout({ logoutParams: { returnTo: window.location.origin } });
        return null;
    }

    return (
        <div>
            <h1>Bienvenido {user?.name}</h1>
            <p>Correo: {user?.email}</p>
            <img src={user?.picture} alt="Foto de perfil" width={100} />
            <br />
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Cerrar sesión
            </button>
        </div>
    );
}
