import GetInstanceAxios from '../components/authInstance';

const API_URL = import.meta.env.VITE_BACKEND_API + "customers";

// Crear una instancia de axios configurada
const instance = GetInstanceAxios({ API_URL });

export const GetCustomers = async () => {
    try {
        const response = await instance.get('');
        console.log("Data recibida:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al cargar clientes:", error);
        alert("Error al cargar clientes");
        return [];
    }
};

export const CreateCustomer = async (customer: any) => {
    try {
        const response = await instance.post('', customer);
        console.log("Cliente creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear cliente:", error);
        alert("Error al crear cliente");
        throw error;
    }
};

export const EditCustomer = async (id: string, customer: any) => {
    try {
        const response = await instance.put(`/${id}`, customer);
        console.log("Cliente actualizado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        alert("Error al actualizar cliente");
        throw error;
    }
};

export const DeleteCustomer = async (id: string) => {
    try {
        const response = await instance.delete(`/${id}`);
        console.log("Cliente eliminado correctamente");
        return true;
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        alert("Error al eliminar cliente");
        throw error;
    }
};