import React, { useEffect, useState } from "react";
import Table from "../components/tableCrud";
import {
    GetAddresses,
    CreateAddress,
    EditAddress,
    DeleteAddress,
} from "../services/AddressService";

interface Address {
    id: number;
    order_id: number;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    additional_info: string;
}

// Separación entre columnas de datos y acciones
const dataHeaders = [
    "ID",
    "ORDER ID", 
    "Street",
    "City",
    "State",
    "Postal Code",
    "Additional Info",
];
const actionHeaders = ["Edit", "Delete"];
const headList = [...dataHeaders, ...actionHeaders];

// Propiedades que se muestran en la tabla
const itemsArray = [
    "id",
    "order_id",
    "street",
    "city",
    "state",
    "postal_code",
    "additional_info",
];

const Addresses: React.FC = () => {
    const [content, setContent] = useState<Address[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fields = {
        order_id: {
            type: "number",
            placeholder: "ID de la Orden",
            validation: {
                required: true,
                min: 1
            }
        },
        street: {
            type: "text",
            placeholder: "Calle",
            validation: {
                required: true,
                minLength: 3,
                maxLength: 100,
                pattern: "^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ .,°#-]+$",
            },
        },
        city: {
            type: "text",
            placeholder: "Ciudad",
            validation: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: "^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$",
            },
        },
        state: {
            type: "text",
            placeholder: "Estado",
            validation: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: "^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$",
            },
        },
        postal_code: {
            type: "text",
            placeholder: "Código Postal",
            validation: {
                required: true,
                pattern: "^[0-9]{4,10}$",
            },
        },
        additional_info: {
            type: "text",
            placeholder: "Información adicional",
            validation: {
                required: false,
                maxLength: 200,
                pattern: "^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ .,°#-]*$",
            },
        },
    };

    const fetchAddresses = async () => {
        try {
            const result = await GetAddresses();
            if (result) setContent(result);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos de direcciones
    useEffect(() => {
        fetchAddresses();
    }, []);

    if (loading) {
        return <div className="loading-indicator">Cargando direcciones...</div>;
    }

    return (
        <div className="table-container">
            <h1>Gestión de Direcciones</h1>
            <Table
                HeadList={headList}
                ComplementTitle="Dirección" // Corregido de "Cliente" a "Dirección"
                Content={content}
                Fields={fields}
                ItemsArray={itemsArray}
                UpdateTable={fetchAddresses}
                Add={CreateAddress}
                Edit={EditAddress}
                Delete={DeleteAddress}
            />
        </div>
    );
};

export default Addresses;
