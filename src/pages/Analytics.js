import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { FaChartBar, FaVenusMars, FaBirthdayCake, FaCreditCard } from "react-icons/fa";
import "../styles/global.css";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#0ea5e9", "#d4af37", "#ec4899", "#8b5cf6"];

function Analytics() {
  const [revData, setRevData] = useState(null);
  const [demoData, setDemoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get("/revenue-analysis"),
      api.get("/customer-demographics")
    ])
      .then(([rev, demo]) => {
        setRevData(rev.data);
        setDemoData(demo.data);
      })
      .catch(() => setError("Failed to load analytical data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading"><div className="spinner" /><p>Analyzing business data...</p></div>;
  if (error) return <div className="page-error">{error}</div>;

  const ageChartData = Object.entries(demoData.age_distribution).map(([age, count]) => ({ age, count }));
  const genderChartData = Object.entries(demoData.gender_distribution).map(([gender, value]) => ({ name: gender, value }));
  const payChartData = revData.by_payment_method.map(m => ({ name: m.method, value: m.revenue }));

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Business Analytics</h1>
        <p className="page-sub">Comprehensive overview of revenue, payments, and customer demographics</p>
      </div>

      <div className="charts-row">
        {/* Revenue by Month */}
        <div className="chart-card wide">
          <h3 className="chart-title"><FaChartBar style={{ color: "#6366f1" }} /> Monthly Revenue (UGX)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revData.monthly_revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => (v / 1000000).toFixed(0) + "M"} />
              <Tooltip formatter={(v) => `UGX ${Number(v).toLocaleString()}`} />
              <Bar dataKey="revenue" name="Revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="charts-row">
        {/* Age Distribution */}
        <div className="chart-card">
          <h3 className="chart-title"><FaBirthdayCake style={{ color: "#f59e0b" }} /> Age Groups</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="Customers" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Split */}
        <div className="chart-card">
          <h3 className="chart-title"><FaVenusMars style={{ color: "#22c55e" }} /> Gender Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={genderChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                {genderChartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods */}
        <div className="chart-card">
          <h3 className="chart-title"><FaCreditCard style={{ color: "#0ea5e9" }} /> Payment Methods</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={payChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {payChartData.map((_, i) => <Cell key={i} fill={COLORS[(i + 3) % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => `UGX ${Number(v).toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="activity-card" style={{ marginTop: "24px" }}>
        <h3 className="chart-title">Customer Preferences</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
          {Object.entries(demoData.travel_preferences).map(([pref, count], i) => (
            <div key={i} style={{ padding: "12px", background: "var(--border)", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{pref}</span>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)" }}>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
