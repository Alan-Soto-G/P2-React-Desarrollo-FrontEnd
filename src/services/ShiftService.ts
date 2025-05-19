import GetInstanceAxios from '../components/authInstance';

const API_URL = import.meta.env.VITE_BACKEND_API + "shifts";

// Crear instancia autenticada
const instance = GetInstanceAxios({ API_URL });

export const GetShifts = async () => {
    try {
        const response = await instance.get('');
        console.log("Turnos recibidos:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al cargar turnos:", error);
        alert("Error al cargar turnos");
        return [];
    }
};

export const CreateShift = async (shift: any) => {
    try {
        const response = await instance.post('', shift);
        console.log("Turno creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear turno:", error);
        alert("Error al crear turno");
        throw error;
    }
};

export const EditShift = async (id: string, shift: any) => {
    try {
        const response = await instance.put(`/${id}`, shift);
        console.log("Turno actualizado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar turno:", error);
        alert("Error al actualizar turno");
        throw error;
    }
};

export const DeleteShift = async (id: string) => {
    try {
        const response = await instance.delete(`/${id}`);
        console.log("Turno eliminado correctamente");
        return true;
    } catch (error) {
        console.error("Error al eliminar turno:", error);
        alert("Error al eliminar turno");
        throw error;
    }
};