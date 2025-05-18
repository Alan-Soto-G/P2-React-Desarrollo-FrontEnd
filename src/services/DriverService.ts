// services/DriverService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API + "drivers";

export const GetDrivers = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Data recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al cargar conductores:", error);
        alert("Error al cargar conductores");
        return [];
    }
};

export const CreateDriver = async (driver: any) => {
    try {
        const response = await axios.post(API_URL, driver);
        console.log("Conductor creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear conductor:", error);
        alert("Error al crear conductor");
        throw error;
    }
};

// Modificado para aceptar string como ID
export const UpdateDriver = async (id: string, driver: any) => {
    try {
        // Convertimos el id a número si la API lo requiere
        const numericId = parseInt(id, 10);
        
        const response = await axios.put(`${API_URL}/${numericId}`, driver);
        console.log("Conductor actualizado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar conductor:", error);
        alert("Error al actualizar conductor");
        throw error;
    }
};

// Modificado para aceptar string como ID
export const DeleteDriver = async (id: string) => {
    try {
        // Convertimos el id a número si la API lo requiere
        const numericId = parseInt(id, 10);
        
        const response = await axios.delete(`${API_URL}/${numericId}`);
        console.log("Conductor eliminado correctamente");
        return true;
    } catch (error) {
        console.error("Error al eliminar conductor:", error);
        alert("Error al eliminar conductor");
        throw error;
    }
};
