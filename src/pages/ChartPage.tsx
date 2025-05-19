import React from 'react';
import MyCharts from '../components/MyCharts';
import ChartsL from '../components/ChartsL';
import ChartsA from '../components/ChartsA';
import '../styles/MyCharts.css';

const ChartPage = () => {
  return (
    <div className="my-charts-page">
      <h1 className="titulo-principal"> Visualización de Datos</h1>

      <div className="my-charts-container">
        {/* Gráficos de datos generales */}
        <MyCharts />
        {/* Gráficos de análisis por hora y estado */}
        <ChartsL />
        {/* Gráficos de análisis por método de pago */}
        <ChartsA />
      </div>
    </div>
  );
};

export default ChartPage;
