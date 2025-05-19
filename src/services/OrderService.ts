const API_URL = import.meta.env.VITE_BACKEND_API + "orders";
import GetInstanceAxios from '../components/authInstance';
import { toast } from 'react-toastify';


const instance = GetInstanceAxios({ API_URL });

export const GetOrders = async () => {
    try {
        const response = await instance.get('');
        console.log("Data recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al cargar órdenes:", error);
        alert("Error al cargar órdenes");
        return [];
    }
};

export const CreateOrder = async (order: any) => {
    try {
        const response = await instance.post('', order);
        console.log("Orden creada:", response.data);
        
        // Mostrar toast de éxito
        toast.success('✅ Pedido creado y asignado a una motocicleta.');

        // Reproducir sonido de notificación
        const audio = new Audio('public/sounds/notification.mp3');
        audio.play();

        return response.data;
    } catch (error) {
        console.error("Error al crear orden:", error);
        toast.error('❌ Error al crear el pedido');
        throw error;
    }
};



export const EditOrder = async (id: string, order: any) => {
    try {
        const response = await instance.put(`/${id}`, order);
        console.log("Orden actualizada:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar orden:", error);
        alert("Error al actualizar orden");
        throw error;
    }
};

export const DeleteOrder = async (id: string) => {
    try {
        const response = await instance.delete(`/${id}`);
        console.log("Orden eliminada correctamente");
        return true;
    } catch (error) {
        console.error("Error al eliminar orden:", error);
        alert("Error al eliminar orden");
        throw error;
    }
};