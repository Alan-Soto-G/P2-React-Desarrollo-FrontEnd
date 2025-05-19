import React, { useEffect, useState } from "react";
import Table from "../components/tableCrud";
import {
  GetOrders,
  CreateOrder,
  EditOrder,
  DeleteOrder,
} from "../services/OrderService";

interface Order {
  id: number;
  quantify: number;
  total_price: number;
  status: string;
}

// Separación entre columnas de datos y acciones
const dataHeaders = ["ID", "Quantity", "Total Price", "Status"];
const actionHeaders = ["Edit", "Delete"];
const headList = [...dataHeaders, ...actionHeaders];

// Propiedades que se muestran en la tabla (excluyendo acciones)
const itemsArray = ["id", "quantify", "total_price", "status"];

const Shifts: React.FC = () => {
  const [content, setContent] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fields = {
    quantity: {
      type: "number",
      placeholder: "Cantidad",
      validation: {
        required: true,
        min: 1,
        max: 10000, // Puedes ajustar este límite según tus necesidades
      },
    },
    totalPrice: {
      type: "number",
      placeholder: "Precio total",
      validation: {
        required: true,
        min: 0.01,
        max: 1000000, // Ajusta según el máximo permitido
      },
    },
    status: {
      type: "text",
      placeholder: "Estado",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 20,
        pattern: "^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$", // Letras con tildes y espacios
      },
    },
  };
  const fetchOrders = async () => {
    try {
      const result = await GetOrders();
      if (result) setContent(result);
    } catch (error) {
      console.error("Error fetching oders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading-indicator">Loading...</div>;
  }

  return (
    <div className="customers-container">
      <h1>Gestión de Ordenes</h1>
      <Table
        HeadList={headList}
        ComplementTitle="Orden"
        Content={content}
        Fields={fields}
        ItemsArray={itemsArray}
        UpdateTable={fetchOrders}
        Add={CreateOrder}
        Edit={EditOrder}
        Delete={DeleteOrder}
      />
    </div>
  );
};
export default Shifts;
