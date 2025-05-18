import React, { useState, useEffect } from "react";
import "../styles/emergentCrud.css"
import Lottie from "lottie-react";
import DeleteDanger from "../assets/delete-danger-animation.json"

interface FieldConfig { // Formato | Tipo de dato para los campos del form
    type: string;
    placeholder: string;
    validation?: {
        maxLength?: number;
        minLength?: number;
        max?: number;
        min?: number;
        required?: boolean;
        pattern?: string;
    };
}

interface EmergentCrudProps { // Props para el componente EmergentCrud
    Id: any;
    Title: string; // Título de la tarjeta
    Fields: { [key: string]: FieldConfig }; // key: input type, value: FieldConfig
    TextButton: string; // Texto del botón
    EmergentType: number; // Tipo de tarjeta emergente (1: agregar, 2: editar, 3: eliminar)
    initialData?: { [key: string]: string }; // Datos iniciales para editar
    UpdateTable: () => void; // Función para actualizar la tabla
    Add: (product: any) => void; // Función para agregar un producto
    Edit: (id: string, product: any) => void; // Función para editar un producto
    Delete: (id: string) => void; // Función para eliminar un producto
    handleBackgroundClick: (e: React.MouseEvent) => void; // Maneja el clic fuera de la tarjeta emergente
}

const EmergentCrud: React.FC<EmergentCrudProps> = ({ Title, Fields, TextButton, EmergentType, Id, UpdateTable, Add, Edit, Delete, handleBackgroundClick, initialData }) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({}); // Estado para almacenar los datos del formulario
    const classButton = EmergentType === 1 ? "bg-green" // Cambia el color del botón según el tipo de EmergentCrud
        : EmergentType === 2 ? "bg-blue"
            : "bg-red";

    useEffect(() => { // Efecto para inicializar el formulario con datos iniciales si se está editando
        if (EmergentType === 2 && initialData) {
            setFormData(initialData);
        }
    }, [EmergentType, initialData]);

    const handleSumbit = async () => {
        try {
            switch (EmergentType) {
                case 1:
                    await Add(formData);
                    break;
                case 2:
                    await Edit(Id, formData);
                    break;
                case 3:
                    await Delete(Id);
                    break;
            }
            // Solo actualiza y cierra si la operación fue exitosa
            UpdateTable();
            // Opcional: cerrar la ventana emergente después de una operación exitosa
            if (handleBackgroundClick) {
                handleBackgroundClick({ target: document.getElementById('emergent-crud'), currentTarget: document.getElementById('emergent-crud') } as any);
            }
        } catch (error) {
            console.error("Error al realizar la operación:", error);
            // No actualizar la tabla ni cerrar la ventana si hubo un error
        }
    }

    const handleInputChange = (key: string, value: string) => { // Maneja el cambio en los inputs
        setFormData(prev => ({  // Usa el estado previo
            ...prev,            // Mantiene todos los valores anteriores
            [key]: value       // Actualiza solo el campo modificado
        }));
    };

    return (
        <div id="emergent-crud" onClick={handleBackgroundClick}>
            <div id="card">
                <h1>{Title}</h1>
                {EmergentType === 1 || EmergentType === 2 ? ( // Agregar o Editar
                    Object.entries(Fields).map(([key, field], index) => ( // Muestra los campos del formulario
                        <div key={index} className="fields">
                            <input
                                onChange={(e) => handleInputChange(key, e.target.value)}
                                value={formData[key] || ''}  // Conecta el input con el estado
                                type={field.type}
                                id={key}
                                placeholder={field.placeholder}
                                maxLength={field.validation?.maxLength}
                                minLength={field.validation?.minLength}
                                max={field.validation?.max}
                                min={field.validation?.min}
                                required={field.validation?.required}
                                pattern={field.validation?.pattern}
                            />
                        </div>
                    ))
                ) : ( // Eliminar
                    <div id="icon-danger-delete">
                        <Lottie
                            animationData={DeleteDanger}
                            loop
                            autoplay
                        />
                        <b id="text-alert"> ¿Estás segur@ de eliminar el registro?</b>
                    </div>
                )}
                <button
                    className={classButton}
                    onClick={handleSumbit}
                >
                    {TextButton}
                </button>
            </div>
        </div>
    );
};
export default EmergentCrud;