import './Logingoogle.css';
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface GoogleUser {
  name: string;
  picture: string;
  email?: string;
  // Otros campos opcionales pueden agregarse aquí (sub, given_name, family_name, etc.)
}

const LoginGoogle: React.FC = () => {
  const [user, setUser] = useState<GoogleUser | null>(null);

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode<GoogleUser>(credentialResponse.credential);
      setUser(decoded);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="center">
      <h1>Login</h1>
      {!user ? (
        <GoogleLogin 
          onSuccess={handleSuccess} 
          onError={() => console.log("Login Failed")} 
        />
      ) : (
        <div className="profile">
          <img src={user.picture} alt="profile" />
          <h3>{user.name}</h3>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default LoginGoogle;
