import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression, Icon } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from 'socket.io-client';

const motorcycleIcon: Icon = new L.Icon({
  iconUrl: '/motorcycle-icon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MotorcycleLocation {
  id: number;
  lat: number;
  lng: number;
  driverName: string;
  orderId: number;
}

const MapViewPedidos = () => {
  const [locations, setLocations] = useState<MotorcycleLocation[]>([]);
  const center: LatLngExpression = [4.60971, -74.08175]; // Bogotá centro

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000'); // Cambiar si el backend está en otro puerto
    socket.on('location_update', (data: MotorcycleLocation[]) => {
      setLocations(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 my-4">
      <div className="bg-blue-600 text-white px-4 py-2 text-lg font-semibold">
        Mapa en Tiempo Real de Pedidos en Curso
      </div>
      <div className="h-[80vh] w-full">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng] as LatLngExpression}
              icon={motorcycleIcon}
            >
              <Popup>
                <div className="text-sm">
                  <p><strong>Pedido:</strong> #{loc.orderId}</p>
                  <p><strong>Conductor:</strong> {loc.driverName}</p>
                  <p><strong>Ubicación:</strong> {loc.lat.toFixed(5)}, {loc.lng.toFixed(5)}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapViewPedidos;
