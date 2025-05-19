import React, { useState, useEffect } from "react";
import "../styles/emergentCrud.css"
import Lottie from "lottie-react";
import DeleteDanger from "../assets/delete-danger-animation.json"
import * as Yup from 'yup';

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
    accept?: string; // Nuevo campo para aceptar tipos de archivos
    multiple?: boolean; // Nuevo campo para permitir múltiples archivos
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
    validationSchema?: Yup.ObjectSchema<any>; // Nuevo prop para el esquema de validación
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
    const [formData, setFormData] = useState<{ [key: string]: any }>({}); // Estado para almacenar los datos del formulario
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Estado para almacenar los errores de validación
    const classButton = EmergentType === 1 ? "bg-green" // Cambia el color del botón según el tipo de EmergentCrud
        : EmergentType === 2 ? "bg-blue"
            : "bg-red";

    useEffect(() => { // Efecto para inicializar el formulario con datos iniciales si se está editando
        if (EmergentType === 2 && initialData) {
            setFormData(initialData);
        }
    }, [EmergentType, initialData]);

    const handleInputChange = (key: string, value: any) => {
        // Determinar el tipo de campo
        const fieldType = Fields[key]?.type;
        
        // Manejar diferentes tipos de valores según el tipo de campo
        let processedValue: any = value;
        
        if (fieldType === 'number') {
            processedValue = value === '' ? '' : Number(value);
        }
        else if (fieldType === 'file') {
            // Para inputs de tipo file, guardar el FileList
            processedValue = (value.target && value.target.files) ? value.target.files : value;
        }
        
        // Actualizar el estado con el valor convertido
        setFormData(prev => ({
            ...prev,
            [key]: processedValue
        }));
        
        // Validación en tiempo real si existe un esquema
        if (validationSchema) {
            validationSchema
                .validateAt(key, { [key]: processedValue })
                .then(() => {
                    // Campo válido, eliminar error si existía
                    setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors[key];
                        return newErrors;
                    });
                })
                .catch(err => {
                    // Campo inválido, mostrar error
                    setErrors(prev => ({
                        ...prev,
                        [key]: err.message
                    }));
                });
        }
    };

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault(); // Importante: prevenir el envío por defecto

        // Si tenemos un esquema de validación, usarlo
        if (validationSchema) {
            try {
                // Validar todos los campos
                await validationSchema.validate(formData, { abortEarly: false });
                
                // Si llegamos aquí, no hay errores de validación
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
                    // Actualizar tabla y cerrar ventana
                    UpdateTable();
                    if (handleBackgroundClick) {
                        handleBackgroundClick({ target: document.getElementById('emergent-crud'), currentTarget: document.getElementById('emergent-crud') } as any);
                    }
                } catch (error) {
                    console.error("Error al realizar la operación:", error);
                }
            } catch (validationError) {
                if (validationError instanceof Yup.ValidationError) {
                    // Procesar errores de validación
                    const newErrors: { [key: string]: string } = {};
                    validationError.inner.forEach(err => {
                        if (err.path) {
                            newErrors[err.path] = err.message;
                        }
                    });
                    setErrors(newErrors);
                }
            }
        } else {
            // Si no hay esquema, usar validación del navegador (comportamiento anterior)
            const form = document.getElementById('crud-form') as HTMLFormElement;
            if (form.checkValidity()) {
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
                    // Actualizar tabla y cerrar ventana
                    UpdateTable();
                    if (handleBackgroundClick) {
                        handleBackgroundClick({ target: document.getElementById('emergent-crud'), currentTarget: document.getElementById('emergent-crud') } as any);
                    }
                } catch (error) {
                    console.error("Error al realizar la operación:", error);
                }
            } else {
                // Activar la validación visual nativa del navegador
                form.reportValidity();
            }
        }
    }

    return (
        <div id="emergent-crud" onClick={handleBackgroundClick}>
            <div id="card">
                <h1>{Title}</h1>
                {EmergentType === 1 || EmergentType === 2 ? ( // Agregar o Editar
                    <form id="crud-form" onSubmit={handleSumbit}>
                        {Object.entries(Fields).map(([key, field], index) => ( // Muestra los campos del formulario
                            <div key={index} className="fields">
                                {field.type === "file" ? (
                                    <div className="file-input-container">
                                        <input
                                            type="file"
                                            onChange={(e) => handleInputChange(key, e)}
                                            id={key}
                                            accept={field.accept || "image/*"}
                                            required={field.validation?.required}
                                            className={errors[key] ? 'error' : ''}
                                            multiple={field.multiple} // Permitir múltiples archivos
                                        />
                                        {formData[key] && formData[key] instanceof FileList && formData[key].length > 0 && (
                                            <div className="image-preview">
                                                {/* Mostrar vista previa de la primera imagen */}
                                                <img src={URL.createObjectURL(formData[key][0])} alt="Vista previa" />
                                                {formData[key].length > 1 && (
                                                    <span className="image-count">{formData[key].length} imágenes</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : field.type === "select" ? (
                                    <select
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                        value={formData[key] || ''}
                                        id={key}
                                        required={field.validation?.required}
                                        className={`select-dropdown ${errors[key] ? 'error' : ''}`}
                                    >
                                        <option value="">-- Seleccione {field.placeholder} --</option>
                                        {field.options?.map((option, i) => (
                                            <option key={i} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
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
                                        className={errors[key] ? 'error' : ''}
                                    />
                                )}
                                {errors[key] && <div className="error-message">{errors[key]}</div>}
                            </div>
                        ))}
                        <button
                            type="submit"
                            className={classButton}
                        >
                            {TextButton}
                        </button>
                    </form>
                ) : ( // Eliminar
                    <>
                        <div id="icon-danger-delete">
                            <Lottie
                                animationData={DeleteDanger}
                                loop
                                autoplay
                            />
                            <b id="text-alert"> ¿Estás segur@ de eliminar el registro?</b>
                        </div>
                        <button 
                            className={classButton}
                            onClick={handleSumbit}
                        >
                            {TextButton}
                        </button>
                    </>
                )}
            </div>
        </div >
    );
};
export default EmergentCrud;