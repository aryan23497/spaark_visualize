// src/modules/VisualizationTool.js
import React, { useState, useEffect, useCallback } from "react";
import "./VisualizationTool.css";
import VisualizationParametersPanel from "./VisualizationParametersPanel";

const VisualizationTool = () => {
  const [timeRange, setTimeRange] = useState("last7");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");

  // vizParams will be updated by the panel's onChange
  const [vizParams, setVizParams] = useState({
    independentVariable: "Time",
    parameters: ["SST"],
  });

  // X and Y option lists (exact values you requested)
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

  const handleVizParamsChange = (payload) => {
    setVizParams(payload);
  };

  const handleApply = async () => {
    const { independentVariable, parameters } = vizParams;

    const toYYYYMMDD = (ddmmyyyy) => {
      if (!ddmmyyyy) return "";
      const parts = ddmmyyyy.split("/");
      if (parts.length !== 3) return ddmmyyyy;
      const [dd, mm, yyyy] = parts;
      return `${yyyy}-${mm}-${dd}`;
    };

    const requestBody = {
      start_date: toYYYYMMDD(time1),
      end_date: toYYYYMMDD(time2),
      time_range: timeRange,
      x_axis: independentVariable,
      y_axes: parameters,
    };

    console.log("Viz Request payload:", requestBody);

    // TODO: map labels -> backend fields if needed, then POST to API
    // e.g.
    // await fetch('/api/visualize', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(requestBody) })
  };

  return (
    <div className="viz-layout reverse-layout">
      <section className="viz-panel viz-panel-left">
        <h3 className="viz-panel-title">Data & Filters</h3>
        <p className="viz-panel-text">
          Select domain, region and time window to explore patterns.
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

      <section className="viz-panel viz-panel-main">
        <div className="viz-panel-header">
          <div>
            <h3 className="viz-panel-title">Map / Spatial View</h3>
            <p className="viz-panel-text">Placeholder for interactive map or 2D spatial viewer.</p>
          </div>
        </div>

        <div className="viz-map-placeholder">
          <div className="viz-map-grid-overlay" />
          <p>Spatial visualization canvas</p>
          <span>EEZ · Cruises · Stations · eDNA sites</span>
        </div>
      </section>

      <section className="viz-panel viz-panel-bottom">
        <h3 className="viz-panel-title">Time Series & Indicators</h3>
        <p className="viz-panel-text">Quick overview of key indicators for the selected region and time window.</p>

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
