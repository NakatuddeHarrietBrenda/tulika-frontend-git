import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "../styles/global.css";

const SEGMENT_COLORS = { 0: "#22c55e", 1: "#d4af37", 2: "#6366f1" };
const SEGMENT_LABELS = { 0: "Budget Travelers", 1: "Luxury Clients", 2: "Frequent Travelers" };

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  return <circle cx={cx} cy={cy} r={6} fill={SEGMENT_COLORS[payload.segment] || "#888"} opacity={0.8} />;
};

function Segmentation() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    api.get("/clusters")
      .then(res => setData(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError("Failed to load segmentation data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading"><div className="spinner" /><p>Loading segments...</p></div>;
  if (error)   return <div className="page-error">{error}</div>;

  const counts = { 0: 0, 1: 0, 2: 0 };
  data.forEach(d => { if (d.segment !== undefined) counts[d.segment] = (counts[d.segment] || 0) + 1; });

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Customer Segmentation</h1>
        <p className="page-sub">K-Means Clustering — Price vs Popularity</p>
      </div>

      {/* Segment summary cards */}
      <div className="stat-cards" style={{ marginBottom: "24px" }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="stat-card" style={{ borderTop: `3px solid ${SEGMENT_COLORS[i]}` }}>
            <div className="stat-info">
              <p className="stat-label">{SEGMENT_LABELS[i]}</p>
              <h3 className="stat-value">{counts[i]} bookings</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Scatter Chart */}
      <div className="chart-card wide" style={{ marginBottom: "24px" }}>
        <h3 className="chart-title">Scatter Plot — Price vs Popularity by Segment</h3>
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="price"      name="Price (UGX)" type="number" label={{ value: "Price (UGX)", position: "insideBottom", offset: -5 }} />
            <YAxis dataKey="popularity" name="Popularity"  domain={[6, 10]} label={{ value: "Popularity", angle: -90, position: "insideLeft" }} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }}
              formatter={(val, name) => [name === "price" ? `UGX ${Number(val).toLocaleString()}` : val, name === "price" ? "Price" : "Popularity"]}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0]?.payload;
                return (
                  <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "10px 14px" }}>
                    <p style={{ color: SEGMENT_COLORS[d.segment], fontWeight: 700, marginBottom: 4 }}>{SEGMENT_LABELS[d.segment]}</p>
                    <p style={{ color: "#e2e8f0" }}>📍 {d.destination}</p>
                    <p style={{ color: "#94a3b8" }}>Price: UGX {Number(d.price).toLocaleString()}</p>
                    <p style={{ color: "#94a3b8" }}>Popularity: {d.popularity}/10</p>
                  </div>
                );
              }}
            />
            <Legend content={() => (
              <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 8 }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: 6, color: "#94a3b8", fontSize: 13 }}>
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: SEGMENT_COLORS[i], display: "inline-block" }} />
                    {SEGMENT_LABELS[i]}
                  </span>
                ))}
              </div>
            )} />
            <Scatter data={data} shape={<CustomDot />} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="chart-card wide">
        <h3 className="chart-title">Segment Details</h3>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr><th>Destination</th><th>Price (UGX)</th><th>Popularity</th><th>Segment</th></tr>
            </thead>
            <tbody>
              {data.slice(0, 20).map((item, i) => (
                <tr key={i}>
                  <td>{item.destination || "—"}</td>
                  <td>{Number(item.price).toLocaleString()}</td>
                  <td>{item.popularity}</td>
                  <td>
                    <span className="badge" style={{ background: SEGMENT_COLORS[item.segment] + "30", color: SEGMENT_COLORS[item.segment] }}>
                      {SEGMENT_LABELS[item.segment] || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Segmentation;