import React, { useState } from "react";
import "../styles/emergentCrud.css"

interface EmergentCrudProps {
    Title: string;
    Fields: { [key: string]: { type: string; placeholder: string; } }; // key: input type, value: placeholder
    TextButton: string;
    Edit: (id: string, product: any) => void;
    Delete: (id: string) => void;
    handleBackgroundClick: (e: React.MouseEvent) => void;
}

const EmergentCrud: React.FC<EmergentCrudProps> = ({ Title, Fields, TextButton, handleBackgroundClick }) => {
    
    return (
        <div id="emergent-crud" onClick={handleBackgroundClick}>
            <div id="card">
                <h1>{Title}</h1>
                {Object.entries(Fields).map(([_key, field], index) => (
                    <div key={index} className="fields">
                        <input
                            type={field.type}
                            id={field.type}
                            placeholder={field.placeholder}
                        />
                    </div>
                ))}
                <button>{TextButton}</button>
            </div>
        </div>
    );
};
export default EmergentCrud;
