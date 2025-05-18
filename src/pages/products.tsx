import React, { useEffect, useState } from 'react';
import Table from "../components/tableCrud";
import { GetProducts, CreateProduct, EditProduct, DeleteProduct } from '../services/ProductService';

// Interfaz para tipificar correctamente los productos
interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    created_at: string;
}

// Separación entre columnas de datos y acciones
const dataHeaders = ["ID", "Name", "Category", "Price", "Description", "Created At"];
const actionHeaders = ["Edit", "Delete"];
const headList = [...dataHeaders, ...actionHeaders];

// Propiedades que se muestran en la tabla (excluyendo acciones)
const itemsArray = ["id", "name", "category", "price", "description", "created_at"];

const Products: React.FC = () => {
    // Estados para almacenar los productos y el estado de carga
    const [content, setContent] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true); 

    // Configuración de campos para el formulario
    const fields = {
        name: {
            type: 'text',
            placeholder: 'Nombre del producto',
            validation: {
                required: true,
                minLength: 3,
                maxLength: 50,
                pattern: '^[a-zA-Z0-9 ]+$'
            }
        },
        category: {
            type: 'text',
            placeholder: 'Categoría del producto',
            validation: {
                required: true,
                minLength: 3,
                maxLength: 30
            }
        },
        price: {
            type: 'number',
            placeholder: 'Precio del producto',
            validation: {
                required: true,
                min: 0,
                max: 1000000
            }
        },
        description: {
            type: 'text',
            placeholder: 'Descripción detallada',
            validation: {
                required: true,
                minLength: 10,
                maxLength: 200
            }
        }
    };

    // Cargar datos de productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await GetProducts();
                if (result) setContent(result);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="loading-indicator">Loading...</div>;
    }

    return (
        <div className="products-container">
            <h1>Gestión de Productos</h1>
            <Table
                HeadList={headList}
                ComplementTitle='Producto'
                Content={content}
                Fields={fields}
                ItemsArray={itemsArray}
                Add={CreateProduct}
                Edit={EditProduct}
                Delete={DeleteProduct}
            />
        </div>
    );
};
export default Products;