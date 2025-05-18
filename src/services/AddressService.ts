import axios from "axios";
import type { Address } from "../model/Address";

const API_URL = import.meta.env.VITE_BACKEND_API + "addresses";

// Obtener todas las direcciones
export const GetAddresses = async () => {
    console.log("aqui " + API_URL);
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Obtener dirección por ID
export const GetAddressById = async (id: number): Promise<Address | null> => {
    try {
        const response = await axios.get<Address>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Crear nueva dirección
export const CreateAddress = async (
    address: Omit<Address, "id">
): Promise<Address | null> => {
    try {
        const response = await axios.post<Address>(API_URL, address);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Actualizar dirección
export const EditAddress = async (
    id: string,
    address: Partial<Address>
): Promise<Address | null> => {
    try {
        const response = await axios.put<Address>(`${API_URL}/${id}`, address);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Eliminar dirección
export const DeleteAddress = async (id: string): Promise<boolean> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
