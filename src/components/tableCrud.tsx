import React, { useRef, useState } from 'react';
import '../styles/tableCrud.css';
import EmergentCrud from '../components/emergentCrud';
import Lottie from "lottie-react";
import IconAdd from "../assets/add-button-animation.json";
import IconDelete from "../assets/delete-button-animation.json";
import IconEdit from "../assets/edit-button-animation.json";


interface FieldConfig { // Formato | Tipo de dato para los campos del form
    type: string; // Tipo del input
    placeholder: string; // Texto en el input
    validation?: { // Tipos de posibles validaciones
        maxLength?: number;
        minLength?: number;
        max?: number;
        min?: number;
        required?: boolean;
        pattern?: string;
    };
}

interface TableProps { // Props para el componente Table
    HeadList: string[]; // Encabezado
    ComplementTitle: string; // Complemento para el título de la tarjeta.
    // Ej: Si ComplementTitle = "Producto"; Eliminar {ComplementTitle} = Eliminar Prodcuto
    Content: { [key: string]: any }[]; // Data que retorna el backend para renderizar en la tabla
    Fields: { [key: string]: FieldConfig }; // Campos para el formulario
    ItemsArray: string[];
    UpdateTable: () => void; // Función para actualizar la tabla
    Add: (product: any) => void; // Función para agregar un producto
    Edit: (id: string, product: any) => void; // Función para editar un producto
    Delete: (id: string) => void;  // Función para eliminar un producto

}

const Table: React.FC<TableProps> = ({ HeadList, ComplementTitle, Content, Fields, ItemsArray, UpdateTable, Add, Edit, Delete }) => {

    const [showEmergent, setShowEmergent] = useState(false); // Estado para mostrar/ocultar la tarjeta emergente
    const [emergentType, setEmergentType] = useState(0); // Estado para el tipo de tarjeta emergente (1: agregar, 2: editar, 3: eliminar)
    const [textButton, setTextButton] = useState(""); // Estado para el texto del botón de la tarjeta emergente
    const [titleCard, setTitleCard] = useState(""); // Estado para el título de la tarjeta emergente
    const [selectedItem, setSelectedItem] = useState<any>(null); // Estado para el elemento seleccionado (para editar o eliminar)
    const [id, setId] = useState<any>(null); // Estado para almacenar el ID del producto seleccionado

    const addRef = useRef<any>(null); // Referencia para la animación de agregar
    const deleteRef = useRef<any>(null); // Referencia para la animación de eliminar
    const editRef = useRef<any>(null); // Referencia para la animación de editar

    const handleEmergent = () => {
        setShowEmergent(!showEmergent);
    };

    const handleBackgroundClick = (e: React.MouseEvent) => { // Maneja el clic fuera de la tarjeta emergente
        if (e.target === e.currentTarget) { // Verifica si el clic fue fuera de la tarjeta
            setShowEmergent(false); // Cierra la tarjeta emergente
        }
    };

    // Agregar esta función junto a las otras funciones handleXXX
    const handleAdd = () => {
        setSelectedItem(null); // Limpiar cualquier item seleccionado previamente
        handleEmergent();
        setEmergentType(1); // Establecer tipo como "agregar"
        setTextButton("Agregar ✅");
        setTitleCard(`Agregar ${ComplementTitle}`);
    };

    const handleEdit = (item: any) => {
        setSelectedItem(item); // Establece el elemento seleccionado para editar
        handleEmergent();
        setEmergentType(2);
        setTextButton("Editar 📝");
        setTitleCard(`Editar ${ComplementTitle}`);
    };

    

    return (
        <div className="table-container">
            <button 
            onClick={handleAdd} 
            className="add-button"
            onMouseEnter={() => addRef.current?.play()} // Reproduce la animación al pasar el mouse
            onMouseLeave={() => addRef.current?.stop()} // Detiene la animación al salir el mouse
            >Añadir
                <Lottie
                    lottieRef={addRef}
                    animationData={IconAdd}
                    loop
                    autoplay={false}
                    initialSegment={[30, 80]} // Esto muestra el primer frame
                    style={{ width: '40px', height: '40px' }}
                />
            </button>
            <table>
                <thead>
                    <tr>
                        {HeadList.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Content.map((row, rowIndex) => ( // Mapeo de cada fila
                        <tr key={rowIndex}> {/* Mapeo de cada columna */}
                            {ItemsArray.map((key, cellIndex) => ( // Mapeo de cada celda
                                <td key={cellIndex}>{row[key]}</td> // Muestra el valor de la celda
                            ))}
                            <td><button
                                id='edit-button'
                                onClick={() => {handleEdit(row); setId(row.id);}} // Establece el ID del producto seleccionado
                                onMouseEnter={() => editRef.current?.play()} // Reproduce la animación al pasar el mouse
                                onMouseLeave={() => editRef.current?.stop()} // Detiene la animación al salir el mouse
                            >
                                <Lottie
                                    lottieRef={editRef}
                                    animationData={IconEdit}
                                    loop
                                    autoplay={false}
                                    initialSegment={[30, 80]} // Esto muestra el primer frame
                                    style={{ width: '40px', height: '40px' }}
                                />
                            </button>
                            </td>
                            <td>
                                <button
                                    id='delete-button'
                                    onClick={() => { setSelectedItem(row); setId(row.id); handleEmergent(); setEmergentType(3); setTextButton(`Si, Eliminar 🗑️`); setTitleCard(`Eliminar ${ComplementTitle}`) }}
                                    onMouseEnter={() => deleteRef.current?.play()} // Reproduce la animación al pasar el mouse
                                    onMouseLeave={() => deleteRef.current?.stop()} // Detiene la animación al salir el mouse
                                >
                                    <Lottie
                                        lottieRef={deleteRef}
                                        animationData={IconDelete}
                                        loop
                                        autoplay={false}
                                        style={{ width: '40px', height: '40px', alignItems: 'center' }}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showEmergent && (
                <EmergentCrud
                    Title={titleCard} // Título de la tarjeta emergente
                    Fields={Fields} // Campos para el formulario
                    TextButton={textButton} // Texto del botón de la tarjeta emergente
                    EmergentType={emergentType} // Tipo de tarjeta emergente (1: agregar, 2: editar, 3: eliminar)
                    initialData={selectedItem} // Datos iniciales para editar
                    handleBackgroundClick={handleBackgroundClick} // Maneja el clic fuera de la tarjeta
                    Id={id} // ID del producto seleccionado
                    UpdateTable={UpdateTable}
                    Add={Add} // Función para agregar un producto
                    Edit={Edit} // Función para editar un producto
                    Delete={Delete} // Función para eliminar un producto
                />
            )}
        </div>
    );
};
export default Table;