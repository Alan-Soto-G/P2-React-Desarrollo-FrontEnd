import axios from 'axios';

const API_URL = 'http://localhost:5000/api/motorcycles';

export const getMotorcycles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteMotorcycle = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateMotorcycle = async (id: number, data: any) => {
  await axios.put(`${API_URL}/${id}`, data);
};
