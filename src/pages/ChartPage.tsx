import React from 'react';
import MyCharts from '../components/MyCharts';
import ChartsL from '../components/ChartsL';

const ChartPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '2rem 0' }}>Visualización de Datos</h1>

      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center' }}>📊 Datos Generales del Sistema</h2>
        <MyCharts />
      </section>

      <section>
        <h2 style={{ textAlign: 'center' }}>🕒 Análisis por Hora y Estado</h2>
        <ChartsL />
      </section>
    </div>
  );
};

export default ChartPage;
