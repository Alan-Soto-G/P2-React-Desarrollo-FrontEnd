import React, { useEffect, useState } from 'react';
import Table from "../components/tableCrud";
import { GetProducts, DeleteProduct, EditProduct } from '../services/ProductService';

const headList = ["ID", "Name", "Category", "Price", "Description", "Created At", "Edit", "Delete"];

const Products: React.FC = () => {
    const [content, setContent] = useState<any[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const result = await GetProducts();
            if (result) setContent(result);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Table HeadList={headList} Content={content}/>
        </div>
    );
};
export default Products;