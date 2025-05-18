import axios from "axios"
import type { Customer } from "../model/Customer"

const API_URL = import.meta.env.VITE_BACKEND_API + "customers";


export const getCustomers = async (): Promise<Customer[]> => {
    console.log("aqui "+API_URL)
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener los clientes");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};


export const getCustomerById = async (id: number): Promise<Customer | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Cliente no encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const createCustomer = async (customer: Omit<Customer, "id">): Promise<Customer | null> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer),
        });
        if (!response.ok) throw new Error("Error al crear cliente");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const updateCustomer = async (id: number, customer: Partial<Customer>): Promise<Customer | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer),
        });
        if (!response.ok) throw new Error("Error al actualizar cliente");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const deleteCustomer = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar cliente");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};



