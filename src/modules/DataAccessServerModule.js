// src/modules/DataAccessServerModule.js
import React from "react";
import "./DataAccessServerModule.css";

const DataAccessServerModule = () => {
  return (
    <div className="das-layout">
      <section className="das-panel das-left">
        <h3 className="das-title">API Access</h3>
        <p className="das-text">
          Manage tokens and endpoints for programmatic access to the unified
          platform.
        </p>

        <div className="das-field">
          <label>Primary Endpoint</label>
          <code>https://api.oasis.cmlre.in/v1/</code>
        </div>

        <div className="das-field">
          <label>Example Resource</label>
          <code>/datasets?domain=oceanography&amp;region=arabian_sea</code>
        </div>

        <div className="das-field">
          <label>API Token (demo)</label>
          <code>cm lre-demo-xxxx-xxxx</code>
        </div>

        <p className="das-note">
          * In production, tokens will be generated per user / role with
          fine-grained permissions.
        </p>
      </section>

      <section className="das-panel das-right">
        <h3 className="das-title">Sample Queries</h3>

        <div className="das-code-block">
          <p className="das-code-label">Fetch recent CTD profiles</p>
          <pre>{`GET /profiles?parameter=temperature&since=2024-01-01`}</pre>
        </div>

        <div className="das-code-block">
          <p className="das-code-label">Get eDNA detections for a species</p>
          <pre>{`GET /edna/detections?scientificName=Sardinella longiceps`}</pre>
        </div>
      </section>
    </div>
  );
};

export default DataAccessServerModule;
