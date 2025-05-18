import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_API + "products";

export const GetProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("Data recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al cargar productos:", error);
        alert("Error al cargar productos");
        return [];
    }
};

export const CreateProduct = async (product: any) => {
    try {
        const response = await axios.post(API_URL, product);
        console.log("Producto creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear producto:", error);
        alert("Error al crear producto");
        throw error;
    }
};

export const EditProduct = async (id: string, product: any) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, product);
        console.log("Producto actualizado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        alert("Error al actualizar producto");
        throw error;
    }
};

export const DeleteProduct = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        console.log("Producto eliminado correctamente");
        return true;
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar producto");
        throw error;
    }
};