import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface AuthContextProps {
    token: string | null;
    getToken: () => Promise<string | null>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Al cargar, intentar recuperar el token del localStorage
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
            setToken(storedToken);
        }
        
        const fetchToken = async () => {
            if (isAuthenticated) {
                try {
                    const accessToken = await getAccessTokenSilently();
                    setToken(accessToken);
                    // Guardar el token en localStorage
                    localStorage.setItem('auth_token', accessToken);
                } catch (error) {
                    console.error('Error obteniendo el token:', error);
                    setToken(null);
                }
            }
        };

        fetchToken();
    }, [getAccessTokenSilently, isAuthenticated]);

    const getToken = async () => {
        // Primero intentar usar el token del estado
        if (token) return token;
        
        // Si no está en el estado, intentar recuperarlo del localStorage
        const storedToken = localStorage.getItem('auth_token');
        if (storedToken) {
            setToken(storedToken);
            return storedToken;
        }
        
        // Si no está en localStorage y el usuario está autenticado, obtenerlo de nuevo
        if (isAuthenticated) {
            try {
                const accessToken = await getAccessTokenSilently();
                setToken(accessToken);
                localStorage.setItem('auth_token', accessToken);
                return accessToken;
            } catch (error) {
                console.error('Error obteniendo el token:', error);
                return null;
            }
        }
        return null;
    };

    return (
        <AuthContext.Provider value={{ token, getToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};