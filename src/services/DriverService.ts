import type { Driver } from "../model/Driver";

const API_URL = "http://localhost:3000/api/drivers"; // ajusta a tu endpoint real

export const getDrivers = async (): Promise<Driver[]> => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.json();
};

export const createDriver = async (driver: Driver) => {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(driver),
  });
};

export const deleteDriver = async (id: number) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
