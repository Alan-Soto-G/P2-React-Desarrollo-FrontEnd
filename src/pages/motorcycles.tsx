import { useEffect, useState } from 'react';
import { getMotorcycles, deleteMotorcycle, updateMotorcycle } from '../services/MotorcycleService';
import Table from "../components/tableCrud";
import EmergentCrud from '../components/emergentCrud';

export default function MotorcyclesPage() {
  const [motorcycles, setMotorcycles] = useState<any[]>([]);
  const [motorcycleToEdit, setMotorcycleToEdit] = useState<any | null>(null);

  const fetchMotorcycles = async () => {
    try {
      const data = await getMotorcycles();
      setMotorcycles(data);
      console.log('Motocicletas:', data);
    } catch (error) {
      console.error('Error al obtener motocicletas:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta motocicleta?')) {
      await deleteMotorcycle(id);
      fetchMotorcycles();
    }
  };

  const handleEdit = async (id: number, updatedData: any) => {
    try {
      await updateMotorcycle(id, updatedData);
      setMotorcycleToEdit(null);
      fetchMotorcycles();
    } catch (error) {
      console.error("Error al editar motocicleta:", error);
    }
  };

  useEffect(() => {
    fetchMotorcycles();
  }, []);

  const headList = ["Placa", "Marca", "Año", "Estado", "Editar", "Eliminar"];

  return (
    <div className="motorcycles-container">
      <h2>Motocicletas Registradas</h2>
      {motorcycles.length === 0 ? (
        <p>No hay motocicletas registradas.</p>
      ) : (
        <Table
          HeadList={headList}
          Content={motorcycles}
          onEdit={(motorcycle) => setMotorcycleToEdit(motorcycle)}
          onDelete={handleDelete}
        />
      )}
      {motorcycleToEdit && (
        <EmergentCrud
          Title="Editar Motocicleta"
          Fields={{
            license_plate: { type: 'text', placeholder: 'Placa' },
            brand: { type: 'text', placeholder: 'Marca' },
            year: { type: 'number', placeholder: 'Año' },
            status: { type: 'text', placeholder: 'Estado' }
          }}
          TextButton="Actualizar 📝"
          Edit={handleEdit}
          Delete={() => {}}
          handleBackgroundClick={() => setMotorcycleToEdit(null)}
          DefaultValues={motorcycleToEdit}
        />
      )}
    </div>
  );
}
