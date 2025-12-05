// src/modules/AIRecommendationModule.js
import React from "react";
import "./AIRecommendationModule.css";

const AIRecommendationModule = () => {
  return (
    <div className="ai-layout">
      {/* LEFT: QUERY + CONTEXT */}
      <section className="ai-panel ai-panel-left">
        <h3 className="ai-title">Ask the Recommendation Engine</h3>
        <p className="ai-text">
          Describe what you want to analyse. The engine will suggest relevant
          datasets, visualizations and workflows from the unified platform.
        </p>

        <label className="ai-label">
          Research Question
          <textarea
            className="ai-textarea"
            placeholder="Example: Analyse the relationship between SST, chlorophyll and sardine CPUE in the Arabian Sea during the southwest monsoon."
          />
        </label>

        <div className="ai-row">
          <div className="ai-field">
            <label className="ai-label">
              Region
              <select className="ai-select">
                <option>Entire Indian EEZ</option>
                <option>Arabian Sea</option>
                <option>Bay of Bengal</option>
                <option>Andaman Sea</option>
              </select>
            </label>
          </div>
          <div className="ai-field">
            <label className="ai-label">
              Time Window
              <select className="ai-select">
                <option>Last 5 years</option>
                <option>Last 10 years</option>
                <option>Seasonal (Monsoon)</option>
              </select>
            </label>
          </div>
        </div>

        <button type="button" className="ai-run-btn">
          Generate Recommendations
        </button>

        <p className="ai-note">
          * In the final system this will call a FastAPI endpoint backed by AI /
          LLM models to generate context-aware suggestions.
        </p>
      </section>

      {/* RIGHT TOP: DATASET SUGGESTIONS */}
      <section className="ai-panel ai-panel-right-top">
        <h3 className="ai-title">Suggested Datasets</h3>
        <p className="ai-text">
          Based on your question, the engine surfaces curated datasets from
          cruises, fisheries and remote sensing archives.
        </p>

        <ul className="ai-list">
          <li>
            <span className="ai-pill">Cruise · MLR-22</span>
            <p className="ai-item-title">
              CTD, plankton & eDNA – Arabian Sea transects
            </p>
            <p className="ai-item-meta">
              Parameters: SST, salinity, nutrients, chlorophyll, DO
            </p>
          </li>
          <li>
            <span className="ai-pill">Fisheries · CMFRI</span>
            <p className="ai-item-title">
              Monthly sardine CPUE along southwest coast
            </p>
            <p className="ai-item-meta">
              Gear-wise catch & effort, landing centre wise
            </p>
          </li>
          <li>
            <span className="ai-pill">Remote Sensing</span>
            <p className="ai-item-title">
              Gridded SST & chlorophyll (satellite, L3)
            </p>
            <p className="ai-item-meta">
              4km grid · weekly composites · Indian EEZ
            </p>
          </li>
        </ul>
      </section>

      {/* RIGHT BOTTOM: WORKFLOW / VIS RECOMMENDATIONS */}
      <section className="ai-panel ai-panel-right-bottom">
        <h3 className="ai-title">Recommended Workflows & Views</h3>
        <p className="ai-text">
          Start from a pre-configured workflow and customise as needed.
        </p>

        <div className="ai-workflow-grid">
          <div className="ai-workflow-card">
            <h4>Eco-Climate Overlay</h4>
            <p>
              Overlay SST anomalies, chlorophyll and CPUE time series for
              selected subregions. Highlight periods of bloom–fishery response.
            </p>
            <ul>
              <li>View: dashboard + map</li>
              <li>Timescale: weekly / monthly</li>
            </ul>
          </div>

          <div className="ai-workflow-card">
            <h4>Habitat Suitability Snapshot</h4>
            <p>
              Use influence engine outputs to map predicted sardine habitat
              suitability under current ocean conditions.
            </p>
            <ul>
              <li>View: spatial heatmap</li>
              <li>Inputs: SST, DO, Chl-a, mixed-layer depth</li>
            </ul>
          </div>

          <div className="ai-workflow-card">
            <h4>Long-term Trend Explorer</h4>
            <p>
              Compare multi-year trends in SST, Chl-a and CPUE to detect regime
              shifts or anomalies in the ecosystem.
            </p>
            <ul>
              <li>View: multi-panel time series</li>
              <li>Export: figures + summary report</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIRecommendationModule;
