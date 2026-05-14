import { useState } from "react";
import api from "../api/axios";
import { FaLightbulb, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaMoneyBillWave } from "react-icons/fa";
import "../styles/global.css";

function Recommend() {
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    "Wildlife Safari", "Group Tour", "Cultural Tour", "Luxury Safari", 
    "Camping Safari", "Family Tour", "Beach Holiday", "City Tour", 
    "Nature and sanctuary", "Boat trip Adventure", "Mountain climbing", 
    "Gorilla trekking", "Primate Trekking", "Hiking and Coffee"
  ];

  const getRecommendations = async () => {
    if (!budget) {
      setError("Please enter a budget amount.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/recommend", { 
        budget: parseFloat(budget), 
        category: category 
      });
      setResults(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to fetch recommendations. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Personalized Recommendations</h1>
        <p className="page-sub">Suggesting the best tour packages based on your budget and preference</p>
      </div>

      <div className="chart-card wide" style={{ marginBottom: "24px", padding: "30px" }}>
        <div className="recommend-form" style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div className="input-group" style={{ flex: 1, minWidth: "200px" }}>
            <label style={{ color: "#94a3b8", marginBottom: "8px", display: "block" }}>Maximum Budget (UGX)</label>
            <div style={{ position: "relative" }}>
              <FaMoneyBillWave style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6366f1" }} />
              <input 
                type="number"
                placeholder="e.g. 5000" 
                style={{ paddingLeft: "40px", width: "100%", height: "45px" }}
                value={budget}
                onChange={(e) => setBudget(e.target.value)} 
              />
            </div>
          </div>

          <div className="input-group" style={{ flex: 1, minWidth: "200px" }}>
            <label style={{ color: "#94a3b8", marginBottom: "8px", display: "block" }}>Package Category (Optional)</label>
            <select 
              style={{ width: "100%", height: "45px" }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.sort().map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button 
            className={`btn-primary ${loading ? "loading" : ""}`}
            style={{ height: "45px", padding: "0 30px", borderRadius: "8px", background: "var(--primary)", color: "white", border: "none", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px" }}
            onClick={getRecommendations}
            disabled={loading}
          >
            {loading ? "Searching..." : <><FaSearch /> Find Packages</>}
          </button>
        </div>
        {error && <p style={{ color: "#ef4444", marginTop: "15px", fontSize: "14px" }}>{error}</p>}
      </div>

      <div className="results-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {results.length > 0 ? (
          results.map((r, i) => (
            <div className="stat-card" key={i} style={{ flexDirection: "column", alignItems: "flex-start", padding: "24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "15px", right: "15px", background: "#d4af3720", color: "#d4af37", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700 }}>
                {r["price-tier"]}
              </div>
              
              <h3 style={{ fontSize: "18px", color: "var(--text-main)", marginBottom: "12px" }}>{r.destination}</h3>
              
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>
                <FaMapMarkerAlt style={{ color: "#6366f1" }} />
                <span>{r.country}</span>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>
                <FaLightbulb style={{ color: "#f59e0b" }} />
                <span>{r.package_category}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "14px", marginBottom: "8px" }}>
                <FaCalendarAlt style={{ color: "#22c55e" }} />
                <span>Best: {r.besttimetovisit}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "15px", paddingTop: "15px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ color: "var(--text-main)", fontSize: "18px", fontWeight: 700 }}>
                  UGX {Number(r.price).toLocaleString()}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#f59e0b" }}>
                  <FaStar />
                  <span style={{ fontWeight: 600 }}>{r.popularity}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "50px", color: "#64748b" }}>
            <FaLightbulb style={{ fontSize: "40px", marginBottom: "15px", opacity: 0.5 }} />
            <p>Enter your budget to see our top-rated tour recommendations.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommend;