import { useNavigate } from "react-router-dom";

interface Motorcycle {
  id: number;
  license_plate: string;
  brand: string;
  year: number;
  status: string;
}

interface Props {
  motorcycles: Motorcycle[];
}

const MotorcycleTable: React.FC<Props> = ({ motorcycles }) => {
  const navigate = useNavigate();

  const handleInfringementClick = (motorcycle: Motorcycle) => {
    navigate(`/infracciones/${motorcycle.id}`, {
      state: {
        license_plate: motorcycle.license_plate,
        brand: motorcycle.brand
      }
    });
  };

  return (
    <table className="table-auto w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Placa</th>
          <th className="p-2 border">Marca</th>
          <th className="p-2 border">Año</th>
          <th className="p-2 border">Estado</th>
          <th className="p-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {motorcycles.map((moto) => (
          <tr key={moto.id}>
            <td className="p-2 border">{moto.license_plate}</td>
            <td className="p-2 border">{moto.brand}</td>
            <td className="p-2 border">{moto.year}</td>
            <td className="p-2 border">{moto.status}</td>
            <td className="p-2 border">
              <button
                onClick={() => handleInfringementClick(moto)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Infracciones
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MotorcycleTable;
