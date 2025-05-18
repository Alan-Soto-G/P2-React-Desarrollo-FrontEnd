import React, { useEffect, useState } from "react";
import Table from "../components/tableCrud";
import {
    GetCustomers,
    CreateCustomer,
    EditCustomer,
    DeleteCustomer,
} from "../services/CustomerService";

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
}

// Separación entre columnas de datos y acciones
const dataHeaders = ["ID", "Name", "Email", "Phone"];
const actionHeaders = ["Edit", "Delete"];
const headList = [...dataHeaders, ...actionHeaders];

// Propiedades que se muestran en la tabla (excluyendo acciones)
const itemsArray = ["id", "name", "email", "phone"];

const Customers: React.FC = () => {
    // Estados para almacenar los customeros y el estado de carga
    const [content, setContent] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fields = {
        name: {
            type: "text",
            placeholder: "Nombre del cliente",
            validation: {
                required: true,
                minLength: 3,
                maxLength: 50,
                pattern: "^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$", // Letras y espacios, incluyendo tildes
            },
        },
        email: {
            type: "email",
            placeholder: "Correo electrónico",
            validation: {
                required: true,
                pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", // Email básico
            },
        },
        phone: {
            type: "text",
            placeholder: "Teléfono",
            validation: {
                required: true,
                pattern: "^[0-9]{7,15}$", // Solo números, entre 7 y 15 dígitos
            },
        },
    };


    // Cargar datos de customeros
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const result = await GetCustomers();
                if (result) setContent(result);
            } catch (error) {
                console.error("Error fetching customers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) {
        return <div className="loading-indicator">Loading...</div>;
    }

    return (
        <div className="customers-container">
            <h1>Gestión de Clientes</h1>
            <Table
                HeadList={headList}
                ComplementTitle="Cliente"
                Content={content}
                Fields={fields}
                ItemsArray={itemsArray}
                Add={CreateCustomer}
                Edit={EditCustomer}
                Delete={DeleteCustomer}
            />
        </div>
    );
};
export default Customers;
