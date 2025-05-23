import axios from 'axios';

const API_URL = import.meta.env.VITE_SUSTENTACION_; // Asegúrate de definir esta variable en tu .env

import GetInstanceAxios from "../components/authInstance";


// Crear instancia autenticada
const instance = GetInstanceAxios({ API_URL });

export const GetMotorcycleInfringements = async () => {
  try {
    const response = await instance.get("");
    console.log("Infracciones de motocicletas recibidas:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cargar infracciones de motocicletas:", error);
    alert("Error al cargar infracciones de motocicletas");
    return [];
  }
};

export const CreateMotorcycleInfringement = async (infringement: any) => {
  try {
    const response = await instance.post("", infringement);
    console.log("Infracción de motocicleta creada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear infracción de motocicleta:", error);
    alert("Error al crear infracción de motocicleta");
    throw error;
  }
};

export const EditMotorcycleInfringement = async (id: string, infringement: any) => {
  try {
    const response = await instance.put(`/${id}`, infringement);
    console.log("Infracción de motocicleta actualizada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar infracción de motocicleta:", error);
    alert("Error al actualizar infracción de motocicleta");
    throw error;
  }
};

export const DeleteMotorcycleInfringement = async (id: string) => {
  try {
    const response = await instance.delete(`/${id}`);
    console.log("Infracción de motocicleta eliminada correctamente");
    return true;
  } catch (error) {
    console.error("Error al eliminar infracción de motocicleta:", error);
    alert("Error al eliminar infracción de motocicleta");
    throw error;
  }
};
