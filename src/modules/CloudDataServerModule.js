// src/modules/CloudDataServerModule.js
import React from "react";
import "./CloudDataServerModule.css";

const CloudDataServerModule = () => {
  return (
    <div className="cloud-layout">
      <section className="cloud-panel">
        <h3 className="cloud-title">Cluster Overview</h3>
        <p className="cloud-text">
          High-level view of storage and compute resources backing the unified
          data platform.
        </p>

        <div className="cloud-grid">
          <div className="cloud-card">
            <p className="cloud-label">Storage Used</p>
            <p className="cloud-value">42 TB / 80 TB</p>
            <p className="cloud-meta">Oceanography · Fisheries · eDNA</p>
          </div>
          <div className="cloud-card">
            <p className="cloud-label">Active Nodes</p>
            <p className="cloud-value">12</p>
            <p className="cloud-meta">ETL, API, analytics workers</p>
          </div>
          <div className="cloud-card">
            <p className="cloud-label">Uptime</p>
            <p className="cloud-value">99.7%</p>
            <p className="cloud-meta">Last 30 days</p>
          </div>
        </div>
      </section>

      <section className="cloud-panel">
        <h3 className="cloud-title">Data Domains</h3>
        <p className="cloud-text">
          Logical buckets used to organise and secure data.
        </p>

        <ul className="cloud-list">
          <li>
            <span>ocean_raw/</span> – cruise, CTD, mooring observations
          </li>
          <li>
            <span>fisheries/</span> – landings, CPUE, survey cruises
          </li>
          <li>
            <span>molecular/</span> – barcodes, eDNA, sequence outputs
          </li>
          <li>
            <span>derived_products/</span> – gridded fields, indices, models
          </li>
        </ul>
      </section>
    </div>
  );
};

export default CloudDataServerModule;
