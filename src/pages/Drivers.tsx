import { useEffect, useState } from 'react';
import { GetDrivers, CreateDriver, UpdateDriver, DeleteDriver } from '../services/DriverService';
import Table from "../components/tableCrud"

interface Driver {
  name: string;
  license_number: string;
  phone: string;
  email: string;
  status: string;
};

const dataHeaders = ["Nombre", "Licencia", "Teléfono", "Correo", "Estado"];
const actionHeaders = ["Editar", "Eliminar"];
const headList = [...dataHeaders, ...actionHeaders];
const itemsArray = ["name", "license_number", "phone", "email", "status"];

const DriversPage:React.FC = () => {

  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fields = {
    name: {
      type: 'text',
      placeholder: 'Nombre del conductor',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50,
        pattern: '^[a-zA-Z0-9 ]+$'
      }
    },
    license_number: {
      type: 'text',
      placeholder: 'Número de licencia',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 30
      }
    },
    phone: {
      type: 'text',
      placeholder: 'Teléfono del conductor',
      validation: {
        required: true,
        minLength: 10,
        maxLength: 15
      }
    },
    email: {
      type: 'email',
      placeholder: 'Correo electrónico',
      validation: {
        required: true,
        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'
      }
    },
    status:{
      type:'text',
      placeholder:'Estado del conductor',
      validation:{
        required:true
      }
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await GetDrivers();
      if (response) setDrivers(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchDrivers() }, []);
  
  if (loading) {
    return <div className="loading-indicator">Loading...</div>;
  }

  return (
    <div className="drivers-container">
      <Table
        HeadList={headList}
        ComplementTitle="Conductor"
        Content={drivers}
        Fields={fields}
        ItemsArray={itemsArray}
        UpdateTable={fetchDrivers}
        Add={CreateDriver}
        Edit={UpdateDriver}
        Delete={DeleteDriver}
      />
    </div>
  );
}
export default DriversPage;