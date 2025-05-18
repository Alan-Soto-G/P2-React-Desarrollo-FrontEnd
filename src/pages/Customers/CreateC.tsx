import React, { useState } from "react"; // Asegúrate de importar useState
import type { Customer } from "../../model/Customer";
import CustomerFormValidator from "./CustomerFormValidation";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createCustomer } from "../../services/CustomerService";
import Breadcrumb from "../../components/Breadcrumb";

const App = () => {
  const navigate = useNavigate();

  // Estado para almacenar el usuario a editar

  // Lógica de creación
  const handleCreateCustomer = async (customer: Customer) => {
    try {
      const createdCustomer = await createCustomer(customer);
      if (createdCustomer) {
        Swal.fire({
          title: "Completado",
          text: "Se ha creado correctamente el registro",
          icon: "success",
          timer: 3000,
        });
        console.log("Dirección creada con éxito:", createdCustomer);
        navigate("/clientes");
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
      <Breadcrumb pageName="Crear cliente" />
      <CustomerFormValidator
        handleCreate={handleCreateCustomer}
        mode={1} // 1 significa creación
      />
    </div>
  );
};

export default App;
