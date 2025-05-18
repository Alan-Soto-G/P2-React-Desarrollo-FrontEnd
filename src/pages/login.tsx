import { useAuth0 } from "@auth0/auth0-react";
import "../styles/login.css"
import LogoGoogle from "../assets/google.png"
import LogoGitHub from "../assets/gitHub.png"
import LogoMicrosoft from "../assets/microsoft.png"

export default function Login() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div id="login-container">
            <div id="card-login">
                <div id="tittle">
                    <img src=".././public/logo.png" alt="logo" id="logo"/>
                    <h1 id="tittle-h">El Antojito</h1>
                </div>
                <button onClick={() => loginWithRedirect({ authorizationParams: { connection: "google-oauth2" } })} className="login-button google-btn">
                    <img src={LogoGoogle} alt="logo-google" className="img-btn"/>
                    Iniciar sesión con Google
                </button>
                <button onClick={() => loginWithRedirect({ authorizationParams: { connection: "github" } })} className="login-button github-btn">
                    <img src={LogoGitHub} alt="logo-github" className="img-btn"/>
                    Iniciar sesión con Github
                </button>
                <button onClick={() => loginWithRedirect({ authorizationParams: { connection: "windowslive" } })} className="login-button microsoft-btn">
                    <img src={LogoMicrosoft} alt="logo-microsoft" className="img-btn"/>
                    Iniciar sesión Microsoft
                </button>
            </div>
        </div>
    );
}