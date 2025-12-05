import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Visualizations from "./pages/Visualizations";
import MinisterPage from "./pages/MinisterPage";
import DashboardPage from "./pages/DashboardPage";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/dashboard" element={<DashboardPage />} />  {/* required */}
          <Route path="/ministers/:id" element={<MinisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
