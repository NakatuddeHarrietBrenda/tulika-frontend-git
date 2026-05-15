import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  FaChartPie, FaUsers, FaLightbulb, FaSmile, FaChartLine, 
  FaShieldAlt, FaChartBar, FaGlobe, FaSignOutAlt, FaCalendarAlt,
  FaSun, FaMoon, FaBars, FaTimes, FaHistory 
} from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";
import "../styles/Dashboard.css";

function Layout({ children }) {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="app-shell">
      {/* MOBILE OVERLAY */}
      {mobileMenuOpen && (
        <div 
          className="mobile-overlay" 
          onClick={closeMobileMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 95,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* SIDEBAR */}
      <div className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-logo">
          <img 
            src="/images/logo-image.jpg" 
            alt="Logo" 
            style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} 
          />
          <span style={{ color: "var(--text-logo)", fontWeight: 800 }}>Tulika Admin</span>
          
          <button 
            className="mobile-close-btn"
            onClick={closeMobileMenu}
            style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: '24px', marginLeft: 'auto' }}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaChartPie /> Dashboard
          </NavLink>
          
          <div className="nav-section">ML MODELS</div>
          
          <NavLink to="/segmentation" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaUsers /> Segments
          </NavLink>
          <NavLink to="/demand-forecast" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaChartLine /> Forecast
          </NavLink>
          <NavLink to="/recommend" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaLightbulb /> Recommend
          </NavLink>
          <NavLink to="/sentiment" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaSmile /> Sentiment
          </NavLink>
          
          <div className="nav-section">BUSINESS</div>
          
          <NavLink to="/top-destinations" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaGlobe /> Hotspots
          </NavLink>
          <NavLink to="/analytics" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaChartBar /> Analytics
          </NavLink>
          <NavLink to="/model-evaluation" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaShieldAlt /> Model Audit
          </NavLink>

          <div className="nav-section">SYSTEM</div>
          
          <NavLink to="/activity-logs" onClick={closeMobileMenu} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <FaHistory /> Activity Logs
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
            <button 
              className="mobile-toggle-btn"
              onClick={toggleMobileMenu}
              style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: '24px', marginRight: '15px', cursor: 'pointer', display: 'none' }}
            >
              <FaBars />
            </button>
            <FaCalendarAlt style={{ color: "var(--primary-glow)" }} />
            <span>{today}</span>
          </div>
          
          <div className="topbar-right" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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

      <style>{`
        @media (max-width: 1024px) {
          .mobile-toggle-btn, .mobile-close-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

export default Layout;