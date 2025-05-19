import React from 'react';
import MyCharts from '../components/MyCharts';
import ChartsL from '../components/ChartsL';

const ChartsPage = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Gráficos con ApexCharts</h2>
      <MyCharts />
      <ChartsL />
    </div>
  );
};

export default ChartsPage;
