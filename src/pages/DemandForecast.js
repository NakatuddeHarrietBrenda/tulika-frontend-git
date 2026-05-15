import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { FaBrain, FaHistory } from "react-icons/fa";
import "../styles/global.css";

function DemandForecast() {
  const [data, setLoadingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/demand-forecast")
      .then(res => setLoadingData(res.data))
      .catch(() => setError("Failed to load forecasting data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading"><div className="spinner" /><p>Calculating predictions...</p></div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Travel Demand Forecast</h1>
        <p className="page-sub">Predicting future travel volume using Linear Regression</p>
      </div>

      <div className="stat-cards">
        <div className="stat-card" style={{ borderTop: "3px solid #6366f1" }}>
          <div className="stat-icon" style={{ color: "#6366f1" }}><FaBrain /></div>
          <div className="stat-info">
            <p className="stat-label">Model Reliability (R²)</p>
            <h3 className="stat-value">{data.model_r2 ? (data.model_r2 * 100).toFixed(1) + "%" : "Calculating..."}</h3>
          </div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid #22c55e" }}>
          <div className="stat-icon" style={{ color: "#22c55e" }}><FaHistory /></div>
          <div className="stat-info">
            <p className="stat-label">Historical Samples</p>
            <h3 className="stat-value">{data.monthly_demand.length} Months</h3>
          </div>
        </div>
      </div>

      <div className="charts-row">
        {/* Monthly Volume */}
        <div className="chart-card" style={{ flex: 1.5 }}>
          <h3 className="chart-title">Historical Travel Volume (People)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthly_demand}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total_people" name="Total People" stroke="#22c55e" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Destination Demand */}
        <div className="chart-card" style={{ flex: 1 }}>
          <h3 className="chart-title">Top Demand by Destination</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.demand_by_destination}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="destination" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total_people" name="Volume" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card wide" style={{ marginTop: "24px" }}>
        <h3 className="chart-title">ML Predictions for Active Packages</h3>
        <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>
          Based on price and popularity trends, our model predicts the following group sizes for each package.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Destination</th>
                <th>Package Price (USD)</th>
                <th>Popularity Index</th>
                <th>Predicted Group Size</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {data.package_predictions.map((p, i) => (
                <tr key={i}>
                  <td><strong>{p.destination}</strong></td>
                  <td>{p.price.toLocaleString()}</td>
                  <td>{p.popularity}/10</td>
                  <td>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "#6366f1" }}>{p.predicted_group_size} people</span>
                  </td>
                  <td>
                    <div style={{ width: "100%", background: "rgba(255,255,255,0.05)", height: "8px", borderRadius: "4px" }}>
                      <div style={{ width: `${(p.popularity * 10)}%`, background: "#22c55e", height: "100%", borderRadius: "4px" }} />
                    </div>
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

export default DemandForecast;
