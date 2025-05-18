import React, { useState, useEffect } from "react";
import type { Address } from "../../model/Address";
import AddressFormValidator from "./AddressFormValidator";
import { getAddressById, updateAddress } from "../../services/AddressService";
import Swal from "sweetalert2";
import Breadcrumb from "../../components/Breadcrumb";
import { useParams, useNavigate } from "react-router-dom";

const UpdateAddressPage = () => {
  const { id } = useParams(); // Obtener el ID de la URL

  const navigate = useNavigate();
  const [address, setAddress] = useState<Address | null>(null);

  // Cargar datos del usuario después del montaje
  useEffect(() => {
    console.log("Id->" + id);
    const fetchAddress = async () => {
      if (!id) return; // Evitar errores si el ID no está disponible
      const addressData = await getAddressById(parseInt(id));
      setAddress(addressData);
    };

    fetchAddress();
  }, [id]);

  const handleUpdateAddress = async (theAddress: Address) => {
    try {
      const updatedAddress = await updateAddress(
        theAddress.id || 0,
        theAddress
      );
      if (updatedAddress) {
        Swal.fire({
          title: "Completado",
          text: "Se ha actualizado correctamente el registro",
          icon: "success",
          timer: 3000,
        });
        navigate("/direcciones"); // Redirección en React Router
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

  if (!address) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  return (
    <>
      <Breadcrumb pageName="Actualizar dirección" />
      <AddressFormValidator
        handleUpdate={handleUpdateAddress}
        mode={2} // 2 significa actualización
        address={address}
      />
    </>
  );
};

export default UpdateAddressPage;
