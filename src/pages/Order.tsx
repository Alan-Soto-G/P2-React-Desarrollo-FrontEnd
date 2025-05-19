import React, { useEffect, useState } from "react";
import Table from "../components/tableCrud";
import { GetOrders, CreateOrder, EditOrder, DeleteOrder } from "../services/OrderService";
import { GetCustomers } from "../services/CustomerService";
import { GetMenus } from "../services/MenuService";
import { getMotorcycles } from "../services/MotorcycleService.ts";

// Interfaces para los diferentes tipos de datos
interface Order {
    id: number;
    quantity: number;
    total_price: number;
    status: string;
    customer_id: number;
    menu_id: number;
    motorcycle_id: number;
    created_at: string;
    customer: Customer;
    menu: Menu;
    address: Address;
}

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    created_at: string;
}

interface Menu {
    id: number;
    price: number;
    availability: boolean;
    product_id: number;
    restaurant_id: number;
    created_at: string;
    product: Product;
    restaurant: Restaurant;
}

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    created_at: string;
}

interface Restaurant {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    created_at: string;
}

interface Motorcycle {
    id: number;
    license_plate: string;
    brand: string;
    year: number;
    status: string;
}

interface Address {
    id: number;
    order_id: number;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    additional_info: string;
    created_at: string;
}

// Separación entre columnas de datos y acciones
const dataHeaders = ["ID", "Cliente", "Producto", "Restaurante", "Cantidad", "Total", "Estado", "Dirección"];
const actionHeaders = ["Editar", "Eliminar"];
const headList = [...dataHeaders, ...actionHeaders];

// Propiedades que se muestran en la tabla
const itemsArray = [
    "id", 
    "customer_name", 
    "product_name", 
    "restaurant_name", 
    "quantity", 
    "total_price_formatted", 
    "status",
    "address_info"
];

