import React, { useEffect, useState } from "react";
import "./Visualizations.css";

const API_BASE = "http://192.168.137.173:8000/docs"; // FastAPI base URL

const VisualizationsPage = () => {
  const [data, setData] = useState(null);      // generic response from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}`); 
        // 👆 change this path to whatever your backend exposes

        if (!res.ok) {
          throw new Error("API call failed");
        }

        // If backend returns JSON:
        const body = await res.json();
        setData(body);
      } catch (err) {
        console.error(err);
        setError("Failed to load data from backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="viz-page">
      <h1 className="viz-title">Data Visualizations & Analytics</h1>
      <p className="viz-subtitle">
        Showing exactly what the backend API returns.
      </p>

      {loading && <p className="viz-status">Loading data from backend…</p>}
      {error && <p className="viz-error">{error}</p>}

      {!loading && !error && data && (
        <section className="viz-section">
          <h2>Raw API Response</h2>
          <pre className="viz-json-block">
            {JSON.stringify(data, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
};

export default VisualizationsPage;
