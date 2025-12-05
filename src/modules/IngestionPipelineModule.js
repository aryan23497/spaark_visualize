// src/modules/IngestionPipelineModule.js
import React from "react";
import "./IngestionPipelineModule.css";

const IngestionPipelineModule = () => {
  return (
    <div className="ingest-layout">
      <section className="ingest-panel ingest-left">
        <h3 className="ingest-title">Configure Ingestion</h3>
        <p className="ingest-text">
          Define the source, format and schedule for bringing new datasets into
          the unified platform.
        </p>

        <div className="ingest-field">
          <label>Source Type</label>
          <select>
            <option>Cruise CTD / Station data</option>
            <option>Fisheries landings / CPUE</option>
            <option>Remote sensing (satellite)</option>
            <option>Molecular / eDNA runs</option>
          </select>
        </div>

        <div className="ingest-field">
          <label>Input Format</label>
          <select>
            <option>CSV / TSV</option>
            <option>NetCDF</option>
            <option>GeoTIFF</option>
            <option>JSON / API feed</option>
          </select>
        </div>

        <div className="ingest-field">
          <label>Validation Profile</label>
          <select>
            <option>Standard oceanographic QC</option>
            <option>Fisheries checks (gear, species)</option>
            <option>Molecular QC (reads, coverage)</option>
          </select>
        </div>

        <button type="button" className="ingest-btn">
          Create Pipeline
        </button>

        <p className="ingest-note">
          * Later this connects to workflow definitions stored on the backend
          and runs via FastAPI / schedulers.
        </p>
      </section>

      <section className="ingest-panel ingest-right">
        <h3 className="ingest-title">Recent Pipelines</h3>
        <p className="ingest-text">
          Overview of active and completed ingestion jobs.
        </p>

        <table className="ingest-table">
          <thead>
            <tr>
              <th>Pipeline</th>
              <th>Source</th>
              <th>Status</th>
              <th>Last Run</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Arabian Sea – CTD 2024</td>
              <td>Cruise CTD</td>
              <td className="ok">Completed</td>
              <td>2 days ago</td>
            </tr>
            <tr>
              <td>Monsoon sardine CPUE</td>
              <td>Fisheries</td>
              <td className="running">Running</td>
              <td>Just now</td>
            </tr>
            <tr>
              <td>eDNA – shelf transects</td>
              <td>Molecular</td>
              <td className="warn">Warning</td>
              <td>5 hours ago</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default IngestionPipelineModule;