const Orders: React.FC = () => {
    const [content, setContent] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [menus, setMenus] = useState<any[]>([]);
    const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

    // Cargar datos para dropdowns
    useEffect(() => {
        const loadData = async () => {
            try {
                // Cargar clientes
                const customersData = await GetCustomers();
                if (customersData) setCustomers(customersData);
                
                // Cargar menus con su información relacionada
                const menusData = await GetMenus();
                if (menusData) setMenus(menusData);
                
                // Cargar motocicletas
                const motorcyclesData = await getMotorcycles();
                if (motorcyclesData) setMotorcycles(motorcyclesData);
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            }
        };
        
        loadData();
    }, []);

    // Campos para el formulario
    const fields = {
        customer_id: {
            type: 'select',
            placeholder: 'Cliente',
            validation: {
                required: true
            },
            options: customers.map(customer => ({
                label: `${customer.name} (${customer.email})`,
                value: customer.id
            }))
        },
        menu_id: {
            type: 'select',
            placeholder: 'Menú',
            validation: {
                required: true
            },
            options: menus.map(menu => ({
                label: `${menu.product?.name || 'Producto'} - ${menu.restaurant?.name || 'Restaurante'} ($${menu.price})`,
                value: menu.id
            }))
        },
        motorcycle_id: {
            type: 'select',
            placeholder: 'Motocicleta',
            validation: {
                required: true
            },
            options: motorcycles.map(moto => ({
                label: `${moto.license_plate} - ${moto.brand} (${moto.status})`,
                value: moto.id
            }))
        },
        quantity: {
            type: 'number',
            placeholder: 'Cantidad',
            validation: {
                required: true,
                min: 1
            }
        },
        status: {
            type: 'select',
            placeholder: 'Estado',
            validation: {
                required: true
            },
            options: [
                { label: 'Pendiente', value: 'pending' },
                { label: 'En preparación', value: 'preparing' },
                { label: 'En camino', value: 'on_the_way' },
                { label: 'Entregado', value: 'delivered' },
                { label: 'Cancelado', value: 'cancelled' }
            ]
        },
        // Campos para la dirección (se incluyen al crear la orden)
        street: {
            type: 'text',
            placeholder: 'Calle',
            validation: {
                required: true
            }
        },
        city: {
            type: 'text',
            placeholder: 'Ciudad',
            validation: {
                required: true
            }
        },
        state: {
            type: 'text',
            placeholder: 'Estado/Provincia',
            validation: {
                required: true
            }
        },
        postal_code: {
            type: 'text',
            placeholder: 'Código postal',
            validation: {
                required: true
            }
        },
        additional_info: {
            type: 'text',
            placeholder: 'Información adicional',
            validation: {
                required: false
            }
        }
    };

    // Función para formatear los datos de órdenes para mostrarlos en la tabla
    const formatOrderData = (orders: Order[]) => {
        return orders.map(order => ({
            id: order.id,
            customer_id: order.customer_id,
            menu_id: order.menu_id,
            motorcycle_id: order.motorcycle_id,
            quantity: order.quantity,
            total_price: order.total_price,
            status: order.status,
            created_at: order.created_at,
            // Campos formateados para mostrar en la tabla
            customer_name: order.customer?.name || "Desconocido",
            product_name: order.menu?.product?.name || "Desconocido",
            restaurant_name: order.menu?.restaurant?.name || "Desconocido",
            total_price_formatted: `$${order.total_price.toLocaleString()}`,
            address_info: `${order.address?.city || ""}, ${order.address?.street || ""}`
        }));
    };

    const fetchOrders = async () => {
        try {
            const result = await GetOrders();
            if (result) {
                const formattedData = formatOrderData(result);
                setContent(formattedData);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    // Pre-procesamiento antes de crear una orden
    const handleCreate = async (orderData: any) => {
        // Extraer datos de dirección
        const addressData = {
            street: orderData.street,
            city: orderData.city,
            state: orderData.state,
            postal_code: orderData.postal_code,
            additional_info: orderData.additional_info,
        };

        // Si se seleccionó un menú, obtener su precio
        let price = 0;
        if (orderData.menu_id) {
            const selectedMenu = menus.find(menu => menu.id === parseInt(orderData.menu_id));
            if (selectedMenu) {
                price = selectedMenu.price;
            }
        }

        // Calcular precio total
        const totalPrice = price * orderData.quantity;

        // Crear objeto de orden limpio para enviar al backend
        const orderToCreate = {
            customer_id: parseInt(orderData.customer_id),
            menu_id: parseInt(orderData.menu_id),
            motorcycle_id: parseInt(orderData.motorcycle_id),
            quantity: parseInt(orderData.quantity),
            total_price: totalPrice,
            status: orderData.status,
            address: addressData
        };

        // Llamar al servicio de creación
        return await CreateOrder(orderToCreate);
    };

    // Pre-procesamiento antes de editar una orden
    const handleEdit = async (id: string, orderData: any) => {
        // Actualizar la orden (normalmente no se edita la dirección)
        const orderToUpdate = {
            customer_id: parseInt(orderData.customer_id),
            menu_id: parseInt(orderData.menu_id),
            motorcycle_id: parseInt(orderData.motorcycle_id),
            quantity: parseInt(orderData.quantity),
            total_price: parseFloat(orderData.total_price) || 0,
            status: orderData.status
        };

        return await EditOrder(id, orderToUpdate);
    };

    // Cargar datos de órdenes
    useEffect(() => { fetchOrders() }, []);

    if (loading) {
        return <div className="loading-indicator">Cargando órdenes...</div>;
    }

    return (
        <div className="table-container">
            <h1>Gestión de Pedidos</h1>
            <Table
                HeadList={headList}
                ComplementTitle='Pedido'
                Content={content}
                Fields={fields}
                ItemsArray={itemsArray}
                UpdateTable={fetchOrders}
                Add={handleCreate}
                Edit={handleEdit}
                Delete={DeleteOrder}
            />
        </div>
    );
};

export default Orders;