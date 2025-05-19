import { useEffect, useState } from 'react';
import { GetIssues, CreateIssue, EditIssue, DeleteIssue } from '../services/IssueService';
import { getMotorcycles } from '../services/MotorcycleService';
import Table from "../components/tableCrud";
import * as Yup from 'yup';

interface Photo {
    id?: number;
    issue_id?: number;
    image_url?: string;
    caption?: string;
    taken_at?: string | null;
    created_at?: string;
}

interface Issue {
    id?: number;
    motorcycle_id: number;
    description: string;
    issue_type: string;
    status: string;
    date_reported?: string;
    photos?: Photo[];
    created_at?: string;
}

interface Motorcycle {
    id: number;
    license_plate: string;
    brand: string;
    year: number;
    status: string;
}

// Separación entre columnas de datos y acciones
const dataHeaders = ["ID", "Moto", "Descripción", "Tipo", "Estado", "Fecha", "Fotos"];
const actionHeaders = ["Editar", "Eliminar"];
const headList = [...dataHeaders, ...actionHeaders];

// Propiedades que se muestran en la tabla (excluyendo acciones)
const itemsArray = ["id", "motorcycle_info", "description", "issue_type", "status", "date_reported", "photos_count"];

const IssueManagement: React.FC = () => {
    // Estados para almacenar los inconvenientes 
    const [content, setContent] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

    // Cargar motocicletas para el dropdown
    useEffect(() => {
        const loadMotorcycles = async () => {
            try {
                const motorcyclesData = await getMotorcycles();
                if (motorcyclesData) setMotorcycles(motorcyclesData);
            } catch (error) {
                console.error("Error loading motorcycles:", error);
            }
        };
        loadMotorcycles();
    }, []);

    // Configuración de campos para el formulario
    const fields = {
        motorcycle_id: {
            type: 'select',
            placeholder: 'Motocicleta',
            validation: {
                required: true
            },
            options: motorcycles.map(moto => ({
                label: `${moto.license_plate} - ${moto.brand}`,
                value: moto.id
            }))
        },
        description: {
            type: 'text',
            placeholder: 'Descripción del inconveniente',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 200
            }
        },
        issue_type: {
            type: 'select',
            placeholder: 'Tipo de inconveniente',
            validation: {
                required: true
            },
            options: [
                { label: 'Mantenimiento', value: 'maintenance' },
                { label: 'Accidente', value: 'accident' },
                { label: 'Robo', value: 'theft' },
                { label: 'Otro', value: 'other' }
            ]
        },
        status: {
            type: 'select',
            placeholder: 'Estado',
            validation: {
                required: true
            },
            options: [
                { label: 'Pendiente', value: 'pending' },
                { label: 'En progreso', value: 'in_progress' },
                { label: 'Resuelto', value: 'resolved' },
                { label: 'Cancelado', value: 'cancelled' }
            ]
        },
        date_reported: {
            type: 'date',
            placeholder: 'Fecha de reporte',
            validation: {
                required: true
            }
        },
        photos: {
            type: 'file',
            placeholder: 'Fotos',
            validation: {
                required: false
            },
            accept: "image/*",
            multiple: true
        },
        caption: {
            type: 'text',
            placeholder: 'Descripción de las fotos',
            validation: {
                required: false,
                maxLength: 100
            }
        }
    };

    // Schema de validación para Yup
    const validationSchema = Yup.object({
        motorcycle_id: Yup.number().required('La motocicleta es obligatoria'),
        description: Yup.string().required('La descripción es obligatoria').min(5, 'Mínimo 5 caracteres').max(200, 'Máximo 200 caracteres'),
        issue_type: Yup.string().required('El tipo de inconveniente es obligatorio'),
        status: Yup.string().required('El estado es obligatorio'),
        date_reported: Yup.string().required('La fecha es obligatoria'),
        caption: Yup.string().max(100, 'Máximo 100 caracteres')
    });

    // Función para formatear los datos para mostrarlos en la tabla
    const formatIssueData = (issues: Issue[]) => {
        return issues.map(issue => {
            // Buscar la moto correspondiente
            const motorcycle = motorcycles.find(m => m.id === issue.motorcycle_id);
            return {
                id: issue.id,
                motorcycle_id: issue.motorcycle_id,
                description: issue.description,
                issue_type: issue.issue_type,
                status: issue.status,
                date_reported: issue.date_reported ? new Date(issue.date_reported).toLocaleDateString() : '',
                created_at: issue.created_at,
                // Campos formateados para mostrar en la tabla
                motorcycle_info: motorcycle ? `${motorcycle.license_plate} - ${motorcycle.brand}` : 'Desconocida',
                photos_count: issue.photos ? `${issue.photos.length} foto(s)` : '0 fotos'
            };
        });
    };

    // Personalización de renderizado para mostrar imágenes en preview
    const customRender = {
        photos_count: (value: any) => {
            return { __html: `<span class="photo-badge">${value}</span>` };
        }
    };

    const fetchIssues = async () => {
        try {
            const result = await GetIssues();
            if (result) {
                const formattedData = formatIssueData(result);
                setContent(formattedData);
            }
        } catch (error) {
            console.error("Error fetching issues:", error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos de inconvenientes
    useEffect(() => { fetchIssues() }, [motorcycles]);

    // Pre-procesamiento antes de crear un inconveniente
    const handleCreate = async (issueData: any) => {
        try {
            console.log("Preparing to create issue with data:", issueData);
            
            // Formatear datos para enviar al API
            // No need for additional processing, the service will handle FormData creation
            return await CreateIssue(issueData);
        } catch (error) {
            console.error("Error in handleCreate:", error);
            return null;
        }
    };

    // Pre-procesamiento antes de editar un inconveniente
    const handleEdit = async (id: string, issueData: any) => {
        return await EditIssue(id, issueData);
    };

    if (loading) {
        return <div className="loading-indicator">Cargando inconvenientes...</div>;
    }

    return (
        <div className="table-container">
            <h1 id='title-issues'>Gestión de Inconvenientes</h1>
            <Table
                HeadList={headList}
                ComplementTitle='Inconveniente'
                Content={content}
                Fields={fields}
                ItemsArray={itemsArray}
                UpdateTable={fetchIssues}
                Add={handleCreate}
                Edit={handleEdit}
                Delete={DeleteIssue}
                validationSchema={validationSchema}
                customRender={customRender}
            />
        </div>
    );
};

export default IssueManagement;