import { useEffect, useState } from 'react';
import { getDrivers, deleteDriver } from '../services/DriverService';
import type { Driver } from '../model/Driver';

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const fetchDrivers = async () => {
    try {
      const data = await getDrivers();
      setDrivers(data);
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

  return (
    <div className="drivers-container">
      <h2>Conductores Registrados</h2>
      {drivers.length === 0 ? (
        <p>No hay conductores registrados.</p>
      ) : (
        <table className="driver-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Licencia</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.license_number}</td>
                <td>{d.phone}</td>
                <td>{d.email}</td>
                <td>{d.status}</td>
                <td>
                  <button onClick={() => handleDelete(d.id!)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
