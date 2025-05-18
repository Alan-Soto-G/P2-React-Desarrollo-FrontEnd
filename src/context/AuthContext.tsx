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
        const fetchToken = async () => {
            if (isAuthenticated) {
                try {
                    const accessToken = await getAccessTokenSilently();
                    setToken(accessToken);
                } catch (error) {
                    console.error('Error obteniendo el token:', error);
                    setToken(null);
                }
            }
        };

        fetchToken();
    }, [getAccessTokenSilently, isAuthenticated]);

    const getToken = async () => {
        if (token) return token;
        if (isAuthenticated) {
            try {
                const accessToken = await getAccessTokenSilently();
                setToken(accessToken);
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