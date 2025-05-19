import React, { useEffect, useState } from 'react';
import Table from "../components/tableCrud";
import { GetMenus, CreateMenu, EditMenu, DeleteMenu } from '../services/MenuService';
import { GetProducts } from '../services/ProductService';
import { GetRestaurants } from '../services/RestaurantService';

// Interfaces para los diferentes tipos de datos
interface Menu {
    id: number;
    price: number;
    availability: boolean;
    product_id: number;
    restaurant_id: number;
    created_at: string;
    product: {
        id: number;
        name: string;
        category: string;
        price: number;
        description: string;
        created_at: string;
    };
    restaurant: {
        id: number;
        name: string;
        address: string;
        email: string;
        phone: string;
        created_at: string;
    };
}

interface Restaurant {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    created_at: string;
}

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    created_at: string;
}

const dataHeaders = ["ID", "Restaurante", "Producto", "Precio", "Disponible", "Creado"];
const actionHeaders = ["Editar", "Eliminar"];
const headList = [...dataHeaders, ...actionHeaders];
const itemsArray = ["id", "restaurant_name", "product_name", "price", "availability_text", "created_at_formatted"];

const Menus: React.FC = () => {
    const [content, setContent] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    // Cargar restaurantes y productos al inicio
    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar restaurantes
                const restaurantsData = await GetRestaurants();
                if (restaurantsData) setRestaurants(restaurantsData);
                
                // Cargar productos
                const productsData = await GetProducts();
                if (productsData) setProducts(productsData);
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            }
        };
        
        loadData();
    }, []);

    // Configuración de campos para el formulario con dropdowns
    const fields = {
        restaurant_id: {
            type: 'select',
            placeholder: 'Restaurante',
            validation: {
                required: true
            },
            options: restaurants.map(restaurant => ({
                label: restaurant.name,
                value: restaurant.id
            }))
        },
        product_id: {
            type: 'select',
            placeholder: 'Producto',
            validation: {
                required: true
            },
            options: products.map(product => ({
                label: `${product.name} - ${product.category} ($${product.price})`,
                value: product.id
            }))
        },
        price: {
            type: 'number',
            placeholder: 'Precio',
            validation: {
                required: true,
                min: 0
            }
        },
        availability: {
            type: 'checkbox',
            placeholder: 'Disponible',
            validation: {
                required: false
            }
        }
    };

    // Función para formatear los datos de menús para mostrarlos en la tabla
    const formatMenuData = (menus: Menu[]) => {
        return menus.map(menu => ({
            id: menu.id,
            restaurant_id: menu.restaurant_id,
            product_id: menu.product_id,
            price: menu.price,
            availability: menu.availability,
            created_at: menu.created_at,
            // Campos formateados para mostrar en la tabla
            restaurant_name: menu.restaurant?.name || "Desconocido",
            product_name: menu.product?.name || "Desconocido",
            availability_text: menu.availability ? "Sí" : "No",
            created_at_formatted: new Date(menu.created_at).toLocaleDateString()
        }));
    };

    const fetchMenus = async () => {
        try {
            const result = await GetMenus();
            if (result) {
                const formattedData = formatMenuData(result);
                setContent(formattedData);
            }
        } catch (error) {
            console.error("Error fetching menus:", error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos de menús
    useEffect(() => { fetchMenus() }, []);

    if (loading) {
        return <div className="loading-indicator">Cargando menús...</div>;
    }

    return (
        <div className="table-container">
            <h1>Gestión de Menús</h1>
            <Table
                HeadList={headList}
                ComplementTitle='Menú'
                Content={content}
                Fields={fields}
                ItemsArray={itemsArray}
                UpdateTable={fetchMenus}
                Add={CreateMenu}
                Edit={EditMenu}
                Delete={DeleteMenu}
            />
        </div>
    );
};
export default Menus;