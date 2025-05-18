import { Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

import { getCustomers, deleteCustomer } from "../../services/CustomerService";
import Swal from "sweetalert2";
import type { Customer } from "../../model/Customer";

const ListCustomers = () => {
  // Estado para almacenar los datos del JSON
  const [data, setData] = useState<Customer[]>([]);

  // 🔹 Llamar `fetchData` cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Obtiene los datos de los usuarios
  const fetchData = async () => {
    const customers = await getCustomers();
    setData(customers);
  };

  // Funciones para manejar las acciones
  const handleView = (id: number) => {
    console.log(`Ver cliente con ID: ${id}`);
  };

  const handleEdit = (id: number) => {
    console.log(`Editar cliente con ID: ${id}`);

    // Lógica para editar el registro
  };

  const handleDelete = async (id: number) => {
    console.log(`Intentando eliminar cliente con ID: ${id}`);
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro de querer eliminar el cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const success = await deleteCustomer(id);
        if (success) {
          Swal.fire({
            title: "Eliminado",
            text: "El cliente se ha eliminado",
            icon: "success",
          });
        }
        // 🔹 Vuelve a obtener los usuarios después de eliminar uno
        fetchData();
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-9">
      <div className="flex flex-col gap-9">
        {/* <!-- Input Fields --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Teléfono
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr
                      key={item.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {item.id}
                      </td>
                      <td className="px-6 py-4">{item.id}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.phone}</td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleView(item.id ? item.id : 0)}
                          className="text-blue-600 dark:text-blue-500"
                        >
                          <Eye size={20} /> {/* Ícono de ver */}
                        </button>
                        <button
                          onClick={() =>
                            item.id !== undefined && handleEdit(item.id)
                          }
                          className="text-yellow-600 dark:text-yellow-500"
                        >
                          <Edit size={20} /> {/* Ícono de editar */}
                        </button>
                        <button
                          onClick={() =>
                            item.id !== undefined && handleDelete(item.id)
                          }
                          className="text-red-600 dark:text-red-500"
                        >
                          <Trash2 size={20} /> {/* Ícono de eliminar */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCustomers;
