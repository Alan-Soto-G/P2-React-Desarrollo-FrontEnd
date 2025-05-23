import { useEffect, useState } from 'react';
import { getMotorcycles, createMotorcycle, updateMotorcycle, deleteMotorcycle } from '../services/MotorcycleService.ts';
import Table from "../components/tableCrud";
import { useNavigate } from 'react-router-dom';
import EmergentCrud from '../components/emergentCrud';
import { CreateInfringement, GetInfringements } from '../services/InfringementService.ts';
import * as Yup from 'yup';

interface Motorcycle {
  id: number;
  license_plate: string;
  brand: string;
  year: number;
  status: string;
}

interface Infringement {
  id: number;
  name: string;
}

const dataHeaders = ["Placa", "Marca", "Año", "Estado", "Infracción"];
const actionHeaders = ["Editar", "Eliminar"];
const headList = [...dataHeaders, ...actionHeaders];
const itemsArray = ["license_plate", "brand", "year", "status", "infraction_button"];

const MotorcyclesPage: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [infringements, setInfringements] = useState<Infringement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInfractionForm, setShowInfractionForm] = useState(false);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<number | null>(null);
  const navigate = useNavigate();

  // Configuración del formulario para motocicletas
  const motorcycleFields = {
    license_plate: {
      type: 'text',
      placeholder: 'Placa de la motocicleta',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 10,
        pattern: '^[A-Z0-9]+$',
      },
    },
    brand: {
      type: 'text',
      placeholder: 'Marca de la motocicleta',
      validation: {
        required: true,
        minLength: 2,
        maxLength: 30,
      },
    },
    year: {
      type: 'number',
      placeholder: 'Año del modelo',
      validation: {
        required: true,
        min: 190,
        max: new Date().getFullYear() + 1,
      },
    },
    status: {
      type: 'select',
      placeholder: 'Estado de la motocicleta',
      validation: {
        required: true,
      },
      options: [
        { label: 'Disponible', value: 'available' },
        { label: 'En mantenimiento', value: 'maintenance' },
        { label: 'En uso', value: 'in_use' },
        { label: 'Fuera de servicio', value: 'out_of_service' },
      ],
    },
  };

  // Validación para formulario de infracción
  const infractionValidationSchema = Yup.object({
    infringement_type: Yup.string().required('El tipo de infracción es obligatorio'),
    date: Yup.string()
      .required('La fecha y hora son obligatorias')
      .test(
        'not-future',
        'La fecha no puede ser en el futuro',
        value => {
          if (!value) return true;
          return new Date(value) <= new Date();
        }
      ),
  });

  // Obtener infracciones y poblar el formulario
  useEffect(() => {
    const fetchInfringements = async () => {
      try {
        const result = await GetInfringements();
        if (result) setInfringements(result);
      } catch (err) {
        console.error('Error al cargar tipos de infracción:', err);
      }
    };
    fetchInfringements();
  }, []);

  // Opciones para select de tipo de infracción
  const infringementOptions = infringements.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const infractionFields = {
    infringement_type: {
      type: 'select',
      placeholder: 'Tipo de infracción',
      options: infringementOptions,
      validation: { required: true },
    },
    date: {
      type: 'datetime-local',
      placeholder: 'Fecha y hora de la infracción',
      validation: { required: true },
    },
  };

  // Cargar motocicletas
  const fetchMotorcycles = async () => {
    try {
      const response = await getMotorcycles();
      if (response) {
        const withButtons = response.map((moto: Motorcycle) => ({
          ...moto,
          infraction_button: moto.id,
        }));
        setMotorcycles(withButtons);
      }
    } catch (err) {
      console.error('Error al cargar motocicletas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Mostrar formulario de infracción
  const handleCreateInfraction = (motoId: number) => {
    setSelectedMotorcycle(motoId);
    setShowInfractionForm(true);
  };

  const handleCloseInfractionForm = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowInfractionForm(false);
    }
  };

  const handleSubmitInfraction = async (formValues: any) => {
    try {
      const payload = {
        ...formValues,
        motorcycle_id: selectedMotorcycle,
      };
      const result = await CreateInfringement(payload);
      if (result) {
        setShowInfractionForm(false);
        alert('Infracción creada correctamente');
      }
      return result;
    } catch (err) {
      console.error('Error al crear infracción:', err);
      return null;
    }
  };

  // Render personalizado para columna de infracción
  const customRender = {
    infraction_button: (value: any) => ({
      __html: `<button class="infraction-button" onclick="document.dispatchEvent(new CustomEvent('createInfraction', {detail: ${value}}))">Prueba infraccion</button>`,
    }),
  };

  // Evento personalizado para abrir el formulario emergente
  useEffect(() => {
    const listener = (e: CustomEvent) => handleCreateInfraction(e.detail);
    document.addEventListener('createInfraction', listener as EventListener);
    return () => document.removeEventListener('createInfraction', listener as EventListener);
  }, []);

  useEffect(() => { fetchMotorcycles(); }, []);

  if (loading) return <div className="loading-indicator">Cargando...</div>;

  return (
    <div className="table-container">
      <h1 id="title-products">Motocicletas</h1>
      <Table
        HeadList={headList}
        ComplementTitle="Motocicleta"
        Content={motorcycles}
        Fields={motorcycleFields}
        ItemsArray={itemsArray}
        UpdateTable={fetchMotorcycles}
        Add={createMotorcycle}
        Edit={updateMotorcycle}
        Delete={deleteMotorcycle}
        customRender={customRender}
      />

      {showInfractionForm && (
        <EmergentCrud
          Title="Crear Infracción"
          Fields={infractionFields}
          TextButton="Crear Infracción ✅"
          EmergentType={1}
          Id={null}
          initialData={{ motorcycle_id: selectedMotorcycle?.toString() || '' }}
          UpdateTable={() => {}}
          Add={handleSubmitInfraction}
          Edit={() => {}}
          Delete={() => {}}
          handleBackgroundClick={handleCloseInfractionForm}
          validationSchema={infractionValidationSchema}
        />
      )}
    </div>
  );
};

export default MotorcyclesPage;
