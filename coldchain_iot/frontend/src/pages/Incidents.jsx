import { useEffect, useState } from "react";
import api from "../api/axios";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const res = await api.get("incidents/");
      setIncidents(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les incidents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 10000);
    return () => clearInterval(interval);
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

  const getStatusConfig = (status) => {
    const configs = {
      ACTIVE: {
        color: "#ff4b2b",
        bg: "rgba(255, 75, 43, 0.15)",
        icon: "🚨",
        label: "Actif"
      },
      IN_PROGRESS: {
        color: "#ffa726",
        bg: "rgba(255, 167, 38, 0.15)",
        icon: "⚙️",
        label: "En cours"
      },
      ESCALATED: {
        color: "#ef5350",
        bg: "rgba(239, 83, 80, 0.15)",
        icon: "⬆️",
        label: "Escaladé"
      },
      RESOLVED: {
        color: "#66bb6a",
        bg: "rgba(102, 187, 106, 0.15)",
        icon: "✅",
        label: "Résolu"
      }
    };
    return configs[status] || configs.ACTIVE;
  };

  const filteredIncidents = filter === "ALL" 
    ? incidents 
    : incidents.filter(inc => inc.status === filter);

  const activeCount = incidents.filter(i => i.status === "ACTIVE").length;

  if (loading) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Gestion des Incidents</h1>
        <div style={styles.loadingText}>Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Gestion des Incidents</h1>
        <div style={styles.errorBox}>{error}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Gestion des Incidents</h1>
          <p style={styles.subtitle}>
            {activeCount} incident{activeCount > 1 ? "s" : ""} actif{activeCount > 1 ? "s" : ""}
          </p>
        </div>
        
        {/* Filtres */}
        <div style={styles.filterContainer}>
          {["ALL", "ACTIVE", "IN_PROGRESS", "ESCALATED", "RESOLVED"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                ...styles.filterButton,
                ...(filter === status ? styles.filterButtonActive : {})
              }}
            >
              {status === "ALL" ? "Tous" : getStatusConfig(status).label}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des incidents */}
      <div style={styles.incidentsList}>
        {filteredIncidents.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📋</div>
            <h3 style={styles.emptyTitle}>Aucun incident</h3>
            <p style={styles.emptyText}>
              {filter === "ALL" 
                ? "Tous les systèmes fonctionnent normalement"
                : `Aucun incident ${getStatusConfig(filter).label.toLowerCase()}`
              }
            </p>
          </div>
        ) : (
          filteredIncidents.map(inc => {
            const statusConfig = getStatusConfig(inc.status);
            return (
              <div key={inc.id} style={styles.incidentCard}>
                {/* Header de la carte */}
                <div style={styles.cardHeader}>
                  <div style={styles.cardHeaderLeft}>
                    <span style={styles.sensorIcon}>📡</span>
                    <div>
                      <h3 style={styles.sensorName}>{inc.sensor_name}</h3>
                      <span style={styles.timestamp}>
                        {new Date(inc.created_at).toLocaleString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{
                    ...styles.statusBadge,
                    color: statusConfig.color,
                    background: statusConfig.bg,
                    border: `1px solid ${statusConfig.color}40`
                  }}>
                    <span>{statusConfig.icon}</span>
                    <span>{statusConfig.label}</span>
                  </div>
                </div>

                {/* Température */}
                <div style={styles.temperatureSection}>
                  <div style={styles.tempIcon}>🌡️</div>
                  <div>
                    <span style={styles.tempLabel}>Température détectée</span>
                    <span style={styles.tempValue}>{inc.temperature}°C</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={styles.actionsSection}>
                  {inc.status === "ACTIVE" && (
                    <>
                      <button
                        onClick={() => acceptIncident(inc.id)}
                        style={styles.acceptButton}
                      >
                        ✓ Accepter
                      </button>
                      <button
                        onClick={() => refuseIncident(inc.id)}
                        style={styles.refuseButton}
                      >
                        ✕ Refuser
                      </button>
                    </>
                  )}

                  {inc.status === "IN_PROGRESS" && (
                    <button
                      onClick={() => resolveIncident(inc.id)}
                      style={styles.resolveButton}
                    >
                      ✓ Marquer comme résolu
                    </button>
                  )}

                  {inc.status === "ESCALATED" && (
                    <div style={styles.escalatedMessage}>
                      ⏳ En attente d'un autre technicien
                    </div>
                  )}

                  {inc.status === "RESOLVED" && (
                    <div style={styles.resolvedMessage}>
                      ✅ Incident résolu
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
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
    marginBottom: "32px"
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 8px 0"
  },
  subtitle: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0
  },
  filterContainer: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
    flexWrap: "wrap"
  },
  filterButton: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    padding: "10px 20px",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  filterButtonActive: {
    background: "rgba(255, 255, 255, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    color: "#fff",
    fontWeight: "600"
  },
  incidentsList: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))"
  },
  incidentCard: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px"
  },
  cardHeaderLeft: {
    display: "flex",
    gap: "12px",
    alignItems: "center"
  },
  sensorIcon: {
    fontSize: "24px"
  },
  sensorName: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 4px 0"
  },
  timestamp: {
    fontSize: "13px",
    color: "#6b7280"
  },
  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap"
  },
  temperatureSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(0, 0, 0, 0.03)",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "20px"
  },
  tempIcon: {
    fontSize: "32px"
  },
  tempLabel: {
    display: "block",
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "4px"
  },
  tempValue: {
    display: "block",
    fontSize: "24px",
    fontWeight: "700",
    color: "#ef4444"
  },
  actionsSection: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },
  acceptButton: {
    flex: 1,
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
  },
  refuseButton: {
    flex: 1,
    background: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
    border: "2px solid #ef4444",
    borderRadius: "12px",
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  resolveButton: {
    flex: 1,
    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
  },
  escalatedMessage: {
    width: "100%",
    padding: "12px",
    background: "rgba(251, 146, 60, 0.1)",
    color: "#ea580c",
    borderRadius: "12px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500"
  },
  resolvedMessage: {
    width: "100%",
    padding: "12px",
    background: "rgba(34, 197, 94, 0.1)",
    color: "#16a34a",
    borderRadius: "12px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500"
  },
  emptyState: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "60px 20px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.2)"
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px"
  },
  emptyTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#fff",
    margin: "0 0 8px 0"
  },
  emptyText: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.7)",
    margin: 0
  },
  loadingText: {
    color: "#fff",
    fontSize: "18px",
    textAlign: "center",
    padding: "40px"
  },
  errorBox: {
    background: "rgba(239, 68, 68, 0.2)",
    border: "1px solid rgba(239, 68, 68, 0.5)",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center"
  }
};

export default Incidents;
