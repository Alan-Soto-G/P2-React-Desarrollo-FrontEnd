import { useEffect, useState } from 'react';
import { getMotorcycles, createMotorcycle, updateMotorcycle, deleteMotorcycle } from '../services/MotorcycleService.ts';
import Table from "../components/tableCrud";
import { useNavigate } from 'react-router-dom';
import EmergentCrud from '../components/emergentCrud';
import { GetInfringements, CreateInfringement } from '../services/InfringementService';
import * as Yup from 'yup';

interface MotoData {
    id: number;
    license_plate: string;
    brand: string;
    year: number;
    status: string;
};

interface RuleViolation {
    id: number;
    name: string;
};

const columnHeaders = ["Placa", "Marca", "Año", "Estado", "Infracción"];
const actionCols = ["Editar", "Eliminar"];
const headerStructure = [...columnHeaders, ...actionCols];
const fieldKeys = ["license_plate", "brand", "year", "status", "infraction_btn"];

const MotorcyclesPage: React.FC = () => {
    const [motos, setMotos] = useState<MotoData[]>([]);
    const [violations, setViolations] = useState<RuleViolation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showViolationForm, setShowViolationForm] = useState<boolean>(false);
    const [targetMoto, setTargetMoto] = useState<number | null>(null);
    const navigate = useNavigate();

    const formFields = {
        license_plate: {
            type: 'text',
            placeholder: 'Placa de la motocicleta',
            validation: {
                required: true,
                minLength: 3,
                maxLength: 10,
                pattern: '^[A-Z0-9]+$'
            }
        },
        brand: {
            type: 'text',
            placeholder: 'Marca de la motocicleta',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 30
            }
        },
        year: {
            type: 'number',
            placeholder: 'Año del modelo',
            validation: {
                required: true,
                min: 190,
                max: new Date().getFullYear() + 1
            }
        },
        status: {
            type: 'select',
            placeholder: 'Estado de la motocicleta',
            validation: {
                required: true
            },
            options: [
                { label: 'Disponible', value: 'available' },
                { label: 'En mantenimiento', value: 'maintenance' },
                { label: 'En uso', value: 'in_use' },
                { label: 'Fuera de servicio', value: 'out_of_service' }
            ]
        }
    };

    useEffect(() => {
        const fetchViolations = async () => {
            try {
                const res = await GetInfringements();
                if (res) setViolations(res);
            } catch (err) {
                console.error('Error al cargar infracciones:', err);
            }
        };

        fetchViolations();
    }, []);

    const violationChoices = violations.map(item => ({
        value: item.id,
        label: item.name
    }));

    const violationFields = {
        infringement_type: {
            type: 'select',
            placeholder: 'Tipo de infracción',
            options: violationChoices,
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

    const validationForViolation = Yup.object({
        infringement_type: Yup.string()
            .required('El tipo de infracción es obligatorio'),
        date: Yup.string()
            .required('La fecha y hora son obligatorias')
            .test(
                'not-future',
                'La fecha no puede ser en el futuro',
                val => {
                    if (!val) return true;
                    return new Date(val) <= new Date();
                }
            )
    });

    const loadMotos = async () => {
        try {
            const data = await getMotorcycles();
            if (data) {
                interface MotoWithButton extends MotoData {
                    infraction_btn: number;
                }

                const modifiedData: MotoWithButton[] = data.map((item: MotoData) => ({
                    ...item,
                    infraction_btn: item.id
                }));

                setMotos(modifiedData);
            }
            setIsLoading(false);
        } catch (e) {
            console.error('Error al obtener motos:', e);
            setIsLoading(false);
        }
    };

    const launchViolationForm = (id: number) => {
        setTargetMoto(id);
        setShowViolationForm(true);
    };

    const closeViolationModal = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowViolationForm(false);
        }
    };

    const saveViolation = async (formData: any) => {
        try {
            const payload = {
                ...formData,
                motorcycle_id: targetMoto
            };

            const res = await CreateInfringement(payload);
            if (res) {
                setShowViolationForm(false);
                alert("Infracción registrada con éxito");
            }
            return res;
        } catch (err) {
            console.error("Error al registrar infracción:", err);
            return null;
        }
    };

    const buttonRenderer = {
        infraction_btn: (val: any) => {
            return {
                __html: `<button class="infraction-button" onclick="document.dispatchEvent(new CustomEvent('triggerViolation', {detail: ${val}}))">🚨 Infracción</button>`
            };
        }
    };

    useEffect(() => {
        const violationEvent = (e: CustomEvent) => {
            launchViolationForm(e.detail);
        };

        document.addEventListener('triggerViolation', violationEvent as EventListener);
        return () => {
            document.removeEventListener('triggerViolation', violationEvent as EventListener);
        };
    }, []);

    useEffect(() => {
        loadMotos();
    }, []);

    if (isLoading) {
        return <div className="loading-indicator">Cargando...</div>;
    }

    return (
        <div className="table-container">
            <h1 id="title-products">Motocicletas</h1>
            <Table
                HeadList={headerStructure}
                ComplementTitle="Motocicleta"
                Content={motos}
                Fields={formFields}
                ItemsArray={fieldKeys}
                UpdateTable={loadMotos}
                Add={createMotorcycle}
                Edit={updateMotorcycle}
                Delete={deleteMotorcycle}
                customRender={buttonRenderer}
            />

            {showViolationForm && (
                <EmergentCrud
                    Title="Crear Infracción"
                    Fields={violationFields}
                    TextButton="Crear Infracción ✅"
                    EmergentType={1}
                    Id={null}
                    initialData={{ motorcycle_id: targetMoto ? targetMoto.toString() : "" }}
                    UpdateTable={() => { }}
                    Add={saveViolation}
                    Edit={() => { }}
                    Delete={() => { }}
                    handleBackgroundClick={closeViolationModal}
                    validationSchema={validationForViolation}
                />
            )}
        </div>
    );
};

export default MotorcyclesPage;
