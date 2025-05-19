import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import '../styles/MyCharts.css'; 

const MyCharts = () => {
  const [chartData, setChartData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://00ddc1a2-2d37-4e94-9ea3-5c928a127f47.mock.pstmn.io/charts/data');
        setChartData(res.data);
      } catch (error) {
        console.error('Error al obtener datos del mock:', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return (
      <p style={{ padding: '2rem', fontSize: '1.2rem' }}>Cargando gráficos...</p>
    );
  }

  const barOptions = {
    chart: { type: 'bar' as const },
    title: { text: 'Gráfico de Barras' },
    xaxis: { categories: chartData.bar?.categories || [] },
  };

  const barSeries = [{ name: 'Ventas', data: chartData.bar?.series || [] }];

  const lineOptions = {
    chart: { type: 'line' as const },
    title: { text: 'Gráfico de Líneas' },
    xaxis: { categories: chartData.line?.categories || [] },
  };

  const lineSeries = [{ name: 'Ganancias', data: chartData.line?.series || [] }];

  const pieOptions = {
    chart: { type: 'pie' as const },
    labels: chartData.pie?.labels || [],
    title: { text: 'Gráfico de Torta' },
  };

  const pieSeries = chartData.pie?.series || [];

  return (
    <div className="my-charts-container">
      <div className="chart-wrapper">
        <Chart options={barOptions} series={barSeries} type="bar" height={450} />
      </div>
      <div className="chart-wrapper">
        <Chart options={lineOptions} series={lineSeries} type="line" height={450} />
      </div>
      <div className="chart-wrapper">
        <Chart options={pieOptions} series={pieSeries} type="pie" height={450} />
      </div>
    </div>
  );
};

export default MyCharts;
