import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import "./styles.css";

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh"
  }
};

export default App;
