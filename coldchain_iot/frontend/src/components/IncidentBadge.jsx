import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function IncidentBadge() {
  const [activeCount, setActiveCount] = useState(0);
  const [pulse, setPulse] = useState(false);
  const navigate = useNavigate();

  const fetchActiveIncidents = () => {
    api.get("incidents/")
      .then(res => {
        const active = res.data.filter(inc => inc.status === "ACTIVE");
        const newCount = active.length;
        
        if (newCount > activeCount) {
          setPulse(true);
          setTimeout(() => setPulse(false), 1000);
        }
        
        setActiveCount(newCount);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchActiveIncidents();
    const interval = setInterval(fetchActiveIncidents, 5000);
    return () => clearInterval(interval);
  }, []);

  if (activeCount === 0) return null;

  return (
    <div
      onClick={() => navigate("/incidents")}
      style={{
        ...styles.badge,
        animation: pulse ? "pulse 1s ease-in-out" : "none"
      }}
      title="Voir les incidents actifs"
    >
      <span style={styles.icon}>⚠️</span>
      <span style={styles.text}>
        {activeCount} incident{activeCount > 1 ? "s" : ""}
      </span>
      <div style={styles.dot}></div>
    </div>
  );
}

const styles = {
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
    color: "white",
    padding: "10px 18px",
    borderRadius: "25px",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(255, 65, 108, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden"
  },
  icon: {
    fontSize: "16px",
    animation: "shake 2s infinite"
  },
  text: {
    letterSpacing: "0.3px"
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#fff",
    animation: "blink 1.5s infinite"
  }
};

// Ajoutez ces animations CSS dans votre fichier global ou avec styled-components
const animationStyles = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); box-shadow: 0 6px 30px rgba(255, 65, 108, 0.6); }
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  
  @keyframes shake {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-5deg); }
    75% { transform: rotate(5deg); }
  }
  
  .incident-badge:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 28px rgba(255, 65, 108, 0.5);
  }
`;

export default IncidentBadge;
