import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_API + "shifts";

export const GetShifts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Turnos recibidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cargar órdenes:", error);
    alert("Error al cargar órdenes");
    return [];
  }
};

export const CreateShift = async (order: any) => {
  try {
    const response = await axios.post(API_URL, order);
    console.log("Turno creada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear orden:", error);
    alert("Error al crear orden");
    throw error;
  }
};

export const EditShift = async (id: string, order: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, order);
    console.log("Turno actualizada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar orden:", error);
    alert("Error al actualizar orden");
    throw error;
  }
};

export const DeleteShift = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log("Turno eliminada correctamente");
    return true;
  } catch (error) {
    console.error("Error al eliminar orden:", error);
    alert("Error al eliminar orden");
    throw error;
  }
};
