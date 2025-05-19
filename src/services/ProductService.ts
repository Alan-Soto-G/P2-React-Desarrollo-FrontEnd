import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_API + "products";
import GetInstanceAxios from '../components/authInstance';

const instance = GetInstanceAxios({ API_URL });

export const GetProducts = async () => {
    try {
        const response = await instance.get('');
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
        const response = await instance.post('', product);
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
        const response = await instance.put(`/${id}`, product);
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
        const response = await instance.delete(`/${id}`);
        console.log("Producto eliminado correctamente");
        return true;
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar producto");
        throw error;
    }
};