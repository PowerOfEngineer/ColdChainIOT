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
  
  function HumidityChart({ measurements }) {
    const data = {
      labels: measurements.map(m =>
        new Date(m.created_at).toLocaleTimeString()
      ),
      datasets: [
        {
          label: "Humidité (%)",
          data: measurements.map(m => m.humidity),
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          tension: 0.3,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: "Humidité dans le temps",
        },
      },
      scales: {
        y: {
          min: 0,
          max: 100,
        },
      },
    };
  
    return <Line data={data} options={options} />;
  }
  
  export default HumidityChart;
  