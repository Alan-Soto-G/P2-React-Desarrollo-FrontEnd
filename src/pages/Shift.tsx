import React, { useEffect, useState } from "react";
import Table from "../components/tableCrud";
import {
  GetShifts,
  CreateShift,
  EditShift,
  DeleteShift,
} from "../services/ShiftService";

interface Shift {
  id: number;
  start_time: Date;
  end_time: Date;
  status: string;
}

// Separación entre columnas de datos y acciones
const dataHeaders = ["ID", "Start Time", "End Time", "Status"];
const actionHeaders = ["Edit", "Delete"];
const headList = [...dataHeaders, ...actionHeaders];

// Propiedades que se muestran en la tabla (excluyendo acciones)
const itemsArray = ["id", "start_time", "end_time", "status"];

const Shifts: React.FC = () => {
  const [content, setContent] = useState<Shift[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fields = {
    start_time: {
      type: "date",
      placeholder: "Fecha de inicio",
      validation: {
        required: true,
      },
    },
    end_time: {
      type: "date",
      placeholder: "Fecha de finalización",
      validation: {
        required: true,
      },
    },
    status: {
      type: "text",
      placeholder: "Estado",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 20,
        pattern: "^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$", // Solo letras con tildes y espacios
      },
    },
  };

  const fetchShifts = async () => {
    try {
      const result = await GetShifts();
      if (result) setContent(result);
    } catch (error) {
      console.error("Error fetching oders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  if (loading) {
    return <div className="loading-indicator">Loading...</div>;
  }

  return (
    <div className="turnos-container">
      <h1>Gestión de Turnos</h1>
      <Table
        HeadList={headList}
        ComplementTitle="Orden"
        Content={content}
        Fields={fields}
        ItemsArray={itemsArray}
        UpdateTable={fetchShifts}
        Add={CreateShift}
        Edit={EditShift}
        Delete={DeleteShift}
      />
    </div>
  );
};
export default Shifts;
