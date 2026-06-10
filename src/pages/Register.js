import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setLoading(true);
    try {
      const res = await api.post("/register", { email, password });
      toast.success(res.data?.message || "Registration successful! Please log in.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Registration failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="login-bg">
      <Toaster position="top-center" />

      <div className="login-card">
        <div className="login-logo">
          <img
            src="/images/logo-image.jpg"
            alt="Tulika Tours Logo"
            style={{ width: "120px", height: "auto", borderRadius: "12px", marginBottom: "15px", border: "2px solid rgba(34, 197, 94, 0.3)" }}
          />
          <h1 className="login-title" style={{ color: "var(--text-logo)" }}>Tulika Tours</h1>
          <p className="login-subtitle">Create a Data-Driven Account</p>
        </div>

        {/* Form */}
        <div className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
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
                autoComplete="new-password"
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

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="new-password"
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            className={`login-btn ${loading ? "loading" : ""}`}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <span
              onClick={() => navigate("/")}
              style={{ color: "var(--primary)", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}
            >
              Already have an account? Sign In
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

export default Register;
