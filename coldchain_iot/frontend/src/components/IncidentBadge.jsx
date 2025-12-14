import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function IncidentBadge() {
  const [activeCount, setActiveCount] = useState(0);
  const navigate = useNavigate();

  const fetchActiveIncidents = () => {
    api.get("incidents/")
      .then(res => {
        const active = res.data.filter(
          inc => inc.status === "ACTIVE"
        );
        setActiveCount(active.length);
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
        backgroundColor: "red",
        color: "white",
        padding: "6px 14px",
        borderRadius: "20px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 0 5px rgba(0,0,0,0.3)"
      }}
      title="Voir les incidents"
    >
       {activeCount} incident(s) 
    </div>
  );
}

export default IncidentBadge;
