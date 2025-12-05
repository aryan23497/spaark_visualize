// src/modules/VisualizationTool.js
import React, { useState, useEffect, useCallback } from "react";
import "./VisualizationTool.css";
import VisualizationParametersPanel from "./VisualizationParametersPanel";
import axios from "axios";

/* Chart imports */
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

/* register basic Chart.js components */
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const VisualizationTool = () => {
  // -----------------------------
  // STATES
  // -----------------------------
  const [timeRange, setTimeRange] = useState("last7");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");

  // vizParams: updated by the VisualizationParametersPanel via handleVizParamsChange
  const [vizParams, setVizParams] = useState({
    independentVariable: "Time",
    parameters: ["SST"],
  });

  // hold visualization data returned from the backend
  const [vizData, setVizData] = useState(null);

  // Callback when panel changes selections
  const handleVizParamsChange = (payload) => {
    setVizParams(payload);
  };

  // -----------------------------
  // Date helpers
  // -----------------------------
  const toDDMMYYYY = (d) => {
    const dt = new Date(d);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy}`;
  };

  const setLastNDays = useCallback((n) => {
    const now = new Date();
    const endStr = toDDMMYYYY(now);
    const start = new Date(now);
    start.setDate(start.getDate() - n);
    const startStr = toDDMMYYYY(start);
    setTime1(startStr);
    setTime2(endStr);
  }, []);

  useEffect(() => {
    if (timeRange === "last7") setLastNDays(7);
    else if (timeRange === "last30") setLastNDays(30);
    else if (timeRange === "custom") {
      if (!time1) setTime1(toDDMMYYYY(new Date()));
      if (!time2) setTime2(toDDMMYYYY(new Date()));
    }
  }, [timeRange, setLastNDays]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLastNDays(7);
  }, [setLastNDays]);

  // -----------------------------
  // Convert dd/mm/yyyy -> yyyy-mm-dd for backend
  // -----------------------------
  const toYYYYMMDD = (ddmmyyyy) => {
    if (!ddmmyyyy) return "";
    const parts = ddmmyyyy.split("/");
    if (parts.length !== 3) return ddmmyyyy;
    const [dd, mm, yyyy] = parts;
    return `${yyyy}-${mm}-${dd}`;
  };

  // -----------------------------
  // Field mapping UI -> backend
  // -----------------------------
  const fieldMap = {
    Time: "time",
    Latitude: "lat",
    Longitude: "lon",
    DIC: "dic",
    MCO: "mco",
    PCO2_ORIGINAL: "pco2_original",
    CHL: "chl",
    NO3: "no3",
    SSS: "sss",
    SST: "sst",
    DEVIANT_UNCERTAINTY: "deviant_uncertainty",
  };

  // -----------------------------
  // Apply: send payload to backend via Axios
  // -----------------------------
  const handleApply = async () => {
    try {
      const { independentVariable, parameters } = vizParams || {};
      if (!parameters || parameters.length === 0) {
        alert("Select at least one Y parameter.");
        return;
      }

      const start_date = toYYYYMMDD(time1);
      const end_date = toYYYYMMDD(time2);

      const x_axis = fieldMap[independentVariable] || independentVariable;
      const y_axes = parameters.map((p) => fieldMap[p] || p);

      const payload = {
        start_date,
        end_date,
        time_range: timeRange,
        x_axis,
        y_axes,
        x_label: independentVariable,
        y_labels: parameters,
      };

      console.log("Sending visualization payload:", payload);

      // adjust URL to your backend endpoint
      const backendUrl = "http://localhost:8000/api/visualize";

      const response = await axios.post(backendUrl, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 30000,
      });

      console.log("Backend response:", response.data);

      if (response?.data?.status === "ok") {
        const data = response.data.payload;
        // STORE the returned visualization data so the left panel can render it
        setVizData(data);
        console.log("Visualization data saved to state:", data);
      } else {
        console.warn("Unexpected backend response:", response.data);
        alert("Server returned unexpected response. See console for details.");
      }
    } catch (err) {
      console.error("Apply failed:", err);
      if (err.response) {
        alert(`Server error ${err.response.status}: ${err.response.data?.error || err.response.statusText}`);
      } else if (err.request) {
        alert("No response from server. Is the backend running at http://localhost:8000?");
      } else {
        alert(`Request failed: ${err.message}`);
      }
    }
  };

  // -----------------------------
  // X and Y option lists (explicit)
  // -----------------------------
  const xOptions = ["Latitude", "Longitude", "Time"];
  const yOptions = [
    "DIC",
    "MCO",
    "PCO2_ORIGINAL",
    "CHL",
    "NO3",
    "SSS",
    "SST",
    "DEVIANT_UNCERTAINTY",
  ];

  // -----------------------------
  // Chart data preparation
  // -----------------------------
  const makeChartData = (vizData) => {
    // vizData expected shape: { x: [...], series: [{ name, label, values: [...] }, ...] }
    if (!vizData || !Array.isArray(vizData.x) || !Array.isArray(vizData.series)) return null;

    const labels = vizData.x.map(String); // x axis labels

    // color palette (small set)
    const palette = [
      "#34d399", // green
      "#60a5fa", // blue
      "#f97316", // orange
      "#f43f5e", // red
      "#a78bfa", // purple
      "#f59e0b", // amber
      "#06b6d4", // teal
      "#94a3b8", // gray
    ];

    const datasets = vizData.series.map((s, idx) => {
      // if values length doesn't match labels, trim/pad
      const values = Array.isArray(s.values) ? s.values : [];
      const data = labels.map((_, i) => (i < values.length ? values[i] : null));
      return {
        label: s.label || s.name || `series ${idx + 1}`,
        data,
        borderColor: palette[idx % palette.length],
        backgroundColor: palette[idx % palette.length],
        tension: 0.2,
        fill: false,
        pointRadius: 3,
      };
    });

    return { labels, datasets };
  };

  const chartData = makeChartData(vizData);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: false, text: "Visualization" },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", intersect: false },
    scales: {
      x: { display: true, title: { display: true, text: vizParams.independentVariable } },
      y: { display: true, title: { display: true, text: "Value" } },
    },
  };

  // -----------------------------
  // UI / JSX
  // -----------------------------
  return (
    <div className="viz-layout reverse-layout">
      {/* RIGHT: FILTERS */}
      <section className="viz-panel viz-panel-left">
        <h3 className="viz-panel-title">Data & Filters</h3>
        <p className="viz-panel-text">
          Select domain, region and time window to explore oceanographic,
          fisheries and biodiversity patterns.
        </p>

        <div className="viz-form-group">
          <label>Domain</label>
          <select>
            <option>Oceanography</option>
            <option>Fisheries</option>
            <option>Molecular / eDNA</option>
            <option>Taxonomy</option>
          </select>
        </div>

        <div className="viz-form-group">
          <label>Region</label>
          <select>
            <option>Entire Indian EEZ</option>
            <option>Arabian Sea</option>
            <option>Bay of Bengal</option>
            <option>Andaman Sea</option>
          </select>
        </div>

        <div className="viz-form-group">
          <label>Time Range</label>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {timeRange === "custom" && (
          <>
            <div className="viz-form-group">
              <label>Start date</label>
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                value={time1}
                onChange={(e) => setTime1(e.target.value)}
                className="date-input"
              />
            </div>

            <div className="viz-form-group">
              <label>End date</label>
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                value={time2}
                onChange={(e) => setTime2(e.target.value)}
                className="date-input"
              />
            </div>
          </>
        )}

        <div style={{ marginTop: 18 }}>
          <VisualizationParametersPanel
            xOptions={xOptions}
            yOptions={yOptions}
            initialX="Time"
            initialY={["SST"]}
            onChange={handleVizParamsChange}
          />
        </div>

        <button type="button" className="viz-apply-btn" onClick={handleApply}>
          Apply Filters
        </button>
      </section>

      {/* LEFT: MAP / SPATIAL VIEW */}
      <section className="viz-panel viz-panel-main">
        <div className="viz-panel-header">
          <div>
            <h3 className="viz-panel-title">Map / Spatial View</h3>
            <p className="viz-panel-text">
              Placeholder for interactive map or 2D spatial viewer. This will
              connect to your FastAPI backend later and render real layers.
            </p>
          </div>
        </div>

        <div className="viz-map-placeholder">
          <div className="viz-map-grid-overlay" />
          {/* CONDITIONAL: show placeholder when no vizData, else show chart */}
          {!vizData ? (
            <>
              <p>Spatial visualization canvas</p>
              <span>EEZ · Cruises · Stations · eDNA sites</span>
            </>
          ) : chartData ? (
            <div style={{ width: "100%", height: 420, padding: 12 }}>
              <div style={{ marginBottom: 8, color: "#cbd5e1" }}>
                Visualization loaded from API — preview:
              </div>
              <div style={{ width: "100%", height: 360 }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          ) : (
            // fallback if chartData couldn't be built
            <pre style={{ color: "#e6f3ff", padding: 12 }}>{JSON.stringify(vizData, null, 2)}</pre>
          )}
        </div>
      </section>

      {/* BOTTOM: METRICS / TIME SERIES */}
      <section className="viz-panel viz-panel-bottom">
        <h3 className="viz-panel-title">Time Series & Indicators</h3>
        <p className="viz-panel-text">
          Quick overview of key indicators for the selected region and time
          window. Later you can replace these cards with real charts.
        </p>

        <div className="viz-metrics-grid">
          <div className="viz-metric-card">
            <p className="viz-metric-label">SST (°C)</p>
            <p className="viz-metric-value">27.3</p>
            <p className="viz-metric-note">Near long-term average.</p>
          </div>
          <div className="viz-metric-card">
            <p className="viz-metric-label">Chl-a (mg/m³)</p>
            <p className="viz-metric-value">0.8</p>
            <p className="viz-metric-note">Elevated coastal bloom.</p>
          </div>
          <div className="viz-metric-card">
            <p className="viz-metric-label">CPUE Index</p>
            <p className="viz-metric-value">+12%</p>
            <p className="viz-metric-note">Above seasonal average.</p>
          </div>
          <div className="viz-metric-card">
            <p className="viz-metric-label">eDNA Hits</p>
            <p className="viz-metric-value">34</p>
            <p className="viz-metric-note">Species detections in the last month.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisualizationTool;
