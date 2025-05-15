import React, { useEffect, useState } from 'react';
import Table from "../components/tableCrud";
import { DeleteProduct } from "../services/ProductService"
import { EditProduct } from '../services/ProductService';

const headList = ["ID", "Name", "Category", "Price", "Description", "Created At", "Edit", "Delete"];

const Products: React.FC = () => {
    const [content, setContent] = useState<any[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/products", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // data es el array de productos
                console.log("Data recibida:", data);

                const mappedContent = data.map((product: any) => [
                    product.id.toString(),
                    product.name,
                    product.category,
                    product.price.toString(),
                    product.description,
                    new Date(product.created_at).toLocaleString()
                ]);
                setContent(mappedContent);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Table HeadList={headList} Content={content} Edit={EditProduct} Delete={DeleteProduct} />
        </div>
    );
};
export default Products;