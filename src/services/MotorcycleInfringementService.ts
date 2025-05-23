import axios from 'axios';
import type { MotorcycleInfringement } from '../model/MotorcycleInfringement';

const API_URL = import.meta.env.VITE_BACKEND_API + "motorcycle-infringements";

export const createMotorcycleInfringement = async (data: MotorcycleInfringement) => {
  try {
    const response = await axios.post(API_URL, data);
    console.log("Infracción registrada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al registrar infracción:", error);
    throw error;
  }
};
