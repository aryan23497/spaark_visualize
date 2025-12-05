// src/modules/TimelineDebugModule.js
import React from "react";
import "./TimelineDebugModule.css";

const TimelineDebugModule = () => {
  return (
    <div className="dm-tl-layout">
      <section className="dm-tl-panel dm-tl-left">
        <h3 className="dm-tl-title">Ingestion Timeline</h3>
        <p className="dm-tl-text">
          See a chronological view of recent pipeline runs and their outcomes.
        </p>

        <ul className="dm-tl-list">
          <li>
            <span className="dm-tl-dot ok" />
            <div>
              <p className="dm-tl-main">CTD – Cruise MLR-24-01</p>
              <p className="dm-tl-sub">Completed · 12:14 · 10 stations</p>
            </div>
          </li>
          <li>
            <span className="dm-tl-dot warn" />
            <div>
              <p className="dm-tl-main">Fisheries – Landing centre sync</p>
              <p className="dm-tl-sub">
                Warning · 11:52 · Missing gear codes in 23 records
              </p>
            </div>
          </li>
          <li>
            <span className="dm-tl-dot err" />
            <div>
              <p className="dm-tl-main">eDNA – Shelf transects upload</p>
              <p className="dm-tl-sub">
                Failed · 11:23 · Sequence file checksum mismatch
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="dm-tl-panel dm-tl-right">
        <h3 className="dm-tl-title">Debug & Logs (Concept)</h3>
        <p className="dm-tl-text">
          In the final platform, this panel will connect to centralised logs
          (e.g. Loki / ELK) and show filtered error messages.
        </p>

        <div className="dm-tl-log-box">
          <p className="dm-tl-log-line">
            [11:23] ERROR · eDNA pipeline · checksum mismatch for
            file: run_2024_06_12.fq.gz
          </p>
          <p className="dm-tl-log-line">
            [11:24] INFO · Retrying download from object storage…
          </p>
          <p className="dm-tl-log-line">
            [11:52] WARN · Fisheries ingest · unknown gear_code: "X99"
          </p>
        </div>

        <button type="button" className="dm-tl-btn">
          Download Debug Report
        </button>
      </section>
    </div>
  );
};

export default TimelineDebugModule;
