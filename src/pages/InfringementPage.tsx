import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { createMotorcycleInfringement } from "../services/MotorcycleInfringementService";

const infringementTypes = [
  "Sin casco",
  "Documentos vencidos",
  "Mal estacionado",
  "Exceso de velocidad",
  "Sin licencia"
];

const InfringementPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { license_plate, brand } = location.state || {};

  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!type || !date) {
      setError("Debe seleccionar el tipo de infracción y una fecha.");
      return;
    }

    try {
      await createMotorcycleInfringement({
        motorcycle_id: parseInt(id!),
        type,
        date
      });
      alert("Infracción registrada correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al registrar la infracción");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Registrar Infracción</h2>

      <div className="mb-2">
        <strong>Placa:</strong> {license_plate}
      </div>
      <div className="mb-4">
        <strong>Marca:</strong> {brand}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tipo de infracción</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Seleccionar...</option>
            {infringementTypes.map((inf, index) => (
              <option key={index} value={inf}>
                {inf}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default InfringementPage;
