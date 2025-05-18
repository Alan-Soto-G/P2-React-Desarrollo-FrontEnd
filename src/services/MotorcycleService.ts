import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_API + "motorcycles";

export const getMotorcycles = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Motocicletas recibidas:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cargar motocicletas:", error);
    alert("Error al cargar motocicletas");
    return [];
  }
};

export const createMotorcycle = async (motorcycle: any) => {
  try {
    const response = await axios.post(API_URL, motorcycle);
    console.log("Motocicleta creada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear motocicleta:", error);
    alert("Error al crear motocicleta");
    throw error;
  }
};

export const updateMotorcycle = async (id: string, motorcycle: any) => {
  try {
    // Convertimos el id a número si la API lo requiere
    const numericId = parseInt(id, 10);
    
    const response = await axios.put(`${API_URL}/${numericId}`, motorcycle);
    console.log("Motocicleta actualizada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar motocicleta:", error);
    alert("Error al actualizar motocicleta");
    throw error;
  }
};

export const deleteMotorcycle = async (id: string) => {
  try {
    // Convertimos el id a número si la API lo requiere
    const numericId = parseInt(id, 10);
    
    const response = await axios.delete(`${API_URL}/${numericId}`);
    console.log("Motocicleta eliminada correctamente");
    return true;
  } catch (error) {
    console.error("Error al eliminar motocicleta:", error);
    alert("Error al eliminar motocicleta");
    throw error;
  }
};
