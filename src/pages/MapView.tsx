import React from 'react';
import PedidosMapa from './PedidosMapa';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div>
      <h1>Mapa de Ubicaciones de Pedidos</h1>
      <PedidosMapa />
    </div>
  );
}

export default App;
