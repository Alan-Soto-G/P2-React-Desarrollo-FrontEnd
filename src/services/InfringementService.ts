import GetInstanceAxios from '../components/authInstance';

// URLs base para las diferentes operaciones
const GET_URL_INFRINGEMENTS = "https://e0b63cfd-145b-4900-99f8-3cb297eeeeb2.mock.pstmn.io/infracciones";
const GET_URL_INFRINGEMENTS_MOTO = "https://e0b63cfd-145b-4900-99f8-3cb297eeeeb2.mock.pstmn.io/infraccionesmoto";

// Crear instancias autenticadas para cada base URL
const getterInstance = GetInstanceAxios({ API_URL: GET_URL_INFRINGEMENTS });
const infringementMoto = GetInstanceAxios({ API_URL: GET_URL_INFRINGEMENTS_MOTO });

export const GetInfringements = async () => {
  try {
    const response = await getterInstance.get('');
    console.log("Infracciones recibidas:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cargar infracciones:", error);
    alert("Error al cargar infracciones");
    return [];
  }
};

export const GetInfringementsMoto = async () => {
  try {
    const response = await infringementMoto.get('');
    console.log("Infracciones de moto recibidas:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al cargar infracciones de moto:", error);
    alert("Error al cargar infracciones de moto");
    return [];
  }
};

export const CreateInfringementMoto = async (infringement: any) => {
  try {
    const response = await infringementMoto.post('', infringement);
    console.log("Infracción creada:", response.data);
    // Retornamos solo la data útil para que el componente pueda usarla directamente
    return response.data.data;
  } catch (error) {
    console.error("Error al crear infracción:", error);
    alert("Error al crear infracción");
    throw error;
    console.log("HOLAA")
  }
};

export const EditInfringementMoto = async (id: string, infringement: any) => {
  try {
    const response = await infringementMoto.put(`/${id}`, infringement);
    console.log("Infracción actualizada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar infracción:", error);
    alert("Error al actualizar infracción");
    throw error;
  }
};

export const DeleteInfringementMoto = async (id: string) => {
  try {
    await infringementMoto.delete(`/${id}`);
    console.log("Infracción eliminada correctamente");
    return true;
  } catch (error) {
    console.error("Error al eliminar infracción:", error);
    alert("Error al eliminar infracción");
    throw error;
  }
};
