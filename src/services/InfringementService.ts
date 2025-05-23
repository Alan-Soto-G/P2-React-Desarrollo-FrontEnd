import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API + "infraccionmoto/data";

export interface Infringement {
  id: number;
  type: string; // Usamos "type" aquí para el frontend
}

export const getInfringements = async (): Promise<Infringement[]> => {
  try {
    const response = await axios.get(API_URL);
    // Mapeamos para que "name" del backend sea "type" en frontend
    return response.data.map((item: any) => ({
      id: item.id,
      type: item.name,
    }));
  } catch (error) {
    console.error("Error al obtener tipos de infracción:", error);
    return [];
  }
};
