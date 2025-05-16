import axios from 'axios';
import type { Driver } from '../model/Driver';

const API_URL = 'http://127.0.0.1:5000/drivers'; // <-- usa tu backend real aquí

export const getDrivers = async (): Promise<Driver[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createDriver = async (driver: Driver): Promise<Driver> => {
  const response = await axios.post(API_URL, driver);
  return response.data;
};

export const updateDriver = async (id: number, driver: Driver): Promise<Driver> => {
  const response = await axios.put(`${API_URL}/${id}`, driver);
  return response.data;
};


export const deleteDriver = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
