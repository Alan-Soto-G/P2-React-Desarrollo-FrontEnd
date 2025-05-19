import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import '../styles/MyCharts.css';

const MyCharts = () => {
  const [chartData, setChartData] = useState<any>(null);

  const transformData = (rawData: any) => {
    const bar = {
      categories: rawData.PedidosCompletadosPorDia.map((item: any) => item.fecha),
      series: rawData.PedidosCompletadosPorDia.map((item: any) => item.pedidos)
    };

    const line = {
      categories: rawData.IncidentesUltimoMes.map((item: any) => item.fecha),
      series: rawData.IncidentesUltimoMes.map((item: any) => item.incidentes)
    };

    const pie = {
      labels: rawData.TurnosTrabajados.map((item: any) => item.conductor),
      series: rawData.TurnosTrabajados.map((item: any) => item.turnos)
    };

    return { bar, line, pie };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://7c45be25-8dc6-4186-86a1-e5f7117429ae.mock.pstmn.io/charts/data');
        const transformed = transformData(res.data);
        setChartData(transformed);
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
    title: { text: 'Pedidos Completados por Día' },
    xaxis: { categories: chartData.bar.categories }
  };

  const barSeries = [{ name: 'Pedidos', data: chartData.bar.series }];

  const lineOptions = {
    chart: { type: 'line' as const },
    title: { text: 'Incidentes en el Último Mes' },
    xaxis: { categories: chartData.line.categories }
  };

  const lineSeries = [{ name: 'Incidentes', data: chartData.line.series }];

  const pieOptions = {
    chart: { type: 'pie' as const },
    labels: chartData.pie.labels,
    title: { text: 'Turnos Trabajados por Conductor' }
  };

  const pieSeries = chartData.pie.series;

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
