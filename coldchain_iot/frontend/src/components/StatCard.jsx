function StatCard({ title, value, unit }) {
  return (
    <div style={styles.card}>
      <div style={styles.iconContainer}>
        <div style={styles.icon}>
          {title === "Température" ? "🌡️" : title === "Humidité" ? "💧" : "📊"}
        </div>
      </div>
      
      <div style={styles.content}>
        <span style={styles.title}>{title}</span>
        <div style={styles.valueWrapper}>
          <span style={styles.value}>{value}</span>
          {unit && <span style={styles.unit}>{unit}</span>}
        </div>
      </div>
      
      <div style={styles.glow}></div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    overflow: "hidden",
    minWidth: "220px"
  },
  iconContainer: {
    marginBottom: "16px"
  },
  icon: {
    fontSize: "32px",
    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  title: {
    fontSize: "13px",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  valueWrapper: {
    display: "flex",
    alignItems: "baseline",
    gap: "6px"
  },
  value: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#fff",
    lineHeight: "1",
    textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
  },
  unit: {
    fontSize: "18px",
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.7)"
  },
  glow: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
    opacity: 0,
    transition: "opacity 0.3s ease",
    pointerEvents: "none"
  }
};

// Ajoutez cet effet hover avec CSS
const hoverStyle = `
  .stat-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
  }
  .stat-card:hover .glow {
    opacity: 1;
  }
`;

export default StatCard;
