// src/modules/DataProcessorModule.js
import React from "react";
import "./DataProcessorModule.css";

const DataProcessorModule = () => {
  return (
    <div className="proc-layout">
      <section className="proc-panel">
        <h3 className="proc-title">Processing Templates</h3>
        <p className="proc-text">
          Pre-configured ETL pipelines for commonly used transformations.
        </p>

        <div className="proc-templates">
          <div className="proc-card">
            <h4>CTD → Gridded Sections</h4>
            <p>Bin by depth &amp; distance, interpolate and export NetCDF.</p>
          </div>
          <div className="proc-card">
            <h4>Fisheries → CPUE Index</h4>
            <p>
              Normalise catch by effort and generate time-series at region /
              gear level.
            </p>
          </div>
          <div className="proc-card">
            <h4>eDNA → Species Matrix</h4>
            <p>Convert read counts into presence / probability matrices.</p>
          </div>
        </div>
      </section>

      <section className="proc-panel">
        <h3 className="proc-title">Job Queue (Sample)</h3>
        <p className="proc-text">
          In production this will stream job status from the processing
          framework.
        </p>

        <table className="proc-table">
          <thead>
            <tr>
              <th>Job</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Arabian CTD sections</td>
              <td>CTD → grid</td>
              <td className="ok">Completed</td>
            </tr>
            <tr>
              <td>Monsoon CPUE index</td>
              <td>CPUE</td>
              <td className="run">Running</td>
            </tr>
            <tr>
              <td>eDNA matrix v2</td>
              <td>eDNA</td>
              <td className="warn">Waiting</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DataProcessorModule;
