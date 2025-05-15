import React from 'react';
import '../styles/tableCrud.css';

interface TableProps {
    HeadList: string[];
    Content:  any[][];
    Edit:     (id: string) => void;
    Delete:   (id: string) => void;
}

const Table: React.FC<TableProps> = ({ HeadList, Content, Edit, Delete }) => {
    return (
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
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                        <td><button id='edit-button'   onClick={() => Edit(row[0])}>📝</button></td>
                        <td><button id='delete-button' onClick={() => Delete(row[0])}>🗑️</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default Table;