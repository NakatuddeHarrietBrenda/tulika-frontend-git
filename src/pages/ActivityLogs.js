import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaHistory, FaUserShield, FaClock, FaDesktop } from "react-icons/fa";
import "../styles/global.css";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/activity-logs")
      .then(res => setLogs(res.data))
      .catch(() => setError("Failed to load activity logs"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading"><div className="spinner" /><p>Fetching audit trails...</p></div>;
  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">System Activity Logs</h1>
        <p className="page-sub">Monitoring dashboard access and authentication events</p>
      </div>

      <div className="chart-card wide">
        <h3 className="chart-title"><FaHistory style={{ color: "#6366f1" }} /> Recent Activity</h3>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th><FaUserShield /> User</th>
                <th>Action</th>
                <th><FaClock /> Timestamp</th>
                <th><FaDesktop /> IP Address</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log, i) => (
                  <tr key={i}>
                    <td><strong>{log.user}</strong></td>
                    <td>
                      <span className="badge" style={{ 
                        background: log.action.includes("FAILED") ? "#ef444420" : "#22c55e20",
                        color: log.action.includes("FAILED") ? "#ef4444" : "#22c55e"
                      }}>
                        {log.action}
                      </span>
                    </td>
                    <td>{log.timestamp}</td>
                    <td><code>{log.ip || "Unknown"}</code></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                    No activity logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ActivityLogs;
