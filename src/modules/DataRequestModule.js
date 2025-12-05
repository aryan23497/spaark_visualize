// src/modules/DataRequestModule.js
import React from "react";
import "./DataRequestModule.css";

const DataRequestModule = () => {
  return (
    <div className="dm-req-layout">
      {/* LEFT: FILTER + SUMMARY */}
      <section className="dm-req-panel dm-req-left">
        <h3 className="dm-req-title">Data Access Requests</h3>
        <p className="dm-req-text">
          Review, filter and manage incoming data access requests from internal
          and external users.
        </p>

        <div className="dm-req-field">
          <label>Filter by status</label>
          <select>
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="dm-req-field">
          <label>Filter by domain</label>
          <select>
            <option>Any</option>
            <option>Oceanography</option>
            <option>Fisheries</option>
            <option>Molecular / eDNA</option>
          </select>
        </div>

        <button type="button" className="dm-req-btn">
          Apply Filters
        </button>

        <p className="dm-req-note">
          * Later this will call a FastAPI endpoint to fetch real request
          records with pagination.
        </p>
      </section>

      {/* RIGHT: TABLE OF REQUESTS */}
      <section className="dm-req-panel dm-req-right">
        <h3 className="dm-req-title">Recent Requests (Sample)</h3>

        <table className="dm-req-table">
          <thead>
            <tr>
              <th>Requester</th>
              <th>Dataset</th>
              <th>Purpose</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dr. A. Nair</td>
              <td>Arabian Sea CTD (2018–2024)</td>
              <td>Climate variability study</td>
              <td className="status-pending">Pending</td>
            </tr>
            <tr>
              <td>Fisheries Division</td>
              <td>Monthly sardine landings</td>
              <td>Stock assessment</td>
              <td className="status-approved">Approved</td>
            </tr>
            <tr>
              <td>External Univ.</td>
              <td>eDNA – shelf transects</td>
              <td>Method validation</td>
              <td className="status-rejected">Rejected</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DataRequestModule;
