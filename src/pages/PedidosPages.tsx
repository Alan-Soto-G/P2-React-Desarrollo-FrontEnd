import MapViewPedidos from '../pages/MapView';

const PedidosPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Estado Actual de los Pedidos</h1>
      <MapViewPedidos />
    </div>
  );
};

export default PedidosPage;
