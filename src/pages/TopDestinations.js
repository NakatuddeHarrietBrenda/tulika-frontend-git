import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaStar, FaGlobe, FaSortAmountDown } from "react-icons/fa";
import "../styles/global.css";

function TopDestinations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/top-destinations")
      .then(res => setData(res.data))
      .catch(() => setError("Failed to load top destinations"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading"><div className="spinner" /><p>Exploring destinations...</p></div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Top Rated Destinations</h1>
        <p className="page-sub">Discover the most popular travel hotspots based on customer data</p>
      </div>

      <div className="chart-card wide" style={{ marginBottom: "24px", padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#d4af37", marginBottom: "15px" }}>
          <FaSortAmountDown />
          <h3 className="chart-title" style={{ margin: 0 }}>Ranked by Popularity Index</h3>
        </div>
        
        <div className="destinations-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {data.map((dest, i) => (
            <div key={i} className="stat-card" style={{ 
              flexDirection: "column", 
              alignItems: "flex-start", 
              padding: "20px",
              borderLeft: i < 3 ? "4px solid #d4af37" : "1px solid rgba(255,255,255,0.05)",
              background: i < 3 ? "rgba(212, 175, 55, 0.05)" : "rgba(255,255,255,0.02)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "10px" }}>
                <span style={{ fontSize: "24px", fontWeight: 900, color: i < 3 ? "#d4af37" : "#334155", fontStyle: "italic" }}>#{i + 1}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#f59e0b", background: "rgba(245, 158, 11, 0.1)", padding: "2px 8px", borderRadius: "10px", fontSize: "14px", fontWeight: 700 }}>
                  <FaStar /> {dest.popularity}
                </div>
              </div>

              <h2 style={{ fontSize: "20px", color: "var(--text-main)", margin: "0 0 5px 0" }}>{dest.destination}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6366f1", fontSize: "14px", fontWeight: 600, marginBottom: "15px" }}>
                <FaGlobe /> {dest.country} — {dest.city}
              </div>

              <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.05)", margin: "10px 0" }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "100%", marginTop: "5px" }}>
                <div>
                  <p style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px 0" }}>Category</p>
                  <p style={{ color: "var(--text-main)", fontSize: "13px", fontWeight: 600, margin: 0 }}>{dest.package_category}</p>
                </div>
                <div>
                  <p style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px 0" }}>Best Time</p>
                  <p style={{ color: "var(--text-main)", fontSize: "13px", fontWeight: 600, margin: 0 }}>{dest.besttimetovisit}</p>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <p style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px 0" }}>Price Tier</p>
                  <span className="badge" style={{ 
                    background: dest["price-tier"] === "Luxury" ? "#ef444420" : (dest["price-tier"] === "Medium" ? "#6366f120" : "#22c55e20"),
                    color: dest["price-tier"] === "Luxury" ? "#ef4444" : (dest["price-tier"] === "Medium" ? "#6366f1" : "#22c55e"),
                    fontSize: "11px"
                  }}>{dest["price-tier"]}</span>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <p style={{ color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px 0" }}>Estimate</p>
                  <p style={{ color: "#22c55e", fontSize: "14px", fontWeight: 800, margin: 0 }}>UGX {dest.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopDestinations;
