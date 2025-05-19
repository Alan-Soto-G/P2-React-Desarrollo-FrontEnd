import { useEffect, useState } from 'react';
import { getMotorcycles, createMotorcycle, updateMotorcycle, deleteMotorcycle } from '../services/MotorcycleService.ts';
import Table from "../components/tableCrud";

interface Motorcycle {
  id: number;
  license_plate: string;
  brand: string;
  year: number;
  status: string;
};

const dataHeaders = ["Placa", "Marca", "Año", "Estado"];
const actionHeaders = ["Editar", "Eliminar"];
const headList = [...dataHeaders, ...actionHeaders];
const itemsArray = ["license_plate", "brand", "year", "status"];

const MotorcyclesPage: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fields = {
    license_plate: {
      type: 'text',
      placeholder: 'Placa de la motocicleta',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 10,
        pattern: '^[A-Z0-9]+$'
      }
    },
    brand: {
      type: 'text',
      placeholder: 'Marca de la motocicleta',
      validation: {
        required: true,
        minLength: 2,
        maxLength: 30
      }
    },
    year: {
      type: 'number',
      placeholder: 'Año del modelo',
      validation: {
        required: true,
        min:190,
        max: new Date().getFullYear() + 1
      }
    },
    status: {
      type: 'text',
      placeholder: 'Estado de la motocicleta',
      validation: {
        required: true
      }
    }
  };

  const fetchMotorcycles = async () => {
    try {
      const response = await getMotorcycles();
      if (response) setMotorcycles(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching motorcycles:', error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchMotorcycles() }, []);
  
  if (loading) {
    return <div className="loading-indicator">Loading...</div>;
  }

  return (
    <div className="table-container">
      <h1 id="title-products">Motocicletas</h1>
      <Table
        HeadList={headList}
        ComplementTitle="Motocicleta"
        Content={motorcycles}
        Fields={fields}
        ItemsArray={itemsArray}
        UpdateTable={fetchMotorcycles}
        Add={createMotorcycle}
        Edit={updateMotorcycle}
        Delete={deleteMotorcycle}
      />
    </div>
  );
}

export default MotorcyclesPage;
