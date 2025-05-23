// Importamos cosas necesarias para este componente
import React, { useState, useEffect } from "react"; // React y dos funciones especiales: useState (para guardar datos), useEffect (para hacer algo cuando cambia algo)
import * as Yup from 'yup'; // Yup sirve para revisar si los datos están bien escritos, como si fuera un maestro que revisa tu tarea
import "../styles/emergentCrud.css" // Esto trae los colores y estilos bonitos para este componente
import Lottie from "lottie-react"; // Lottie nos permite poner animaciones bonitas
import DeleteDanger from "../assets/delete-danger-animation.json" // Esta es una animación que muestra peligro al borrar algo

// Esta parte dice cómo deben ser los "campos" (inputs) que le pasamos al formulario
interface FieldConfig {
    type: string; // Tipo de input: texto, número, fecha, etc.
    placeholder: string; // Texto que se muestra cuando el campo está vacío
    validation?: { // Opciones para validar lo que escribe el usuario
        maxLength?: number;
        minLength?: number;
        max?: number;
        min?: number;
        required?: boolean; // Si es obligatorio
        pattern?: string; // Si debe seguir un patrón (como solo letras o números)
    };
    options?: Array<{ // Para los campos tipo "select", una lista de opciones
        label: string; // Lo que ve el usuario
        value: string | number; // El valor real
    }>;
}

// Estas son todas las cosas que le podemos enviar a este componente
interface EmergentCrudProps {
    Id: any;
    Title: string; // El título de la ventana emergente
    Fields: { [key: string]: FieldConfig }; // Todos los campos que tendrá el formulario
    TextButton: string; // Lo que dirá el botón (Guardar, Editar, etc)
    EmergentType: number; // Tipo de ventana: 1 es agregar, 2 es editar, 3 es eliminar
    initialData?: { [key: string]: string }; // Datos que ya existen si estamos editando
    UpdateTable: () => void; // Función que se llama cuando se actualiza la tabla
    Add: (product: any) => void; // Agrega algo nuevo
    Edit: (id: string, product: any) => void; // Cambia algo que ya existe
    Delete: (id: string) => void; // Borra algo
    handleBackgroundClick: (e: React.MouseEvent) => void; // Si haces clic fuera de la ventana, se cierra
    validationSchema?: Yup.ObjectSchema<any>; // Esquema de validación, para saber si los datos están bien
}

// Ahora creamos el componente. Aquí empieza la función principal
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
    const [formData, setFormData] = useState<{ [key: string]: string }>({}); // Guardamos lo que escribe el usuario
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Guardamos errores si el usuario escribe mal algo

    // Elegimos color del botón dependiendo de si vamos a agregar, editar o eliminar
    const classButton = EmergentType === 1 ? "bg-green"
        : EmergentType === 2 ? "bg-blue"
        : "bg-red";

    // Este useEffect se usa para llenar el formulario si vamos a editar algo
    useEffect(() => {
        if (EmergentType === 2 && initialData) {
            setFormData(initialData); // Llenamos el formulario con datos ya existentes
        }
    }, [EmergentType, initialData]);

    // Esta función se llama cuando hacemos clic en el botón
    const handleSubmit = async () => {
        if (validationSchema) { // Si tenemos reglas para revisar...
            try {
                await validationSchema.validate(formData, { abortEarly: false }); // Revisamos todos los campos
                setErrors({}); // No hay errores
            } catch (yupError) {
                if (yupError instanceof Yup.ValidationError) {
                    const newErrors: { [key: string]: string } = {}; // Guardamos los errores de cada campo
                    yupError.inner.forEach(err => {
                        if (err.path) {
                            newErrors[err.path] = err.message; // Ponemos el mensaje de error
                        }
                    });
                    setErrors(newErrors); // Mostramos los errores
                    return; // No seguimos si hay errores
                }
            }
        }

        try {
            // Según lo que se quiere hacer (agregar, editar o borrar), llamamos a la función correcta
            switch (EmergentType) {
                case 1:
                    await Add(formData); // Agrega los datos
                    break;
                case 2:
                    await Edit(Id, formData); // Edita los datos
                    break;
                case 3:
                    await Delete(Id); // Borra
                    break;
            }

            // Si todo salió bien, actualizamos la tabla y cerramos la ventana
            UpdateTable();
            if (handleBackgroundClick) {
                handleBackgroundClick({
                    target: document.getElementById('emergent-crud'),
                    currentTarget: document.getElementById('emergent-crud')
                } as any);
            }
        } catch (error) {
            console.error("Error al realizar la operación:", error); // Mostramos el error si algo falló
        }
    };

    // Esta función se llama cuando escribimos algo en un input
    const handleInputChange = (key: string, value: string) => {
        setFormData(prev => ({
            ...prev,        // Conservamos lo anterior
            [key]: value    // Cambiamos solo el campo modificado
        }));
    };

    // Aquí empieza lo que se muestra en pantalla
    return (
        <div id="emergent-crud" onClick={handleBackgroundClick}> {/* Si haces clic fuera, se cierra */}
            <div id="card"> {/* La tarjetita que se muestra */}
                <h1>{Title}</h1>

                {(EmergentType === 1 || EmergentType === 2) ? (
                    Object.entries(Fields).map(([key, field], index) => (
                        <div key={index} className="fields">
                            {field.type === "select" ? (
                                <> {/* Si el campo es de tipo "select" (una lista de opciones) */}
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
                                <> {/* Si el campo es un input normal (texto, número, etc.) */}
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
                ) : (
                    <div id="icon-danger-delete"> {/* Si vamos a eliminar, mostramos una animación de peligro */}
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
                    onClick={handleSubmit} // Cuando hacen clic, mandamos el formulario
                >
                    {TextButton}
                </button>
            </div>
        </div>
    );
};

// Exportamos el componente para usarlo en otras partes del proyecto
export default EmergentCrud;
