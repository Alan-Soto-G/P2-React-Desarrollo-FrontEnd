import React, { useState } from 'react';
import '../styles/tableCrud.css';
import EmergentCrud from '../components/emergentCrud';

interface TableProps {
    HeadList: string[];
    Content: { [key: string]: any }[];
}

const fields = {
    id: { type: 'number', placeholder: 'ID' },
    name: { type: 'text', placeholder: 'Nombre' },
    category: { type: 'text', placeholder: 'Categoría' },
    price: { type: 'number', placeholder: 'Precio' },
    description: { type: 'text', placeholder: 'Description' }
};


const Table: React.FC<TableProps> = ({ HeadList, Content}) => {

    const [showEmergent, setShowEmergent] = useState(false);
    const handleEdit = () => {
        setShowEmergent(!showEmergent);
    };
    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowEmergent(false);
        }
    };

    const keys = Content.length > 0 ? Object.keys(Content[0]) : []

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {HeadList.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Content.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {keys.map((key, cellIndex) => (
                                <td key={cellIndex}>{row[key]}</td>
                            ))}
                            <td><button id='edit-button' onClick={() => handleEdit()}>📝</button></td>
                            <td><button id='delete-button' onClick={() => handleEdit()}>🗑️</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showEmergent && (
                <EmergentCrud Title='Editar Producto' Fields={fields} TextButton='Editar 📝' handleBackgroundClick={handleBackgroundClick} Edit={() => {}} Delete={() => {}}/>
            )}
        </div>
    );
};
export default Table;