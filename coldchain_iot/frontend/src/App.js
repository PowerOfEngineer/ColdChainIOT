import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import IncidentBadge from "./components/IncidentBadge";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import Login from "./pages/Login";

function App() {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("access")
  );

  // Si non authentifié → login
  if (!isAuth) {
    return <Login onLogin={() => setIsAuth(true)} />;
  }

  return (
    <BrowserRouter>
      {/* HEADER AVEC NOTIFICATION */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        background: "#eee"
      }}>
        <h2>Cold Chain</h2>
        <IncidentBadge />
      </header>

      {/* NAVIGATION */}
      <nav style={{ padding: "10px", background: "#ddd" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Dashboard</Link>
        <Link to="/incidents">Incidents</Link>

        <button
          style={{ marginLeft: "20px" }}
          onClick={() => {
            localStorage.clear();
            setIsAuth(false);
          }}
        >
          Logout
        </button>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
