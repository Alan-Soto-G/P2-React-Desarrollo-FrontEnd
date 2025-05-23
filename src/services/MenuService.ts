const API_URL = import.meta.env.VITE_BACKEND_API + "menus";
import GetInstanceAxios from '../components/authInstance';

const instance = GetInstanceAxios({ API_URL });

export const GetMenus = async () => {
    try {
        const response = await instance.get('');
        console.log("Data recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al cargar menús:", error);
        alert("Error al cargar menús");
        return [];
    }
};

export const CreateMenu = async (menu: any) => {
    try {
        const response = await instance.post('', menu);
        console.log("Menú creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear menú:", error);
        alert("Error al crear menú");
        throw error;
    }
};

export const EditMenu = async (id: string, menu: any) => {
    try {
        const response = await instance.put(`/${id}`, menu);
        console.log("Menú actualizado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar menú:", error);
        alert("Error al actualizar menú");
        throw error;
    }
};

export const DeleteMenu = async (id: string) => {
    try {
        const response = await instance.delete(`/${id}`);
        console.log("Menú eliminado correctamente");
        return true;
    } catch (error) {
        console.error("Error al eliminar menú:", error);
        alert("Error al eliminar menú");
        throw error;
    }
};