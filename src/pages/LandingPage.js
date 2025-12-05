import React from "react";
// if your component file is src/components/ScrollableIndiaCoastlineMap.jsx
import ScrollableIndiaCoastlineMap from "../components/ScrollableIndiaCoastlineMap";

import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="landing">
      <p className="hero-badge">
            Ministry of Earth Sciences · CMLRE · Kochi
          </p>

      {/* Banner Image Below Navbar */}

<div 
  style={{
    width: "100%",
    height: "160px",               // change height if needed
    backgroundImage: "url('/assets/banner.png')",  // place image in public/assets/
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "8px",
    marginTop: "20px",             // space below navbar
    marginBottom: "20px",          // space above hero
    boxShadow: "0 6px 20px rgba(0,0,0,0.5)"
  }}
></div>

<section className="hero">
        <div className="hero-content">
          

      

          <h1 className="hero-title">
            AI-Driven Unified Data Platform for{" "}
            <span className="accent">
              Oceanographic, Fisheries & Biodiversity Insights
            </span>
          </h1>

          <p className="hero-subtitle">
            A cloud-ready, intelligent digital backbone that unifies
            oceanographic, fisheries, taxonomic, otolith and molecular (eDNA)
            data into one platform for ecosystem modelling and sustainable
            fisheries management.
          </p>

          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary">
              Get Started (Login)
            </Link>

            <a href="#features" className="btn btn-outline">
              View Features
            </a>
          </div>

          <div className="hero-tags">
            <span className="tag">Oceanography</span>
            <span className="tag">Fisheries</span>
            <span className="tag">Molecular Biodiversity</span>
            <span className="tag">AI & Data Platform</span>
          </div>
        </div>


        <div className="hero-card">
          <h2>Why this platform?</h2>
          <p>
            CMLRE manages massive, siloed datasets: physical, chemical and
            biological oceanography, fish abundance and taxonomy, otolith
            morphology, and environmental DNA (eDNA). Integrating these streams
            is critical for:
          </p>

          <ul>
            <li>Real-time ecosystem health monitoring</li>
            <li>Predicting fish distribution & stock dynamics</li>
            <li>Evidence-based conservation & blue economy planning</li>
          </ul>
        </div>
      </section>

      {/* New two-column section: left = map (reduced width), right = content */}
      <section style={{ marginTop: 24 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          {/* Left: map container — we set widthPercent via prop to control map width */}
          <div style={{ flex: "0 0 55%", minWidth: 260 }}>
            <ScrollableIndiaCoastlineMap height="420px" widthPercent={100} />
          </div>

          {/* Right: placeholder for filters / legend / cards
          <aside style={{ flex: "1 1 45%", color: "#e5e7eb" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 8 }}>
              <h3 style={{ marginTop: 0 }}>Controls & Filters</h3>
              <p style={{ marginBottom: 12, opacity: 0.9 }}>
                Add your layer toggles, expedition selectors, date filters or legends here.
              </p>

              <div style={{ display: "grid", gap: 8 }}>
                <label style={{ fontSize: 13 }}>
                  <input type="checkbox" defaultChecked /> Show expedition markers
                </label>
                <label style={{ fontSize: 13 }}>
                  <input type="checkbox" /> Show coastal polyline
                </label>
                <label style={{ fontSize: 13 }}>
                  <input type="checkbox" /> Show EEZ boundaries
                </label>
              </div> */}

              {/* <div style={{ marginTop: 12 }}>
                <Link to="/visualizations" className="btn btn-outline">Open Visualizations</Link>
              </div>
            </div>
          </aside> */}
        </div>
      </section>

      <section id="features" className="section section-alt">
        <h2>Core Capabilities</h2>
        <p className="section-text">
          The AI-driven platform will act as a national marine data backbone for
          India, enabling cross-domain analytics and decision support.
        </p>

        <div className="card-grid">
          <div className="card">
            <h3>Unified Data Ingestion</h3>
            <p>
              Streamlines all marine datasets into one unified pipeline.
            </p>

            <p className="tagline highlight">
                <i> One ocean of data, one seamless flow. </i>
            </p>
          </div>

          <div className="card">
            <h3>Metadata & Standards</h3>
            <p>
              Ensures globally compatible, metadata-rich scientific records.
            </p>

            <p className="tagline highlight">
                <i> Data that the world instantly understands.</i>
            </p>
          </div>

          <div className="card">
            <h3>AI Analytics & Modelling</h3>
            <p>
              AI uncovers trends, patterns, and ecosystem signals.
            </p>

            <p className="tagline highlight">
                <i> Let AI predict what the ocean whispers.</i>
            </p>
          </div>

          <div className="card">
            <h3>Interactive Visualisation</h3>
              <p>Beautiful dashboards for fast, intuitive exploration.</p>

              <p className="tagline highlight">
                <i> See the science come alive in a glance. </i>
              </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Specialised Scientific Modules</h2>

        <div className="card-grid">
          <div className="card card-outline">
            <h3>Taxonomy & Species ID</h3>
            <p>
              Quickly identify and explore marine species.
            </p>

            <p className="tagline highlight">
              <i>
                Tiny bones, big secrets — decode them instantly.
              </i>
            </p>
          </div>

          <div className="card card-outline">
            <h3>Otolith Morphology</h3>
            <p>
              Analyze otolith images to infer stock structure.
            </p>

            <p className="tagline highlight">
              <i> Small bones, big insights. </i>
            </p>
          </div>

          <div className="card card-outline">
            <h3>Molecular & eDNA Hub</h3>
            <p>
              Decode biodiversity using barcode and eDNA data.
            </p>

            <p className="tagline highlight>"> 
              <i>
                Discover life you can’t see — through DNA.
              </i>
            </p>
          </div>
        </div>
      </section>

      <section className="section section-cta">
        <div className="cta-inner">
          <h2>Build the next-generation marine data backbone for India</h2>
          <p>
            Empower scientists, conservationists, and policymakers with a
            unified platform for holistic marine ecosystem assessment.
          </p>

          <Link to="/login" className="btn btn-primary">
            Login to Prototype
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
