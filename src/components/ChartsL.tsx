import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import '../styles/MyCharts.css';

const ChartsL = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://1b4fecdd-c26c-4b14-a0fa-a6af69440695.mock.pstmn.io/charts/dataL');
        setChartData(res.data);
      } catch (error) {
        console.error('Error al obtener datos del mock:', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <p className="loading-text">Cargando gráficos...</p>;
  }

  return (
    <div className="my-charts-container">
      <div className="chart-wrapper">
        <Chart
          options={{ chart: { type: 'bar' }, title: { text: chartData.bar.title }, xaxis: { categories: chartData.bar.categories } }}
          series={[{ name: 'Pedidos', data: chartData.bar.series }]}
          type="bar"
          height={450}
        />
      </div>

      <div className="chart-wrapper">
        <Chart
          options={{ chart: { type: 'line' }, title: { text: chartData.line.title }, xaxis: { categories: chartData.line.categories } }}
          series={[{ name: 'Pedidos Entregados', data: chartData.line.series }]}
          type="line"
          height={450}
        />
      </div>

      <div className="chart-wrapper">
        <Chart
          options={{ chart: { type: 'pie' }, title: { text: chartData.pie.title }, labels: chartData.pie.labels }}
          series={chartData.pie.series}
          type="pie"
          height={450}
        />
      </div>
    </div>
  );
};

export default ChartsL;
