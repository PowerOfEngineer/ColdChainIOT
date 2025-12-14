import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import TemperatureChart from "../components/TemperatureChart";
import HumidityChart from "../components/HumidityChart";

function Dashboard() {
  const [measurements, setMeasurements] = useState([]);

  // 🔹 Récupération des données + polling
  useEffect(() => {
    const fetchData = () => {
      api.get("mesures/all/")
        .then(res => setMeasurements(res.data))
        .catch(err => console.error(err));
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  // 🔹 Debug (OPTIONNEL mais autorisé)
  useEffect(() => {
    console.log("MEASUREMENTS:", measurements);
  }, [measurements]);

  const latest = measurements[0];

  // ✅ UN SEUL RETURN ICI
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Cold Chain Dashboard</h1>
        <span style={styles.badge}>Live</span>
      </div>

      {latest && (
        <div style={styles.statsGrid}>
          <StatCard title="Température" value={latest.temperature} unit="°C" />
          <StatCard title="Humidité" value={latest.humidity} unit="%" />
          <StatCard title="Mesures" value={measurements.length} />
        </div>
      )}

      {measurements.length > 0 && (
        <>
          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Température dans le temps</h2>
            <TemperatureChart measurements={measurements.slice().reverse()} />
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>Humidité dans le temps</h2>
            <HumidityChart measurements={measurements.slice().reverse()} />
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#fff",
    margin: 0
  },
  badge: {
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    padding: "8px 16px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "14px",
    border: "1px solid rgba(255, 255, 255, 0.3)"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  chartCard: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
  },
  chartTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#fff",
    marginTop: 0,
    marginBottom: "20px"
  }
};

export default Dashboard;
