import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, ResponsiveContainer
} from "recharts";
import { FaUsers, FaBox, FaShoppingCart, FaStar, FaMoneyBillWave } from "react-icons/fa";
import "../styles/Dashboard.css";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444", "#6366f1", "#0ea5e9"];

function StatCard({ icon, label, value, color }) {
  return (
    <div className="stat-card" style={{ borderTop: `3px solid ${color}` }}>
      <div className="stat-icon" style={{ color }}>{icon}</div>
      <div className="stat-info">
        <p className="stat-label">{label}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );
}

function Dashboard() {
  const [overview, setOverview]   = useState({});
  const [summary,  setSummary]    = useState({});
  const [trends,   setTrends]     = useState([]);
  const [topDest,  setTopDest]    = useState({});
  const [loading,  setLoading]    = useState(true);
  const [error,    setError]      = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get("/overview"),
      api.get("/dashboard-summary"),
      api.get("/booking-trends"),
      api.get("/top-destinations")
    ])
      .then(([ov, sm, tr, td]) => {
        setOverview(ov.data);
        setSummary(sm.data);
        setTrends(tr.data || []);
        const destObj = {};
        (td.data || []).slice(0, 7).forEach(d => { destObj[d.destination] = d.popularity; });
        setTopDest(destObj);
      })
      .catch(() => setError("Failed to load dashboard data. Is the Flask server running?"))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (n) => {
    if (!n && n !== 0) return "—";
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000)     return `${(n / 1_000_000).toFixed(1)}M`;
    return Number(n).toLocaleString();
  };

  const statusData = [
    { name: "Confirmed", value: summary.confirmed_bookings || 0 },
    { name: "Pending",   value: summary.pending_bookings   || 0 },
    { name: "Canceled",  value: summary.canceled_bookings  || 0 }
  ];

  const destChartData = Object.entries(topDest).map(([name, pop]) => ({
    name: name.length > 16 ? name.slice(0, 15) + "…" : name,
    popularity: parseFloat(pop) || 0
  }));

  if (loading) return <div className="page-loading"><div className="spinner" /><p>Loading dashboard...</p></div>;
  if (error)   return <div className="page-error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-sub">Tulika Tours and Travels — Analytics Summary</p>
      </div>

      {/* STAT CARDS */}
      <div className="stat-cards">
        <StatCard icon={<FaBox />}           label="Total Packages"  value={fmt(overview.total_packages)}  color="#6366f1" />
        <StatCard icon={<FaUsers />}         label="Total Customers" value={fmt(overview.total_customers)} color="#22c55e" />
        <StatCard icon={<FaShoppingCart />}  label="Total Bookings"  value={fmt(overview.total_bookings)}  color="#f59e0b" />
        <StatCard icon={<FaMoneyBillWave />} label="Total Revenue"   value={`UGX ${fmt(overview.total_revenue)}`} color="#0ea5e9" />
        <StatCard icon={<FaStar />}          label="Avg Rating"      value={overview.average_rating ? overview.average_rating.toFixed(2) : "—"} color="#d4af37" />
      </div>

      {/* CHARTS ROW 1 */}
      <div className="charts-row">

        {/* Booking Status Pie */}
        <div className="chart-card">
          <h3 className="chart-title">Booking Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={90} label={({ name, value }) => `${name}: ${value}`}>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Trends Line */}
        <div className="chart-card">
          <h3 className="chart-title">Monthly Booking Trends</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* CHARTS ROW 2 */}
      <div className="charts-row">
        {/* Top Destinations Bar */}
        <div className="chart-card wide">
          <h3 className="chart-title">Top Destinations by Popularity</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={destChartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" width={140} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`${v}/10`, "Popularity"]} />
              <Bar dataKey="popularity" fill="#d4af37" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="activity-card">
        <h3 className="chart-title">Recent Activity</h3>
        <ul className="activity-list">
          <li>✔ {summary.confirmed_bookings} confirmed bookings in system</li>
          <li>⏳ {summary.pending_bookings} bookings awaiting confirmation</li>
          <li>✖ {summary.canceled_bookings} canceled bookings</li>
          <li>💰 Average booking value: UGX {fmt(summary.avg_booking_value)}</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;