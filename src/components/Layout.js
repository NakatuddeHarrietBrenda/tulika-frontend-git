import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaChartPie, FaUsers, FaLightbulb, FaSmile, FaChartLine, 
  FaShieldAlt, FaChartBar, FaGlobe, FaSignOutAlt, FaCalendarAlt,
  FaSun, FaMoon 
} from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";
import "../styles/Dashboard.css";

function Layout({ children }) {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-logo">
          {/* Logo Integration: Displaying the official brand asset in the side navigation */}
          <img 
            src="/images/logo-image.jpg" 
            alt="Logo" 
            style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} 
          />
          <span style={{ color: "var(--text-logo)", fontWeight: 800 }}>Tulika Admin</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaChartPie /> Dashboard
          </NavLink>
          
          <div className="nav-section">ML MODELS</div>
          
          <NavLink to="/segmentation" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaUsers /> Segments
          </NavLink>
          <NavLink to="/demand-forecast" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaChartLine /> Forecast
          </NavLink>
          <NavLink to="/recommend" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaLightbulb /> Recommend
          </NavLink>
          <NavLink to="/sentiment" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaSmile /> Sentiment
          </NavLink>
          
          <div className="nav-section">BUSINESS</div>
          
          <NavLink to="/top-destinations" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaGlobe /> Hotspots
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaChartBar /> Analytics
          </NavLink>
          <NavLink to="/model-evaluation" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaShieldAlt /> Model Audit
          </NavLink>
        </nav>

        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="main-content">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-left">
            <FaCalendarAlt style={{ color: "var(--primary-glow)" }} />
            <span>{today}</span>
          </div>
          
          <div className="topbar-right" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* THEME TOGGLE: Allowing users to switch between Light/Dark brand modes */}
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              style={{ 
                background: "var(--bg-card)", 
                border: "1px solid var(--border)", 
                color: "var(--accent)", 
                padding: "8px", 
                borderRadius: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px"
              }}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <div className="admin-profile">
              <div className="avatar">A</div>
              <div className="admin-info">
                <p className="admin-name">Admin User</p>
                <p className="admin-role">Harriet Nakatudde</p>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="content-body">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;