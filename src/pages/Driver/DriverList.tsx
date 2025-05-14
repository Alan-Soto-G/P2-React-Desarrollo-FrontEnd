import { useEffect, useState } from "react";
import { getDrivers, deleteDriver } from "../../services/DriverService";
import type { Driver } from "../../model/Driver";

export const DriversList = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const loadDrivers = async () => {
    const data = await getDrivers();
    setDrivers(data);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Eliminar este conductor?")) {
      await deleteDriver(id);
      loadDrivers();
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  return (
    <div>
      <h2>Conductores</h2>
      <ul>
        {drivers.map((d) => (
          <li key={d.id}>
            {d.name} - {d.phone} - {d.email}
            <button onClick={() => handleDelete(d.id!)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
