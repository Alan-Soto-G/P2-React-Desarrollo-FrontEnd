import React, { useState, useEffect } from "react";
import type { Customer } from "../../model/Customer";
import CustomerFormValidator from "./CustomerFormValidation";
import {
  getCustomerById,
  updateCustomer,
} from "../../services/CustomerService";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCustomerPage = () => {
  const { id } = useParams(); // Obtener el ID de la URL

  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);

  // Cargar datos del usuario después del montaje
  useEffect(() => {
    console.log("Id->" + id);
    const fetchCustomer = async () => {
      if (!id) return; // Evitar errores si el ID no está disponible
      const customerData = await getCustomerById(parseInt(id));
      setCustomer(customerData);
    };

    fetchCustomer();
  }, [id]);

  const handleUpdateCustomer = async (theCustomer: Customer) => {
    try {
      const updatedCustomer = await updateCustomer(
        theCustomer.id || 0,
        theCustomer
      );
      if (updatedCustomer) {
        Swal.fire({
          title: "Completado",
          text: "Se ha actualizado correctamente el registro",
          icon: "success",
          timer: 3000,
        });
        navigate("/clientes"); // Redirección en React Router
      } else {
        Swal.fire({
          title: "Error",
          text: "Existe un problema al momento de actualizar el registro",
          icon: "error",
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Existe un problema al momento de actualizar el registro",
        icon: "error",
        timer: 3000,
      });
    }
  };

  if (!customer) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <>
      <Breadcrumb pageName="Actualizar cliente" />
      <CustomerFormValidator
        handleUpdate={handleUpdateCustomer}
        mode={2} // 2 significa actualización
        customer={customer}
      />
    </>
  );
};

export default UpdateCustomerPage;
