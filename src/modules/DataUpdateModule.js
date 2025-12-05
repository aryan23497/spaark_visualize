// src/modules/DataUpdateModule.js
import React from "react";
import "./DataUpdateModule.css";

const DataUpdateModule = () => {
  return (
    <div className="dm-upd-layout">
      <section className="dm-upd-panel dm-upd-left">
        <h3 className="dm-upd-title">Pending Dataset Updates</h3>
        <p className="dm-upd-text">
          View corrections, version updates and change requests awaiting your
          action.
        </p>

        <ul className="dm-upd-list">
          <li>
            <h4>Arabian Sea CTD 2022</h4>
            <p>Correction: depth sensor offset on stations 31–40.</p>
            <span className="dm-upd-tag">Correction</span>
          </li>
          <li>
            <h4>eDNA shelf transects v1 → v2</h4>
            <p>Update: new taxonomic assignments from latest reference DB.</p>
            <span className="dm-upd-tag dm-upd-tag-major">
              Major update
            </span>
          </li>
          <li>
            <h4>Fisheries landings (2010–2015)</h4>
            <p>Metadata: add missing gear codes & landing centres.</p>
            <span className="dm-upd-tag">Metadata</span>
          </li>
        </ul>
      </section>

      <section className="dm-upd-panel dm-upd-right">
        <h3 className="dm-upd-title">Update Actions</h3>
        <p className="dm-upd-text">
          In the final system this will show a detail view of the selected
          update with buttons to approve, reject or schedule processing.
        </p>

        <div className="dm-upd-actions">
          <button type="button" className="dm-upd-btn">
            Approve &amp; Apply
          </button>
          <button type="button" className="dm-upd-btn dm-upd-btn-secondary">
            Request Clarification
          </button>
          <button type="button" className="dm-upd-btn dm-upd-btn-ghost">
            Reject Update
          </button>
        </div>

        <p className="dm-upd-note">
          * These actions will eventually trigger backend workflows and version
          management.
        </p>
      </section>
    </div>
  );
};

export default DataUpdateModule;
