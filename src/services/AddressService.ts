import GetInstanceAxios from '../components/authInstance';

const API_URL = import.meta.env.VITE_BACKEND_API + "addresses";

// Crear instancia autenticada
const instance = GetInstanceAxios({ API_URL });

export const GetAddresses = async () => {
    try {
        const response = await instance.get('');
        console.log("Data recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al cargar direcciones:", error);
        alert("Error al cargar direcciones");
        return [];
    }
};

export const GetAddressById = async (id: string) => {
    try {
        const response = await instance.get(`/${id}`);
        console.log("Dirección obtenida:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener dirección:", error);
        alert("Error al obtener dirección");
        throw error;
    }
};

export const CreateAddress = async (address: any) => {
    try {
        const response = await instance.post('', address);
        console.log("Dirección creada:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear dirección:", error);
        alert("Error al crear dirección");
        throw error;
    }
};

export const EditAddress = async (id: string, address: any) => {
    try {
        const response = await instance.put(`/${id}`, address);
        console.log("Dirección actualizada:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar dirección:", error);
        alert("Error al actualizar dirección");
        throw error;
    }
};

export const DeleteAddress = async (id: string) => {
    try {
        await instance.delete(`/${id}`);
        console.log("Dirección eliminada correctamente");
        return true;
    } catch (error) {
        console.error("Error al eliminar dirección:", error);
        alert("Error al eliminar dirección");
        throw error;
    }
};
