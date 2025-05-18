import React from 'react';
import Chart from 'react-apexcharts';

const MyCharts = () => {
  const barOptions = {
    chart: { type: 'bar' as const },
    title: { text: 'Gráfico de Barras' },
    xaxis: { categories: ['Enero', 'Febrero', 'Marzo'] }
  };

  const barSeries = [
    {
      name: 'Ventas',
      data: [30, 40, 25]
    }
  ];

  const lineOptions = {
    chart: { type: 'line' as const },
    title: { text: 'Gráfico de Líneas' },
    xaxis: { categories: ['Enero', 'Febrero', 'Marzo'] }
  };

  const lineSeries = [
    {
      name: 'Ganancias',
      data: [10, 35, 60]
    }
  ];

  const pieOptions = {
    chart: { type: 'pie' as const },
    labels: ['Manzanas', 'Plátanos', 'Uvas'],
    title: { text: 'Gráfico de Torta' }
  };

  const pieSeries = [44, 55, 13];

  return (
    <div style={{ padding: '1rem' }}>
      <Chart options={barOptions} series={barSeries} type="bar" height={300} />
      <Chart options={lineOptions} series={lineSeries} type="line" height={300} />
      <Chart options={pieOptions} series={pieSeries} type="pie" height={300} />
    </div>
  );
};

export default MyCharts;
