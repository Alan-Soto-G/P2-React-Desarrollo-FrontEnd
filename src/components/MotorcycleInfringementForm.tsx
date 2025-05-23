import { useEffect, useState } from "react";
import { getInfringements } from "../services/InfringementService";
import type { Infringement } from "../services/InfringementService";

interface Props {
  motorcycleId: number;
}

const MotorcycleInfringementForm: React.FC<Props> = ({ motorcycleId }) => {
  const [infringementOptions, setInfringementOptions] = useState<Infringement[]>([]);
  const [violationType, setViolationType] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<{ type?: string; date?: string }>({});

  useEffect(() => {
    getInfringements().then((data) => {
      setInfringementOptions(data);
      console.log("Infringement options loaded:", data); // Para depurar
    });
  }, []);

  const validate = () => {
    const newErrors: any = {};
    if (!violationType) newErrors.type = "Selecciona un tipo de infracción.";
    if (!date) newErrors.date = "Selecciona una fecha.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Enviar infracción:", { motorcycleId, violationType, date });
    alert("Infracción registrada correctamente");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Tipo de infracción:</label>
        <select
          className="border p-2 w-full"
          value={violationType}
          onChange={(e) => setViolationType(e.target.value)}
        >
          <option value="">-- Selecciona --</option>
          {infringementOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.type}
            </option>
          ))}
        </select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
      </div>

      <div>
        <label className="block mb-1">Fecha de la infracción:</label>
        <input
          type="date"
          className="border p-2 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Registrar Infracción
      </button>
    </form>
  );
};

export default MotorcycleInfringementForm;
