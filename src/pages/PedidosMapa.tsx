import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importa Leaflet para crear el icono
import { conectarSimulado } from '../utils/socketSimulado'; // ruta correcta

export default function PedidosMapa() {
  type Moto = {
    id: number;
    lat: number;
    lng: number;
    nombre: string;
  };

  const [motos, setMotos] = useState<Moto[]>([]);

  // Crear el icono personalizado una vez
  const motoIcon = L.icon({
    iconUrl: '/Moto.png',    // Desde la carpeta public, esta es la ruta correcta
    iconSize: [40, 40],      // Ajusta el tamaño según tu imagen
    iconAnchor: [20, 40],    // Punto del icono que corresponde a la posición (centrado abajo)
    popupAnchor: [0, -40],   // Donde aparece el popup respecto al icono
  });

  useEffect(() => {
    conectarSimulado((nuevasMotos) => {
      setMotos(nuevasMotos);
    });
  }, []);

  return (
    <MapContainer
      center={[5.0703, -75.5138]}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {motos.map((moto) => (
        <Marker key={moto.id} position={[moto.lat, moto.lng]} icon={motoIcon}>
          <Popup>{moto.nombre}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
