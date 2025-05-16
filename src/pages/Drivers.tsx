import { useEffect, useState } from 'react';
import { getDrivers, deleteDriver } from '../services/DriverService';
import type { Driver } from '../model/Driver';
import Table from "../components/tableCrud"

export default function DriversPage() {
  const [drivers, setDrivers] = useState<any[]>([]);

  const reorderDriverData = (driver: any) => {
    return {
      name: driver.name,
      license_number: driver.license_number,
      phone: driver.phone,
      email: driver.email,
      status: driver.status
    };
  };

  const fetchDrivers = async () => {
    try {
      const data = await getDrivers();
      const orderedData = data.map(reorderDriverData);
      setDrivers(orderedData);
      console.log('Conductores:', orderedData);
    } catch (error) {
      console.error('Error al obtener conductores:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este conductor?')) {
      await deleteDriver(id);
      fetchDrivers();
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const headList = ["Nombre", "Licencia", "Teléfono", "Correo", "Estado", "Editar", "Eliminar"]

  return (
    <div className="drivers-container">
      <h2>Conductores Registrados</h2>
      {drivers.length === 0 ? (
        <p>No hay conductores registrados.</p>
      ) : (
        <Table HeadList={headList} Content={drivers}/>
      )}
    </div>
  );
}
