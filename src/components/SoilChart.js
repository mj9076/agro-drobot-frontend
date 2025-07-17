// src/components/SoilChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SoilChart = ({ n, p, k, ph }) => {
  const chartData = {
    labels: ["Nitrogen (N)", "Phosphorus (P)", "Potassium (K)", "pH"],
    datasets: [
      {
        label: "Soil Nutrients and pH",
        data: [n, p, k, ph],
        backgroundColor: ["#8BC34A", "#FFA726", "#AB47BC", "#29B6F6"],
        borderColor: ["#689F38", "#F57C00", "#7B1FA2", "#0288D1"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to fill its container
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Soil Composition: N, P, K, and pH',
        color: '#f0f0f0',
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
                label += ': ';
            }
            if (context.parsed.y !== null) {
                label += context.parsed.y;
                if (context.label === 'pH') {
                  // No unit for pH typically
                } else {
                  label += ' ppm'; // Assuming ppm for NPK, adjust if different
                }
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#f0f0f0' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#f0f0f0' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default SoilChart;