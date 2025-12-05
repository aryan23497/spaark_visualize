// src/modules/OceanographyModule.js
import React from "react";
import "./OceanographyModule.css";

const OceanographyModule = () => {
  return (
    <div className="dm-domain-layout">
      {/* LEFT: Overview + subareas */}
      <section className="dm-domain-panel">
        <h3 className="dm-domain-title">Oceanography</h3>
        <p className="dm-domain-subtitle">
          Physical, chemical and biological ocean processes linked to habitats,
          species and ecosystem functioning.
        </p>

        <div className="dm-domain-chip-row">
          <div className="dm-domain-chip">
            <span>🌊</span>
            <span>Physical Oceanography</span>
          </div>
          <div className="dm-domain-chip">
            <span>⚗️</span>
            <span>Chemical Oceanography</span>
          </div>
          <div className="dm-domain-chip">
            <span>🧫</span>
            <span>Biological Oceanography</span>
          </div>
          <div className="dm-domain-chip">
            <span>🗺️</span>
            <span>Habitat Mapping</span>
          </div>
          <div className="dm-domain-chip">
            <span>🛰️</span>
            <span>Satellite Data</span>
          </div>
          <div className="dm-domain-chip">
            <span>📍</span>
            <span>Spatial Analysis</span>
          </div>
          <div className="dm-domain-chip">
            <span>📈</span>
            <span>Species Distribution Modelling (SDM)</span>
          </div>
          <div className="dm-domain-chip">
            <span>🌈</span>
            <span>Ocean Colour &amp; SST</span>
          </div>
        </div>

        <ul className="dm-domain-list">
          <li>
            Bring together in-situ CTD, ARGO, moorings and satellite products
            for a unified view.
          </li>
          <li>
            Link environmental drivers to fisheries, biodiversity and ecosystem
            indices.
          </li>
          <li>
            Support habitat suitability and species distribution modelling
            workflows.
          </li>
        </ul>

        <p className="dm-domain-hint">
          * This module becomes the backbone for environmental layers used
          across fisheries, biodiversity and eDNA analyses.
        </p>
      </section>

      {/* RIGHT: tools / actions */}
      <section className="dm-domain-panel">
        <h3 className="dm-domain-title">Oceanography Tools (Concept)</h3>
        <p className="dm-domain-subtitle">
          A set of tools for exploring gridded fields, sections and time series.
        </p>

        <div className="dm-domain-tool-grid">
          <div className="dm-domain-tool-card">
            <h4>Section &amp; Time-Series Viewer</h4>
            <p>
              Plot vertical sections, Hovmöller diagrams and time series for
              chosen parameters (T, S, oxygen, chlorophyll, etc.).
            </p>
          </div>
          <div className="dm-domain-tool-card">
            <h4>Habitat / SDM Layers</h4>
            <p>
              Manage layers used for habitat suitability mapping and species
              distribution models.
            </p>
          </div>
          <div className="dm-domain-tool-card">
            <h4>Satellite &amp; In Situ Blending</h4>
            <p>
              Combine satellite SST / colour with in situ profiles to create
              near-real-time fields.
            </p>
          </div>
        </div>

        <div className="dm-domain-actions">
          <button className="dm-domain-btn">Open Map Workspace</button>
          <button className="dm-domain-btn dm-domain-btn-outline">
            Configure SDM Inputs
          </button>
          <button className="dm-domain-btn dm-domain-btn-ghost">
            View Data Lineage
          </button>
        </div>
      </section>
    </div>
  );
};

export default OceanographyModule;
