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

  return (
    <>
      {!user ? (
        <div className='login-Buttons'>
          <GoogleLogin 
            onSuccess={handleSuccess} 
            onError={() => console.log("Login Failed")} 
            width={380}
          />
        </div>
      ) : (
        <>
          {window.location.href = 'http://localhost:5173/home'}
        </>
      )}
      </>
  );
};
export default LoginGoogle;