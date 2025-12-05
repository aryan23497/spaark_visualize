// src/modules/LiteratureLibraryModule.js
import React from "react";
import "./LiteratureLibraryModule.css";

const LiteratureLibraryModule = () => {
  return (
    <div className="lit-layout">
      <section className="lit-panel lit-left">
        <h3 className="lit-title">Search Literature</h3>
        <p className="lit-text">
          Discover papers, reports and cruise documents linked to datasets and
          modules.
        </p>

        <input
          className="lit-search"
          placeholder="Search by keyword, species, region, cruise ID…"
        />

        <div className="lit-filters">
          <button className="lit-pill">Ecosystem modelling</button>
          <button className="lit-pill">Fisheries</button>
          <button className="lit-pill">eDNA</button>
          <button className="lit-pill">Climate</button>
        </div>

        <p className="lit-note">
          * Later this can integrate with institutional repositories and DOI
          services.
        </p>
      </section>

      <section className="lit-panel lit-right">
        <h3 className="lit-title">Highlighted Records</h3>

        <div className="lit-card">
          <h4>
            Ecosystem responses to monsoon-driven upwelling in the Arabian Sea
          </h4>
          <p className="lit-meta">Journal of Marine Systems · 2023</p>
          <p className="lit-tags">Keywords: SST, upwelling, sardine, CPUE</p>
        </div>

        <div className="lit-card">
          <h4>
            Environmental DNA reveals cryptic biodiversity along the Indian
            shelf
          </h4>
          <p className="lit-meta">Frontiers in Marine Science · 2024</p>
          <p className="lit-tags">Keywords: eDNA, metabarcoding, fish</p>
        </div>

        <div className="lit-card">
          <h4>
            Integrating fisheries and oceanographic time-series for stock
            assessment
          </h4>
          <p className="lit-meta">Technical Report · CMLRE</p>
          <p className="lit-tags">Keywords: time series, CPUE, climate</p>
        </div>
      </section>
    </div>
  );
};

export default LiteratureLibraryModule;
