// services/DriverService.ts
import axios from 'axios';
import type { Driver } from '../model/Driver';

const API_URL = 'http://127.0.0.1:5000/drivers';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // o de donde lo estés obteniendo
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };
};

export const getDrivers = async (): Promise<Driver[]> => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const createDriver = async (driver: Driver): Promise<Driver> => {
  const response = await axios.post(API_URL, driver, getAuthHeaders());
  return response.data;
};

export const updateDriver = async (id: number, driver: Driver): Promise<Driver> => {
  const response = await axios.put(`${API_URL}/${id}`, driver, getAuthHeaders());
  return response.data;
};

export const deleteDriver = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};
