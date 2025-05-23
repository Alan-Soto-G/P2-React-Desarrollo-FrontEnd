import { useEffect, useState } from 'react';
import { getMotorcycles, createMotorcycle, updateMotorcycle, deleteMotorcycle } from '../services/MotorcycleService.ts';
import Table from "../components/tableCrud";
import { useNavigate } from 'react-router-dom';
import EmergentCrud from '../components/emergentCrud';
import { CreateInfringement } from '../services/SustentacionService.ts';
import { GetInfringements } from '../services/SustentacionService';
import * as Yup from 'yup';

interface Motorcycle {
  id: number;
  license_plate: string;
  brand: string;
  year: number;
  status: string;
};

interface Infringement {
  id: number;
  name: string;
};

// Add "Infracción" to headers
const dataHeaders = ["Placa", "Marca", "Año", "Estado", "Infracción"];
const actionHeaders = ["Editar", "Eliminar"];
const headList = [...dataHeaders, ...actionHeaders];
// Add infraction_button to itemsArray to match the added column
const itemsArray = ["license_plate", "brand", "year", "status", "infraction_button"];

const MotorcyclesPage: React.FC = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [infringements, setInfringements] = useState<Infringement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showInfractionForm, setShowInfractionForm] = useState<boolean>(false);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<number | null>(null);
  const navigate = useNavigate();

  // Define fields for the motorcycle form
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
      type: 'select',
      placeholder: 'Estado de la motocicleta',
      validation: {
        required: true
      },
      options: [
        { label: 'Disponible', value: 'available' },
        { label: 'En mantenimiento', value: 'maintenance' },
        { label: 'En uso', value: 'in_use' },
        { label: 'Fuera de servicio', value: 'out_of_service' }
      ]
    }
  };

  // Load infringement types
  useEffect(() => {
    const loadInfringementTypes = async () => {
      try {
        const data = await GetInfringements();
        if (data) setInfringements(data);
      } catch (error) {
        console.error('Error loading infringement types:', error);
      }
    };
    
    loadInfringementTypes();
  }, []);

  // Create options for infringement types dropdown
  const infringementOptions = infringements.map(infringement => ({
    value: infringement.id,
    label: infringement.name
  }));

  const infractionFields = {
    infringement_type: {
      type: 'select',
      placeholder: 'Tipo de infracción',
      options: infringementOptions, // Here we directly pass the array of options
      validation: {
        required: true
      }
    },
    date: {
      type: 'datetime-local', 
      placeholder: 'Fecha y hora de la infracción',
      validation: {
        required: true
      }
    }
  };

  const infractionValidationSchema = Yup.object({
    infringement_type: Yup.string()
      .required('El tipo de infracción es obligatorio'),
    date: Yup.string()
      .required('La fecha y hora son obligatorias')
      .test(
        'not-future', 
        'La fecha no puede ser en el futuro', 
        value => {
          if (!value) return true;
          const selectedDate = new Date(value);
          const currentDate = new Date();
          return selectedDate <= currentDate;
        }
      )
  });

  const fetchMotorcycles = async () => {
    try {
      const response = await getMotorcycles();
      
      if (response) {
        interface MotorcycleWithInfraction extends Motorcycle {
          infraction_button: number;
        }

        const motorcyclesWithButton: MotorcycleWithInfraction[] = response.map((moto: Motorcycle): MotorcycleWithInfraction => ({
          ...moto,
          infraction_button: moto.id 
        }));
        setMotorcycles(motorcyclesWithButton);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching motorcycles:', error);
      setLoading(false);
    }
  };

  const handleCreateInfraction = (motorcycleId: number) => {
    setSelectedMotorcycle(motorcycleId);
    setShowInfractionForm(true);
  };

  const handleCloseInfractionForm = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowInfractionForm(false);
    }
  };

  const handleSubmitInfraction = async (infractionData: any) => {
    try {
      const dataToSubmit = {
        ...infractionData,
        motorcycle_id: selectedMotorcycle
      };
      
      const result = await CreateInfringement(dataToSubmit);
      if (result) {
        setShowInfractionForm(false);
        alert("Infracción creada correctamente");
      }
      return result;
    } catch (error) {
      console.error("Error creating infraction:", error);
      return null;
    }
  };

  const customRender = {
    infraction_button: (value: any) => {
      return {
        __html: `<button class="infraction-button" onclick="document.dispatchEvent(new CustomEvent('createInfraction', {detail: ${value}}))">🚨 Infracción</button>`
      };
    }
  };

  useEffect(() => {
    const handleInfractionEvent = (e: CustomEvent) => {
      handleCreateInfraction(e.detail);
    };

    document.addEventListener('createInfraction', handleInfractionEvent as EventListener);

    return () => {
      document.removeEventListener('createInfraction', handleInfractionEvent as EventListener);
    };
  }, []);

  useEffect(() => { fetchMotorcycles() }, []);
  
  if (loading) {
    return <div className="loading-indicator">Cargando...</div>;
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
        customRender={customRender}
      />
      
      {showInfractionForm && (
        <EmergentCrud
          Title="Crear Infracción"
          Fields={infractionFields}
          TextButton="Crear Infracción ✅"
          EmergentType={1}
          Id={null}
          initialData={{ motorcycle_id: selectedMotorcycle ? selectedMotorcycle.toString() : "" }}
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
}

export default MotorcyclesPage;
