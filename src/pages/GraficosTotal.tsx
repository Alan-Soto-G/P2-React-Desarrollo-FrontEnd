import React from "react";
import MyChartsPedidos from "../components/MyChartsPedidos";
import MyChartsMotocicletas from "../components/MyChartsMotocicletas";

const GraficosTotales = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">Gráficos de Pedidos</h2>
        <MyChartsPedidos />
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-2">Gráficos de Motocicletas</h2>
        <MyChartsMotocicletas />
      </div>
    </div>
  );
};

export default GraficosTotales;
