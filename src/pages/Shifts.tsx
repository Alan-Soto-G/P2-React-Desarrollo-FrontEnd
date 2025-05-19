import React, { useEffect, useState } from "react";
import Table from "../components/tableCrud";
import { GetShifts, CreateShift, EditShift, DeleteShift } from "../services/ShiftService";
import { GetDrivers } from "../services/DriverService";
import { getMotorcycles } from "../services/MotorcycleService.ts";

interface Driver {
    id: number;
    name: string;
    license_number: string;
    email: string;
    phone: string;
    status: string;
}

interface Motorcycle {
    id: number;
    license_plate: string;
    brand: string;
    year: number;
    status: string;
}

interface Shift {
    id: number;
    driver_id: number;
    motorcycle_id: number;
    start_time: string;
    end_time: string;
    status: string;
    created_at: string;
    driver?: Driver;
    motorcycle?: Motorcycle;
}

// Separación entre columnas de datos y acciones
const dataHeaders = ["ID", "Conductor", "Motocicleta", "Inicio", "Fin", "Estado"];
const actionHeaders = ["Editar", "Eliminar"];
const headList = [...dataHeaders, ...actionHeaders];

// Propiedades que se muestran en la tabla
const itemsArray = ["id", "driver_name", "motorcycle_info", "start_time_formatted", "end_time_formatted", "status"];

const Shifts: React.FC = () => {
    const [content, setContent] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

    // Cargar datos para dropdowns
    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar conductores
                const driversData = await GetDrivers();
                if (driversData) setDrivers(driversData);

                // Cargar motocicletas
                const motorcyclesData = await getMotorcycles();
                if (motorcyclesData) setMotorcycles(motorcyclesData);
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            }
        };

        loadData();
    }, []);

    const fields = {
        driver_id: {
            type: "select",
            placeholder: "Conductor",
            validation: {
                required: true
            },
            options: drivers.map(driver => ({
                label: `${driver.name} (${driver.license_number})`,
                value: driver.id
            }))
        },
        motorcycle_id: {
            type: "select",
            placeholder: "Motocicleta",
            validation: {
                required: true
            },
            options: motorcycles.map(moto => ({
                label: `${moto.license_plate} - ${moto.brand}`,
                value: moto.id
            }))
        },
        start_time: {
            type: "datetime-local",
            placeholder: "Fecha y hora de inicio",
            validation: {
                required: true,
            },
        },
        end_time: {
            type: "datetime-local",
            placeholder: "Fecha y hora de finalización",
            validation: {
                required: true,
            },
        },
        status: {
            type: "select",
            placeholder: "Estado",
            validation: {
                required: true
            },
            options: [
                { label: 'Pendiente', value: 'pending' },
                { label: 'En progreso', value: 'in_progress' },
                { label: 'Completado', value: 'completed' },
                { label: 'Cancelado', value: 'cancelled' }
            ]
        },
    };

    // Función para formatear los datos de turnos para mostrarlos en la tabla
    const formatShiftData = (shifts: Shift[]) => {
        return shifts.map(shift => {
            // Formatear fechas para mostrar
            const startDate = new Date(shift.start_time);
            const endDate = new Date(shift.end_time);

            const formatDate = (date: Date) => {
                return new Intl.DateTimeFormat('es-CO', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                }).format(date);
            };

            return {
                id: shift.id,
                driver_id: shift.driver_id,
                motorcycle_id: shift.motorcycle_id,
                start_time: shift.start_time,
                end_time: shift.end_time,
                status: shift.status,
                // Campos formateados para mostrar en la tabla
                driver_name: shift.driver?.name || "No asignado",
                motorcycle_info: shift.motorcycle ? `${shift.motorcycle.license_plate} - ${shift.motorcycle.brand}` : "No asignado",
                start_time_formatted: formatDate(startDate),
                end_time_formatted: formatDate(endDate)
            };
        });
    };

    const fetchShifts = async () => {
        try {
            const result = await GetShifts();
            if (result) {
                const formattedData = formatShiftData(result);
                setContent(formattedData);
            }
        } catch (error) {
            console.error("Error fetching shifts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShifts();
    }, []);

    if (loading) {
        return <div className="loading-indicator">Cargando turnos...</div>;
    }

    return (
        <div className="shifts-container">
            <h1>Gestión de Turnos</h1>
            <Table
                HeadList={headList}
                ComplementTitle="Turno"
                Content={content}
                Fields={fields}
                ItemsArray={itemsArray}
                UpdateTable={fetchShifts}
                Add={CreateShift}
                Edit={EditShift}
                Delete={DeleteShift}
            />
        </div>
    );
};

export default Shifts;