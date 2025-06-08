import React, { useState, useEffect } from "react";
import * as Yup from 'yup';
import "../styles/emergentCrud.css"
import Lottie from "lottie-react";
import DeleteDanger from "../assets/delete-danger-animation.json"

interface FieldConfig {
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
    readOnly?: boolean;
}

interface EmergentCrudProps {
    Id: any;
    Title: string;
    Fields: { [key: string]: FieldConfig };
    TextButton: string;
    EmergentType: number;
    initialData?: { [key: string]: string };
    UpdateTable: () => void;
    Add: (product: any) => void;
    Edit: (id: string, product: any) => void;
    Delete: (id: string) => void;
    handleBackgroundClick: (e: React.MouseEvent) => void;
    validationSchema?: Yup.ObjectSchema<any>;
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

    const classButton = EmergentType === 1 ? "bg-green"
        : EmergentType === 2 ? "bg-blue"
        : "bg-red";

    useEffect(() => {
        if ((EmergentType === 1 || EmergentType === 2) && initialData) {
            setFormData(initialData);
        }
    }, [EmergentType, initialData]);

    const handleSubmit = async () => {
        if (validationSchema) {
            try {
                await validationSchema.validate(formData, { abortEarly: false });
                setErrors({});
            } catch (yupError) {
                if (yupError instanceof Yup.ValidationError) {
                    const newErrors: { [key: string]: string } = {};
                    yupError.inner.forEach(err => {
                        if (err.path) {
                            newErrors[err.path] = err.message;
                        }
                    });
                    setErrors(newErrors);
                    return;
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
    };

    const handleInputChange = (key: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div id="emergent-crud" onClick={handleBackgroundClick}>
            <div id="card">
                <h1>{Title}</h1>

                {(EmergentType === 1 || EmergentType === 2) ? (
                    Object.entries(Fields).map(([key, field], index) => (
                        <div key={index} className="fields">
                            <label htmlFor={key}>{field.placeholder}</label>
                            {field.readOnly ? (
                                <input
                                    type="text"
                                    value={formData[key] || ''}
                                    id={key}
                                    disabled
                                    className="readonly-input"
                                />
                            ) : field.type === "select" ? (
                                <>
                                    <select
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                        value={formData[key] || ''}
                                        id={key}
                                        className={`select-dropdown ${errors[key] ? 'error' : ''}`}
                                        disabled={field.readOnly}
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
                                        readOnly={field.readOnly || false}
                                    />
                                    {errors[key] && <div className="error-message">{errors[key]}</div>}
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <div id="icon-danger-delete">
                        <Lottie
                            animationData={DeleteDanger}
                            loop
                            autoplay
                        />
                        <b id="text-alert"> ¿Estás segur@ de eliminar el registro?</b>
                    </div>
                )}

                <button className={classButton} onClick={handleSubmit}>
                    {TextButton}
                </button>
            </div>
        </div>
    );
};

export default EmergentCrud;
