import { useLocation, useParams } from "react-router-dom";
import MotorcycleInfringementForm from "../components/MotorcycleInfringementForm";

const MotorcycleInfringementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { license_plate, brand } = location.state || {};

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Registrar Infracción</h1>

      <div className="mb-4">
        <strong>Placa:</strong> {license_plate}
      </div>
      <div className="mb-6">
        <strong>Marca:</strong> {brand}
      </div>

      <MotorcycleInfringementForm motorcycleId={id ? parseInt(id) : 0} />
    </div>
  );
};

export default MotorcycleInfringementPage;
