import { useEffect, useState } from 'react';
import { GetInfringements, GetInfringementsMoto, CreateInfringement} from '../services/InfringementService';
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

    // Carga las infracciones 
    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar infracciones
                const infrData = await GetInfringements();
                if (infrData) setInfringements(infrData);
                
                // Cargar infracciones de moto
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

    // Sonido de notificación al crear una infracción
    const handleCreate = async (data: any) => {
        const result = await CreateInfringement(data);
        if (result) {
            // Reproducir sonido de notificación
            const audio = new Audio('public/sounds/notification.mp3');
            audio.play();
            
            toast.success('✅ Infracción registrada correctamente');
        }
        return result;
    };

    // Función vacía para editar
    const handleEdit = async (data: any) => {
        return null;
    };

    // Función vacía para eliminar
    const handleDelete = async (id: any) => {
        return null;
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
                Add={handleCreate}
                Edit={handleEdit}
                Delete={handleDelete}
            />
        </div>
    );
}

export default InfringementsPage;

