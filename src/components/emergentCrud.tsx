import React, { useState, useEffect } from "react";
import * as Yup from 'yup';
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
    options?: Array<{
        label: string;
        value: string | number;
    }>;
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
    validationSchema?: Yup.ObjectSchema<any>; // Add this line
}

const EmergentCrud: React.FC<EmergentCrudProps> = ({ 
    Title, 
    Fields, 
    TextButton, 
    EmergentType, 
    Id, 
    UpdateTable, 
    Add, 
    Edit, 
    Delete, 
    handleBackgroundClick, 
    initialData, 
    validationSchema 
}) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const classButton = EmergentType === 1 ? "bg-green" // Cambia el color del botón según el tipo de EmergentCrud
        : EmergentType === 2 ? "bg-blue"
            : "bg-red";

    useEffect(() => { // Efecto para inicializar el formulario con datos iniciales si se está editando
        if (EmergentType === 2 && initialData) {
            setFormData(initialData);
        }
    }, [EmergentType, initialData]);

    const handleSubmit = async () => {
        // Validate with Yup if schema is provided
        if (validationSchema) {
            try {
                await validationSchema.validate(formData, { abortEarly: false });
                setErrors({});  // Clear any previous errors
            } catch (yupError) {
                if (yupError instanceof Yup.ValidationError) {
                    // Transform Yup's errors into a more usable format
                    const newErrors: { [key: string]: string } = {};
                    yupError.inner.forEach(err => {
                        if (err.path) {
                            newErrors[err.path] = err.message;
                        }
                    });
                    setErrors(newErrors);
                    return; // Stop submission if validation fails
                }
            }
        }

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
            // Only update and close if operation was successful
            UpdateTable();
            if (handleBackgroundClick) {
                handleBackgroundClick({ 
                    target: document.getElementById('emergent-crud'), 
                    currentTarget: document.getElementById('emergent-crud') 
                } as any);
            }
        } catch (error) {
            console.error("Error al realizar la operación:", error);
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
                            {field.type === "select" ? (
                                <>
                                    <select
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                        value={formData[key] || ''}
                                        id={key}
                                        className={`select-dropdown ${errors[key] ? 'error' : ''}`}
                                    >
                                        <option value="">-- Seleccione {field.placeholder} --</option>
                                        {field.options?.map((option, i) => (
                                            <option key={i} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors[key] && <div className="error-message">{errors[key]}</div>}
                                </>
                            ) : (
                                <>
                                    <input
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                        value={formData[key] || ''}
                                        type={field.type}
                                        id={key}
                                        placeholder={field.placeholder}
                                        className={errors[key] ? 'error' : ''}
                                    />
                                    {errors[key] && <div className="error-message">{errors[key]}</div>}
                                </>
                            )}
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
                    onClick={handleSubmit}  // Changed from handleSumbit to handleSubmit
                >
                    {TextButton}
                </button>
            </div>
        </div>
    );
};
export default EmergentCrud;