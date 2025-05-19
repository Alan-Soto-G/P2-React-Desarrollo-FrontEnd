import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_API + "restaurants";
import GetInstanceAxios from '../components/authInstance';

const instance = GetInstanceAxios({ API_URL });

export const GetRestaurants = async () => {
    try {
        const response = await instance.get('');
        console.log("Data recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al cargar restaurantes:", error);
        alert("Error al cargar restaurantes");
        return [];
    }
};

export const CreateRestaurant = async (restaurant: any) => {
    try {
        const response = await instance.post('', restaurant);
        console.log("Restaurante creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear restaurante:", error);
        alert("Error al crear restaurante");
        throw error;
    }
};

export const EditRestaurant = async (id: string, restaurant: any) => {
    try {
        const response = await instance.put(`/${id}`, restaurant);
        console.log("Restaurante actualizado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar restaurante:", error);
        alert("Error al actualizar restaurante");
        throw error;
    }
};

export const DeleteRestaurant = async (id: string) => {
    try {
        const response = await instance.delete(`/${id}`);
        console.log("Restaurante eliminado correctamente");
        return true;
    } catch (error) {
        console.error("Error al eliminar restaurante:", error);
        alert("Error al eliminar restaurante");
        throw error;
    }
};