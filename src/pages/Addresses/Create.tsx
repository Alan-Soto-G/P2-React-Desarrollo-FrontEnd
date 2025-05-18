import React, { useState } from "react"; // Asegúrate de importar useState
import type { Address } from "../../model/Address";
import AddressFormValidator from "./AddressFormValidator";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createAddress } from "../../services/AddressService";
import Breadcrumb from "../../components/Breadcrumb";

const App = () => {
  const navigate = useNavigate();

  // Estado para almacenar el usuario a editar

  // Lógica de creación
  const handleCreateAddress = async (address: Address) => {
    try {
      const createdAddress = await createAddress(address);
      if (createdAddress) {
        Swal.fire({
          title: "Completado",
          text: "Se ha creado correctamente el registro",
          icon: "success",
          timer: 3000,
        });
        console.log("Dirección creada con éxito:", createdAddress);
        navigate("/direcciones");
      } else {
        Swal.fire({
          title: "Error",
          text: "Existe un problema al momento de crear el registro",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Existe un problema al momento de crear el registro",
        icon: "error",
        timer: 3000,
      });
    }
  };
  return (
    <div>
      {/* Formulario para crear un nuevo usuario */}
      <Breadcrumb pageName="Crear dirección" />
      <AddressFormValidator
        handleCreate={handleCreateAddress}
        mode={1} // 1 significa creación
      />
    </div>
  );
};

export default App;
