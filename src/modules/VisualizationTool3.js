// src/modules/VisualizationTool.js
import React, { useState, useEffect, useCallback } from "react";
import "./VisualizationTool.css";

const VisualizationTool = () => {
  // time range selection: 'last7', 'last30', 'custom'
  const [timeRange, setTimeRange] = useState("last7");

  // time1 (start) and time2 (end) stored as strings in dd/mm/yyyy format
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");

  // Helper: format Date -> dd/mm/yyyy (string)
  const toDDMMYYYY = (d) => {
    const dt = new Date(d);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy}`;
  };

  // compute last N days: end = today, start = today - N days
  const setLastNDays = useCallback((n) => {
    const now = new Date();
    const endStr = toDDMMYYYY(now);
    const start = new Date(now);
    start.setDate(start.getDate() - n);
    const startStr = toDDMMYYYY(start);
    setTime1(startStr);
    setTime2(endStr);
  }, []);

  // react when timeRange changes
  useEffect(() => {
    if (timeRange === "last7") {
      setLastNDays(7);
    } else if (timeRange === "last30") {
      setLastNDays(30);
    } else if (timeRange === "custom") {
      // keep previous values if present; else initialize to today
      if (!time1) setTime1(toDDMMYYYY(new Date()));
      if (!time2) setTime2(toDDMMYYYY(new Date()));
    }
  }, [timeRange, setLastNDays]); // eslint-disable-line react-hooks/exhaustive-deps

  // initialize on mount to last 7 days
  useEffect(() => {
    setLastNDays(7);
  }, [setLastNDays]);

  const handleApply = () => {
    // time1 and time2 are strings in dd/mm/yyyy format
    console.log("Apply Filters -> time1 (start):", time1, "time2 (end):", time2, "timeRange:", timeRange);

    // TODO: call API or pass these to parent component in the required format
  };

  return (
    <div className="viz-layout reverse-layout">
      {/* RIGHT: FILTERS (moved to right via reverse-layout) */}
      <section className="viz-panel viz-panel-left">
        <h3 className="viz-panel-title">Data & Filters</h3>
        <p className="viz-panel-text">
          Select domain, region and time window to explore oceanographic, fisheries and biodiversity patterns.
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
          <select
            value={timeRange}
            onChange={(e) => {
              setTimeRange(e.target.value);
            }}
          >
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {/* Custom uses plain text inputs with dd/mm/yyyy */}
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

        {/* Parameters removed intentionally as requested */}

        <button type="button" className="viz-apply-btn" onClick={handleApply}>
          Apply Filters
        </button>
      </section>

      {/* LEFT: MAP / SPATIAL VIEW and other panels (moved left by reverse-layout) */}
      <section className="viz-panel viz-panel-main">
        <div className="viz-panel-header">
          <div>
            <h3 className="viz-panel-title">Map / Spatial View</h3>
            <p className="viz-panel-text">
              Placeholder for interactive map or 2D spatial viewer. This will connect to your FastAPI backend later and render real layers.
            </p>
          </div>

          {/* Layer buttons removed as requested */}
        </div>

        <div className="viz-map-placeholder">
          <div className="viz-map-grid-overlay" />
          <p>Spatial visualization canvas</p>
          <span>EEZ · Cruises · Stations · eDNA sites</span>
        </div>
      </section>

      {/* BOTTOM: METRICS / TIME SERIES */}
      <section className="viz-panel viz-panel-bottom">
        <h3 className="viz-panel-title">Time Series & Indicators</h3>
        <p className="viz-panel-text">
          Quick overview of key indicators for the selected region and time window. Later you can replace these cards with real charts.
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
