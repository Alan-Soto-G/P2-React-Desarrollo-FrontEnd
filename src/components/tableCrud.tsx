// components/tableCrud.tsx
import React from 'react';
import '../styles/tableCrud.css';

interface TableProps {
  HeadList: string[];
  Content: any[]; // objetos con name, license_number, etc.
  onEdit: (driver: any) => void;
  onDelete: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ HeadList, Content, onEdit, onDelete }) => {
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
          {Content.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.license_number}</td>
              <td>{row.phone}</td>
              <td>{row.email}</td>
              <td>{row.status}</td>
              <td>
                <button id="edit-button" onClick={() => onEdit(row)}>📝</button>
              </td>
              <td>
                <button id="delete-button" onClick={() => onDelete(row.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
