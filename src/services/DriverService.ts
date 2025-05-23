import GetInstanceAxios from '../components/authInstance';

const API_URL = import.meta.env.VITE_BACKEND_API + "drivers";

// Crear una instancia de axios configurada
const instance = GetInstanceAxios({ API_URL });

export const GetDrivers = async () => {
    try {
        const response = await instance.get('');
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
        const response = await instance.post('', driver);
        console.log("Conductor creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear conductor:", error);
        alert("Error al crear conductor");
        throw error;
    }
};

// Modificado para aceptar string como ID y usar la instancia
export const UpdateDriver = async (id: string, driver: any) => {
    try {
        // Convertimos el id a número si la API lo requiere
        const numericId = parseInt(id, 10);
        
        const response = await instance.put(`/${numericId}`, driver);
        console.log("Conductor actualizado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar conductor:", error);
        alert("Error al actualizar conductor");
        throw error;
    }
};

// Modificado para aceptar string como ID y usar la instancia
export const DeleteDriver = async (id: string) => {
    try {
        // Convertimos el id a número si la API lo requiere
        const numericId = parseInt(id, 10);
        
        const response = await instance.delete(`/${numericId}`);
        console.log("Conductor eliminado correctamente");
        return true;
    } catch (error) {
        console.error("Error al eliminar conductor:", error);
        alert("Error al eliminar conductor");
        throw error;
    }
};
