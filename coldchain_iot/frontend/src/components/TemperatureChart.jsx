import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Température dans le temps",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 15,
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default TemperatureChart;
