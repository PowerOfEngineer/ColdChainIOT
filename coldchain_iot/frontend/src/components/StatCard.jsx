function StatCard({ title, value, unit }) {
    return (
      <div style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
        width: "200px"
      }}>
        <h3>{title}</h3>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
          {value} {unit}
        </p>
      </div>
    );
  }
  
  export default StatCard;
  