import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import "../styles/Login.css"; // Reuse the login styles

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);
    try {
      await api.post("/forgot-password", { email });
      toast.success("If the email exists, a reset link was sent.", { duration: 5000 });
      // We don't navigate right away so they can read the toast, but let's give them a button to go back
    } catch {
      toast.error("Failed to request password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <Toaster position="top-center" />
      <div className="login-card">
        <div className="login-logo">
          <img 
            src="/images/logo-image.jpg" 
            alt="Tulika Tours Logo" 
            style={{ width: "120px", height: "auto", borderRadius: "12px", marginBottom: "15px", border: "2px solid rgba(250, 204, 21, 0.3)" }} 
          />
          <h1 className="login-title" style={{ color: "var(--text-logo)" }}>Forgot Password</h1>
          <p className="login-subtitle">Enter your email to receive a reset link</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <button
            className={`login-btn ${loading ? "loading" : ""}`}
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <span 
              onClick={() => navigate("/")}
              style={{ color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
            >
              Back to Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
