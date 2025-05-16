// src/pages/DriverForm.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createDriver, updateDriver, getDrivers } from '../services/DriverService';
import type { Driver } from '../model/Driver';

const emptyDriver: Driver = {
  name: '',
  license_number: '',
  phone: '',
  email: '',
  status: '',
};

export default function DriverForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver>(emptyDriver);

  useEffect(() => {
    const fetchDriver = async () => {
      if (id) {
        const drivers = await getDrivers();
        const found = drivers.find((d) => d.id === parseInt(id));
        if (found) setDriver(found);
      }
    };
    fetchDriver();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateDriver(parseInt(id), driver);
      } else {
        await createDriver(driver);
      }
      navigate('/drivers');
    } catch (err) {
      alert('Error al guardar el conductor');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Conductor' : 'Crear Conductor'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={driver.name} onChange={handleChange} required />
        <input name="license_number" placeholder="Licencia" value={driver.license_number} onChange={handleChange} required />
        <input name="phone" placeholder="Teléfono" value={driver.phone} onChange={handleChange} required />
        <input name="email" placeholder="Correo" value={driver.email} onChange={handleChange} required />
        <input name="status" placeholder="Estado" value={driver.status} onChange={handleChange} required />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
