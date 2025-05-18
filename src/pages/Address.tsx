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
    "ODER ID",
    "Street",
    "City",
    "State",
    "Postal Code",
    "Additional Info",
];
const actionHeaders = ["Edit", "Delete"];
const headList = [...dataHeaders, ...actionHeaders];

// Propiedades que se muestran en la tabla (excluyendo acciones)
const itemsArray = [
    "id",
    "order_id",
    "street",
    "city",
    "state",
    "postal_code",
    "additional_info",
];

const Addreses: React.FC = () => {
    // Estados para almacenar los addressos y el estado de carga
    const [content, setContent] = useState<Address[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fields = {
        street: {
            type: "text",
            placeholder: "Calle",
            validation: {
                required: true,
                minLength: 3,
                maxLength: 100,
                pattern: "^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ .,°#-]+$", // Letras, números y símbolos comunes
            },
        },
        city: {
            type: "text",
            placeholder: "Ciudad",
            validation: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: "^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$", // Solo letras y espacios
            },
        },
        state: {
            type: "text",
            placeholder: "Estado",
            validation: {
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern: "^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$", // Solo letras y espacios
            },
        },
        postal_code: {
            type: "text",
            placeholder: "Código Postal",
            validation: {
                required: true,
                pattern: "^[0-9]{4,10}$", // Solo números, entre 4 y 10 dígitos
            },
        },
        additional_info: {
            type: "text",
            placeholder: "Información adicional",
            validation: {
                required: false,
                maxLength: 200,
                pattern: "^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ .,°#-]*$", // Letras, números y símbolos comunes
            },
        },
    };


    // Cargar datos de addressos
    useEffect(() => {
        const fetchAddreses = async () => {
            try {
                const result = await GetAddresses();
                if (result) setContent(result);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAddreses();
    }, []);

    if (loading) {
        return <div className="loading-indicator">Loading...</div>;
    }

    return (
        <div className="addresses-container">
            <h1>Gestión de Clientes</h1>
            <Table
                HeadList={headList}
                ComplementTitle="Cliente"
                Content={content}
                Fields={fields}
                ItemsArray={itemsArray}
                Add={CreateAddress}
                Edit={EditAddress}
                Delete={DeleteAddress}
            />
        </div>
    );
};
export default Addreses;
