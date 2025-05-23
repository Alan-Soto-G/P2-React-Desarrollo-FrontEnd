import GetInstanceAxios from '../components/authInstance';

// URLs base para las diferentes operaciones
const GET_URL_INFRINGEMENTS = "https://d0ae8592-d244-48dc-aa90-0914e714afda.mock.pstmn.io/infracciones";
const GET_URL_INFRINGEMENTS_MOTO = "https://d0ae8592-d244-48dc-aa90-0914e714afda.mock.pstmn.io/infraccionesmoto";

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
}


export const CreateInfringement = async (infringement: any) => {
    try {
        // Corregido: usar la instancia axios en lugar de la URL
        const response = await infringementMoto.post('', infringement);
        console.log("Infracción creada:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear infracción:", error);
        alert("Error al crear infracción");
        throw error;
    }
};