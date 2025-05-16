// pages/DriversPage.tsx
import { useEffect, useState } from 'react';
import { getDrivers, deleteDriver, updateDriver } from '../services/DriverService';
import Table from "../components/tableCrud";
import EmergentCrud from '../components/emergentCrud';

export default function DriversPage() {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [driverToEdit, setDriverToEdit] = useState<any | null>(null);

  const fetchDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data);
      console.log('Conductores:', data);
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

  const handleEdit = async (id: number, updatedData: any) => {
    try {
      await updateDriver(id, updatedData);
      setDriverToEdit(null);
      fetchDrivers();
    } catch (error) {
      console.error("Error al editar conductor:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const headList = ["Nombre", "Licencia", "Teléfono", "Correo", "Estado", "Editar", "Eliminar"];

  return (
    <div className="drivers-container">
      <h2>Conductores Registrados</h2>
      {drivers.length === 0 ? (
        <p>No hay conductores registrados.</p>
      ) : (
        <Table
          HeadList={headList}
          Content={drivers}
          onEdit={(driver) => setDriverToEdit(driver)}
          onDelete={handleDelete}
        />
      )}
      {driverToEdit && (
        <EmergentCrud
          Title="Editar Conductor"
          Fields={{
            name: { type: 'text', placeholder: 'Nombre' },
            license_number: { type: 'text', placeholder: 'Número de Licencia' },
            phone: { type: 'text', placeholder: 'Teléfono' },
            email: { type: 'text', placeholder: 'Correo' },
            status: { type: 'text', placeholder: 'Estado' }
          }}
          TextButton="Actualizar 📝"
          Edit={handleEdit}
          Delete={() => {}}
          handleBackgroundClick={() => setDriverToEdit(null)}
          DefaultValues={driverToEdit}
        />
      )}
    </div>
  );
}
