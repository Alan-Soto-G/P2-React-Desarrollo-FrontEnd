import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import '../styles/tableCrud.css';
import EmergentCrud from '../components/emergentCrud';
import Lottie from "lottie-react";
import IconAdd from "../assets/add-button-animation.json";
import IconDelete from "../assets/delete-button-animation.json";
import IconEdit from "../assets/edit-button-animation.json";

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
}

interface TableProps {
  HeadList: string[];
  ComplementTitle: string;
  Content: { [key: string]: any }[];
  Fields: { [key: string]: FieldConfig };
  ItemsArray: string[];
  UpdateTable: () => void;
  Add: (content: any) => void;
  Edit: (id: string, content: any) => void;
  Delete: (id: string) => void;
  validationSchema?: Yup.ObjectSchema<any>;

  // Cambiado: acepta funciones que devuelven componentes React directamente
  customRender?: { [key: string]: (value: any, row?: any) => React.ReactNode };
}

const Table: React.FC<TableProps> = ({
  HeadList,
  ComplementTitle,
  Content,
  Fields,
  ItemsArray,
  UpdateTable,
  Add,
  Edit,
  Delete,
  validationSchema,
  customRender,
}) => {
  const [showEmergent, setShowEmergent] = useState(false);
  const [emergentType, setEmergentType] = useState(0);
  const [textButton, setTextButton] = useState("");
  const [titleCard, setTitleCard] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [id, setId] = useState<any>(null);

  const addRef = useRef<any>(null);
  const deleteRef = useRef<any>(null);
  const editRef = useRef<any>(null);

  const handleEmergent = () => {
    setShowEmergent(!showEmergent);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowEmergent(false);
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    handleEmergent();
    setEmergentType(1);
    setTextButton("Agregar ✅");
    setTitleCard(`Agregar ${ComplementTitle}`);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
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
        onMouseEnter={() => addRef.current?.play()}
        onMouseLeave={() => addRef.current?.stop()}
      >
        Añadir
        <Lottie
          lottieRef={addRef}
          animationData={IconAdd}
          loop
          autoplay={false}
          initialSegment={[30, 80]}
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
          {Content.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {ItemsArray.map((key, cellIndex) => (
                <td key={cellIndex}>
                  {customRender && customRender[key]
                    ? customRender[key](row[key], row)
                    : row[key]}
                </td>
              ))}
              <td>
                <button
                  id="edit-button"
                  onClick={() => {
                    handleEdit(row);
                    setId(row.id);
                  }}
                  onMouseEnter={() => editRef.current?.play()}
                  onMouseLeave={() => editRef.current?.stop()}
                >
                  <Lottie
                    lottieRef={editRef}
                    animationData={IconEdit}
                    loop
                    autoplay={false}
                    initialSegment={[30, 80]}
                    style={{ width: '40px', height: '40px' }}
                  />
                </button>
              </td>
              <td>
                <button
                  id="delete-button"
                  onClick={() => {
                    setSelectedItem(row);
                    setId(row.id);
                    handleEmergent();
                    setEmergentType(3);
                    setTextButton(`Si, Eliminar 🗑️`);
                    setTitleCard(`Eliminar ${ComplementTitle}`);
                  }}
                  onMouseEnter={() => deleteRef.current?.play()}
                  onMouseLeave={() => deleteRef.current?.stop()}
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
          Title={titleCard}
          Fields={Fields}
          TextButton={textButton}
          EmergentType={emergentType}
          initialData={selectedItem}
          handleBackgroundClick={handleBackgroundClick}
          Id={id}
          UpdateTable={UpdateTable}
          Add={Add}
          Edit={Edit}
          Delete={Delete}
        />
      )}
    </div>
  );
};

export default Table;
