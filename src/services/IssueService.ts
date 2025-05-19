import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API + "issues";

export const GetIssues = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Data recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al cargar los inconvenientes:", error);
        alert("Error al cargar inconvenientes");
        return [];
    }
};

export const CreateIssue = async (product: any) => {
    try {
        const response = await axios.post(API_URL, product);
        console.log("Incoveniente creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear inconveniente:", error);
        alert("Error al crear inconveniente");
        throw error;
    }
};

export const EditIssue = async (id: string, product: any) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, product);
        console.log("Incoveniente actualizado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar inconveniente:", error);
        alert("Error al actualizar producto");
        throw error;
    }
};

export const DeleteIssue = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log("Inconveniente eliminado correctamente");
        return true;
    } catch (error) {
        console.error("Error al eliminar inconveniente:", error);
        alert("Error al eliminar inconveniente");
        throw error;
    }
};