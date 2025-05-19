import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import '../styles/MyCharts.css';

const ChartsA = () => {
  const [chartData, setChartData] = useState<{
    bar: { title: string; categories: string[]; series: number[] };
    line: { title: string; categories: string[]; series: number[] };
    pie: { title: string; labels: string[]; series: number[] };
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://078b6dac-4dfc-435e-ab62-deed7b1b7a57.mock.pstmn.io/chartsA');
        const data = res.data;

        // Preparar datos para gráfico de barras: Pedidos por método de pago
        const barCategories = data.PedidosPorMetodoPago.map((item: any) => item.metodo);
        const barSeries = data.PedidosPorMetodoPago.map((item: any) => item.porcentaje);

        // Preparar datos para gráfico de línea: Productos por categoría
        const lineCategories = data.ProductosPorCategoria.map((item: any) => item.categoria);
        const lineSeries = data.ProductosPorCategoria.map((item: any) => item.cantidad);

        // Preparar datos para gráfico de pastel: Pedidos cancelados por día
        const pieLabels = data.PedidosCanceladosPorDia.map((item: any) => item.fecha);
        const pieSeries = data.PedidosCanceladosPorDia.map((item: any) => item.cancelados);

        setChartData({
          bar: {
            title: 'Porcentaje de pedidos según método de pago',
            categories: barCategories,
            series: barSeries,
          },
          line: {
            title: 'Cantidad de productos vendidos por categoría',
            categories: lineCategories,
            series: lineSeries,
          },
          pie: {
            title: 'Pedidos cancelados por día',
            labels: pieLabels,
            series: pieSeries,
          },
        });
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
          options={{
            chart: { type: 'bar' },
            title: { text: chartData.bar.title },
            xaxis: { categories: chartData.bar.categories },
          }}
          series={[{ name: chartData.bar.title, data: chartData.bar.series }]}
          type="bar"
          height={450}
        />
      </div>

      <div className="chart-wrapper">
        <Chart
          options={{
            chart: { type: 'line' },
            title: { text: chartData.line.title },
            xaxis: { categories: chartData.line.categories },
          }}
          series={[{ name: chartData.line.title, data: chartData.line.series }]}
          type="line"
          height={450}
        />
      </div>

      <div className="chart-wrapper">
        <Chart
          options={{
            chart: { type: 'pie' },
            title: { text: chartData.pie.title },
            labels: chartData.pie.labels,
          }}
          series={chartData.pie.series}
          type="pie"
          height={450}
        />
      </div>
    </div>
  );
};

export default ChartsA;
