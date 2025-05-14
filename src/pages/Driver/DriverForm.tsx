import { useState } from "react";
import { createDriver } from "../../services/DriverService";

export const DriverForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDriver({ name, phone, license_number: licenseNumber, email, status: "active" });
    alert("Conductor registrado");
    setName("");
    setPhone("");
    setLicenseNumber("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Conductor</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" required />
      <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} placeholder="Número de licencia" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" />
      <button type="submit">Guardar</button>
    </form>
  );
};
