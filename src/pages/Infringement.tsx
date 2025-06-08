import { useEffect, useState } from 'react';
import { 
    GetInfringements, 
    GetInfringementsMoto, 
    CreateInfringementMoto, 
    DeleteInfringementMoto, 
    EditInfringementMoto 
} from '../services/InfringementService';
import Table from "../components/tableCrud";
import { toast } from 'react-toastify';

interface Infringement {
    id: number;
    name: string;
};

interface InfringementMoto {
    id: number;
    plate: string;
    name: string;
    date: string;
};

const dataHeaders = ["Placa", "Tipo de Infracción", "Fecha"];
const actionHeaders = ["Editar", "Eliminar"];
const headList = [...dataHeaders, ...actionHeaders];
const itemsArray = ["plate", "name", "date"];

const InfringementsPage: React.FC = () => {
    const [infringements, setInfringements] = useState<Infringement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [infringementsMoto, setInfringementsMoto] = useState<InfringementMoto[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const infrData = await GetInfringements();
                if (infrData) setInfringements(infrData);

                const motoData = await GetInfringementsMoto();
                if (motoData) setInfringementsMoto(motoData);

                setLoading(false);
            } catch (error) {
                console.error('Error cargando datos:', error);
                setLoading(false);
                toast.error('Error al cargar datos necesarios');
            }
        };

        loadData();
    }, []);

    const infringementOptions = infringements.map(infringement => ({
        value: infringement.id,
        label: `${infringement.name}`
    }));

    const fields = {
        plate: {
            type: 'text',
            placeholder: 'Placa',
            readOnly: true,
        },
        name: {
            type: 'text',
            placeholder: 'Nombre de la moto',
            readOnly: true,
        },
        infringement_type: {
            type: 'select',
            placeholder: 'Tipo de infracción',
            options: [infringementOptions],
            validation: {
                required: true
            }
        },
        date: {
            type: 'datetime-local',
            placeholder: 'Fecha y hora de la infracción',
            validation: {
                required: true
            }
        }
    };

    const fetchInfringements = async () => {
        try {
            const response = await GetInfringementsMoto();
            if (response) setInfringementsMoto(response);
        } catch (error) {
            console.error('Error fetching infringements:', error);
            toast.error('Error al actualizar lista de infracciones');
        }
    };

    if (loading) {
        return <div className="loading-indicator">Cargando datos...</div>;
    }

    const handleAdd = async (data: any) => {
        try {
            const newInfringement = await CreateInfringementMoto(data);
            toast.success("Infracción creada correctamente");

            // Actualizar lista con fetch completo para evitar inconsistencias
            await fetchInfringements();

        } catch (error) {
            toast.error("Error al crear infracción");
        }
    };

    const handleEdit = async (id: any, data: any) => {
        try {
            const updated = await EditInfringementMoto(id, data);
            toast.success("Infracción actualizada correctamente");
            setInfringementsMoto(prev => prev.map(item => item.id === id ? updated : item));
        } catch (error) {
            toast.error("Error al actualizar infracción");
        }
    };

    const handleDelete = async (id: any) => {
        try {
            await DeleteInfringementMoto(id);
            toast.success("Infracción eliminada correctamente");
            setInfringementsMoto(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            toast.error("Error al eliminar infracción");
        }
    };

    return (
        <div className="table-container">
            <h1 id="title-infringements">Infracciones de Tránsito</h1>
            <Table
                HeadList={headList}
                ComplementTitle="Infracción"
                Content={infringementsMoto}
                Fields={fields}
                ItemsArray={itemsArray}
                UpdateTable={fetchInfringements}
                Add={handleAdd}
                Edit={handleEdit}
                Delete={handleDelete}
            />
        </div>
    );
};

export default InfringementsPage;
