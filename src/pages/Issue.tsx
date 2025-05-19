import { useEffect, useState } from 'react';
import { GetIssues, CreateIssue, EditIssue, DeleteIssue } from '../services/IssueService';
import Table from "../components/tableCrud";

interface Issue {
  motorcycle_id: number;
  description: string;
  issue_type: string;
  status: string;
  photos: string
}

// Separación entre columnas de datos y acciones
const dataHeaders = ["ID_Moto", "Description", "Issue_type", "Photos", "Status"];
const actionHeaders = ["Edit", "Delete"];
const headList = [...dataHeaders, ...actionHeaders];

// Propiedades que se muestran en la tabla (excluyendo acciones)
const itemsArray = ["motorcycle_id", "description", "issue_type", "photos", "status"];

const Issue: React.FC = () => {
    // Estados para almacenar los inconvenientes 
    const [content, setContent] = useState<Issue[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

  // Configuración de campos para el formulario
    const fields = {
        description: {
            type: 'text',
            placeholder: 'Descripción del inconveniente',
        },
        issue_type: {
            type: 'text',
            placeholder: 'Tipo de inconveniente',
        },
        status: {
            type: 'text',
            placeholder: 'D',
        }
    };

    const fetchProducts = async () => {
        try {
            const result = await GetIssues();
            if (result) setContent(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos de productos
    useEffect(() => { fetchProducts() }, []);

    if (loading) {
        return <div className="loading-indicator">Loading...</div>;
    }

    return (
        <div className="products-container">
            <h1 id='title-products'>Gestión de Productos</h1>
            <Table
                HeadList={headList}
                ComplementTitle='Producto'
                Content={content}
                Fields={fields}
                ItemsArray={itemsArray}
                UpdateTable={fetchProducts}
                Add={CreateIssue}
                Edit={EditIssue}
                Delete={DeleteIssue}
            />
        </div>
    );
};

export default Issue;