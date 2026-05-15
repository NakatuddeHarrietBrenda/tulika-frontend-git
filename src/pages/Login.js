import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back, Admin!");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") login(); };

  return (
    <div className="login-bg">
      <Toaster position="top-center" />

      <div className="login-card">
        {/* LOGO ANALYSIS: Using the official brand identity found in /images/logo-image.jpg */}
        <div className="login-logo">
          <img
            src="/images/logo-image.jpg"
            alt="Tulika Tours Logo"
            style={{ width: "120px", height: "auto", borderRadius: "12px", marginBottom: "15px", border: "2px solid rgba(34, 197, 94, 0.3)" }}
          />
          <h1 className="login-title" style={{ color: "var(--text-logo)" }}>Tulika Tours</h1>
          <p className="login-subtitle">Data-Driven Analytical System</p>
        </div>

        {/* Form */}
        <div className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              // placeholder="tulikatours@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="current-password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            className={`login-btn ${loading ? "loading" : ""}`}
            onClick={login}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="login-hint">
            Enter login password <strong> </strong>
          </p>

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <span
              onClick={() => navigate("/forgot-password")}
              style={{ color: 'var(--primary)', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
            >
              Forgot Password?
            </span>
          </div>


        </div>

        <p className="login-footer">
          TULIKA TOURS &amp; TRAVELS &nbsp;|&nbsp; CAR RENTAL
        </p>
      </div>
    </div>
  );
}

export default Login;