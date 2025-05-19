import React, { useEffect, useState } from 'react';
import Table from "../components/tableCrud";
import { GetRestaurants, CreateRestaurant, EditRestaurant, DeleteRestaurant } from '..//services/RestaurantService';

// Interfaz para tipificar correctamente los restaurantes
interface Restaurant {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    created_at: string;
}

// Separación entre columnas de datos y acciones
const dataHeaders = ["ID", "Name", "Address", "Email", "Phone", "Created At"];
const actionHeaders = ["Edit", "Delete"];
const headList = [...dataHeaders, ...actionHeaders];

// Propiedades que se muestran en la tabla (excluyendo acciones)
const itemsArray = ["id", "name", "address", "email", "phone", "created_at"];

const Restaurants: React.FC = () => {
    // Estados para almacenar los restaurantes y el estado de carga
    const [content, setContent] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Configuración de campos para el formulario
    const fields = {
        name: {
            type: 'text',
            placeholder: 'Nombre del restaurante',
            validation: {
                required: true,
                minLength: 3,
                maxLength: 50,
                pattern: '^[a-zA-Z0-9 ]+$'
            }
        },
        address: {
            type: 'text',
            placeholder: 'Dirección del restaurante',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 100
            }
        },
        email: {
            type: 'email',
            placeholder: 'Email de contacto',
            validation: {
                required: true,
                pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
            }
        },
        phone: {
            type: 'text',
            placeholder: 'Teléfono de contacto',
            validation: {
                required: true,
                minLength: 7,
                maxLength: 15,
                pattern: '^[0-9]+$'
            }
        }
    };

    const fetchRestaurants = async () => {
        try {
            const result = await GetRestaurants();
            if (result) setContent(result);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos de restaurantes
    useEffect(() => { fetchRestaurants() }, []);

    if (loading) {
        return <div className="loading-indicator">Loading...</div>;
    }

    return (
        <div className="restaurants-container">
            <h1 id='title-restaurants'>Gestión de Restaurantes</h1>
            <Table
                HeadList={headList}
                ComplementTitle='Restaurante'
                Content={content}
                Fields={fields}
                ItemsArray={itemsArray}
                UpdateTable={fetchRestaurants}
                Add={CreateRestaurant}
                Edit={EditRestaurant}
                Delete={DeleteRestaurant}
            />
        </div>
    );
};

export default Restaurants;