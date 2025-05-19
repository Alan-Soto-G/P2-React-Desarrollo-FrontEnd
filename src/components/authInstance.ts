import axios from 'axios';
import type { AxiosInstance } from 'axios';

interface Props{
    API_URL:string;
}

const getAuthHeader = () => {
    const token = localStorage.getItem('auth_token');
    console.log('Token en authInstance:', token);
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const authHeaders = getAuthHeader();// Obtener el header de autorización

const GetInstanceAxios = ({ API_URL }: Props): AxiosInstance =>{
    const instance = axios.create({
        baseURL: API_URL, // URL base de la API
        timeout: 5000, // Timeout de 5 segundos
        headers: { // Headers por defecto
            'Content-Type': 'application/json', // Tipo de contenido
            ...authHeaders
        }
    });
    return instance;
}
export default GetInstanceAxios;