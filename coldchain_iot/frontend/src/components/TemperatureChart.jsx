import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function TemperatureChart({ measurements }) {
  const data = {
    labels: measurements.map(m =>
      new Date(m.created_at).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "Température (°C)",
        data: measurements.map(m => m.temperature),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(10px)",
        padding: 12,
        cornerRadius: 8,
        titleColor: "#fff",
        titleFont: {
          size: 14,
          weight: "600"
        },
        bodyColor: "rgba(255, 255, 255, 0.8)",
        bodyFont: {
          size: 13
        },
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            size: 11
          },
          maxRotation: 0,
          autoSkipPadding: 20
        }
      },
      y: {
        min: 0,
        max: 15,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawBorder: false
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: {
            size: 11
          },
          padding: 10
        }
      }
    }
  };

  return (
    <div style={{ height: "300px", position: "relative" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default TemperatureChart;
