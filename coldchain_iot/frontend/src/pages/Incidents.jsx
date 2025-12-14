import { useEffect, useState } from "react";
import api from "../api/axios";

function Incidents() {
  const [incidents, setIncidents] = useState([]);

  const fetchIncidents = () => {
    api.get("incidents/all/")
      .then(res => setIncidents(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const acceptIncident = (id) => {
    api.post(`incidents/accept/${id}/`)
      .then(() => fetchIncidents())
      .catch(err => console.error(err));
  };

  const refuseIncident = (id) => {
    api.post(`incidents/refuse/${id}/`)
      .then(() => fetchIncidents())
      .catch(err => console.error(err));
  };

  const resolveIncident = (id) => {
    api.post(`incidents/resolve/${id}/`)
      .then(() => fetchIncidents())
      .catch(err => console.error(err));
  };
  const getRowColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "#ffcccc";      // rouge clair
      case "IN_PROGRESS":
        return "#fff3cd";      // jaune
      case "ESCALATED":
        return "#f8d7da";      // orange / rose
      case "RESOLVED":
        return "#e6ffe6";      // vert
      default:
        return "#ffffff";
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Gestion des Incidents</h1>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
        style={{ marginTop: "20px" }}
      >
        <thead style={{ backgroundColor: "#f0f0f0" }}>
          <tr>
            <th>Capteur</th>
            <th>Température</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map(inc => (
            <tr
              key={inc.id}
              style={{ backgroundColor: getRowColor(inc.status) }}
            >
              <td>{inc.sensor_name}</td>
              <td>{inc.temperature} °C</td>
              <td>{inc.status}</td>
              <td>{new Date(inc.created_at).toLocaleString()}</td>

              <td>
                {/* INCIDENT ACTIF */}
                {inc.status === "ACTIVE" && (
                  <>
                    <button
                      onClick={() => acceptIncident(inc.id)}
                      style={{ marginRight: "10px" }}
                    >
                      Accepter
                    </button>

                    <button onClick={() => refuseIncident(inc.id)}>
                      Refuser
                    </button>
                  </>
                )}

                {/* INCIDENT EN COURS */}
                {inc.status === "IN_PROGRESS" && (
                  <button
                    onClick={() => resolveIncident(inc.id)}
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer"
                    }}
                  >
                    Marquer comme résolu
                  </button>
                )}

                {/* INCIDENT ESCALADÉ */}
                {inc.status === "ESCALATED" && (
                  <span>En attente d’un autre technicien</span>
                )}

                {/* INCIDENT RÉSOLU */}
                {inc.status === "RESOLVED" && (
                  <span>Résolu</span>
                )}
              </td>
            </tr>
          ))}

          {incidents.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Aucun incident détecté
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Incidents;
