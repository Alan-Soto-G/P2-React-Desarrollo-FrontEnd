import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import '../styles/PerdidosMapa.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const restaurante = { lat: 5.0703, lng: -75.5138 };
const cliente = { lat: 5.0737, lng: -75.5159 };

const casaIcon = L.icon({
  iconUrl: '/Casita.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const motoIcon = L.icon({
  iconUrl: '/Moto.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const PedidosMapa = () => {
  const [motoPos, setMotoPos] = useState(restaurante);
  const [coords, setCoords] = useState<{lat: number, lng: number}[]>([]);

  useEffect(() => {
    // Cargar las coordenadas desde example_1.json
    fetch('/example_1.json')
      .then(res => res.json())
      .then((data: {lat: number, lng: number}[]) => {
        setCoords(data);
      })
      .catch(err => {
        console.error('Error cargando las coordenadas:', err);
      });
  }, []);

  useEffect(() => {
    if (coords.length === 0) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < coords.length) {
        setMotoPos(coords[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1000); // velocidad de movimiento 

    return () => clearInterval(interval);
  }, [coords]);

  return (
    <div className="mapa-container">
      <div className="mapa-header">Seguimiento de Pedido</div>

      <MapContainer
        center={[5.0715, -75.5148]}
        zoom={16}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <Marker position={[motoPos.lat, motoPos.lng]} icon={motoIcon}>
          <Popup>🏍️ Moto</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PedidosMapa;
