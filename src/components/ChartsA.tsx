import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import '../styles/MyCharts.css';

const ChartsA = () => {
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://bd551232-d4b3-4ee9-b257-d804c11bbac1.mock.pstmn.io/charts/dataA');
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
                    series={[{ name: 'Porcentaje de pedidos según método de pago', data: chartData.bar.series }]}
                    type="bar"
                    height={450}
                />
            </div>

            <div className="chart-wrapper">
                <Chart
                    options={{ chart: { type: 'line' }, title: { text: chartData.line.title }, xaxis: { categories: chartData.line.categories } }}
                    series={[{ name: 'Cantidad de productos vendidos por categoría', data: chartData.line.series }]}
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

export default ChartsA;
