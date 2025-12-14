import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import IncidentBadge from "./components/IncidentBadge";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import Login from "./pages/Login";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("access"));

  // Si non authentifié → login
  if (!isAuth) {
    return <Login onLogin={() => setIsAuth(true)} />;
  }

  return (
    <BrowserRouter>
      <div style={styles.appWrapper}>
        <Navbar setIsAuth={setIsAuth} />
        
        <div style={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

// Composant Navbar séparé
function Navbar({ setIsAuth }) {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        {/* Logo / Brand */}
        <Link to="/" style={styles.brand}>
          <div style={styles.logoWrapper}>
            <span style={styles.logoIcon}>❄️</span>
            <div style={styles.logoPulse}></div>
          </div>
          <div style={styles.brandText}>
            <h1 style={styles.brandTitle}>Cold Chain</h1>
            <span style={styles.brandSubtitle}>Monitoring System</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div style={styles.navLinks}>
          <Link
            to="/"
            style={{
              ...styles.navLink,
              ...(isActive("/") ? styles.navLinkActive : {})
            }}
          >
            <span style={styles.navIcon}>📊</span>
            <span>Dashboard</span>
            {isActive("/") && <div style={styles.activeBar}></div>}
          </Link>

          <Link
            to="/incidents"
            style={{
              ...styles.navLink,
              ...(isActive("/incidents") ? styles.navLinkActive : {})
            }}
          >
            <span style={styles.navIcon}>🚨</span>
            <span>Incidents</span>
            {isActive("/incidents") && <div style={styles.activeBar}></div>}
          </Link>
        </div>

        {/* Right Actions */}
        <div style={styles.navActions}>
          <IncidentBadge />

          {/* User Menu */}
          <div style={styles.userMenuWrapper}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={styles.userButton}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            >
              <span style={styles.userAvatar}>👤</span>
              <span style={styles.userName}>Admin</span>
              <span style={{
                ...styles.dropdownArrow,
                transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)"
              }}>
                ▼
              </span>
            </button>

            {showDropdown && (
              <div style={styles.dropdown}>
                <button style={styles.dropdownItem}>
                  <span>⚙️</span>
                  <span>Paramètres</span>
                </button>
                <button style={styles.dropdownItem}>
                  <span>📊</span>
                  <span>Statistiques</span>
                </button>
                <div style={styles.dropdownDivider}></div>
                <button
                  onClick={handleLogout}
                  style={styles.dropdownItemDanger}
                >
                  <span>🚪</span>
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  appWrapper: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh"
  },
  contentWrapper: {
    paddingTop: "0"
  },
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
  },
  navContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 40px",
    maxWidth: "1920px",
    margin: "0 auto"
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    textDecoration: "none",
    transition: "transform 0.3s ease"
  },
  logoWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px"
  },
  logoIcon: {
    fontSize: "36px",
    filter: "drop-shadow(0 2px 12px rgba(255, 255, 255, 0.6))",
    position: "relative",
    zIndex: 1
  },
  logoPulse: {
    position: "absolute",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
    animation: "pulse 2s ease-in-out infinite"
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  brandTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    lineHeight: "1.2",
    textShadow: "0 2px 12px rgba(0, 0, 0, 0.3)",
    letterSpacing: "-0.5px"
  },
  brandSubtitle: {
    fontSize: "11px",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.75)",
    textTransform: "uppercase",
    letterSpacing: "1.5px"
  },
  navLinks: {
    display: "flex",
    gap: "8px",
    alignItems: "center"
  },
  navLink: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 24px",
    borderRadius: "14px",
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "15px",
    fontWeight: "500",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid transparent"
  },
  navLinkActive: {
    background: "rgba(255, 255, 255, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.35)",
    color: "#fff",
    fontWeight: "600",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)"
  },
  navIcon: {
    fontSize: "20px",
    display: "flex",
    alignItems: "center"
  },
  activeBar: {
    position: "absolute",
    bottom: "-14px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "40%",
    height: "3px",
    background: "#fff",
    borderRadius: "2px 2px 0 0",
    boxShadow: "0 -2px 8px rgba(255, 255, 255, 0.5)"
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  userMenuWrapper: {
    position: "relative"
  },
  userButton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    borderRadius: "14px",
    padding: "10px 18px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  userAvatar: {
    fontSize: "20px",
    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))"
  },
  userName: {
    fontWeight: "600",
    letterSpacing: "0.3px"
  },
  dropdownArrow: {
    fontSize: "10px",
    opacity: 0.8,
    transition: "transform 0.3s ease"
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 12px)",
    right: 0,
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "16px",
    padding: "8px",
    minWidth: "220px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    animation: "slideDown 0.3s ease"
  },
  dropdownItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    background: "transparent",
    border: "none",
    borderRadius: "10px",
    color: "#1f2937",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left"
  },
  dropdownDivider: {
    height: "1px",
    background: "rgba(0, 0, 0, 0.1)",
    margin: "8px 0"
  },
  dropdownItemDanger: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    background: "transparent",
    border: "none",
    borderRadius: "10px",
    color: "#ef4444",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "left"
  }
};

export default App;
