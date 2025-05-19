import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import '../styles/PerdidosMapa.css';
import 'leaflet-routing-machine';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

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

        <RoutingHandler setMotoPos={setMotoPos} />

        <Marker position={[restaurante.lat, restaurante.lng]}>
          <Popup>📍 Restaurante</Popup>
        </Marker>

        <Marker position={[cliente.lat, cliente.lng]} icon={casaIcon}>
          <Popup>📦 Pedido del cliente</Popup>
        </Marker>

        <Marker position={[motoPos.lat, motoPos.lng]} icon={motoIcon}>
          <Popup>🏍️ Moto</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

const RoutingHandler = ({ setMotoPos }: { setMotoPos: Function }) => {
  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(restaurante.lat, restaurante.lng),
        L.latLng(cliente.lat, cliente.lng),
      ],
      lineOptions: {
        styles: [{ color: 'green', weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 1,
      },
      // @ts-expect-error: createMarker is not in the official type but is supported by leaflet-routing-machine
      createMarker: function (i, waypoint, n) {
        // Solo mostrar el ícono de la casa en el último punto (cliente)
        if (i === n - 1) {
          return L.marker(waypoint.latLng, { icon: casaIcon });
        }
        return null; // No mostrar marcador en el restaurante
      },
      addWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    } as any).addTo(map);

    routingControl.on('routesfound', function (e) {
      const route = e.routes[0];
      const coordenadas = route.coordinates;

      let i = 0;
      const interval = setInterval(() => {
        if (i < coordenadas.length) {
          setMotoPos({ lat: coordenadas[i].lat, lng: coordenadas[i].lng });
          i++;
        } else {
          clearInterval(interval);
        }
      }, 500); // <-- velocidad más lenta (300 ms entre movimientos)
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, setMotoPos]);

  return null;
};

export default PedidosMapa;
