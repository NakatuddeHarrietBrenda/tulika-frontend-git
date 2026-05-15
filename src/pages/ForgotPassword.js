import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import "../styles/Login.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: Code & Password
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestCode = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);
    try {
      await api.post("/forgot-password", { email });
      toast.success("Reset code sent to your email!");
      setStep(2);
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to send reset code.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!code || !newPassword) {
      toast.error("Please enter both the code and your new password");
      return;
    }
    setLoading(true);
    try {
      await api.post("/reset-password", { email, code, new_password: newPassword });
      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      const msg = err.response?.data?.error || "Invalid code or reset failed.";
      toast.error(msg);
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
            style={{ width: "120px", height: "auto", borderRadius: "12px", marginBottom: "15px", border: "2px solid rgba(34, 197, 94, 0.3)" }} 
          />
          <h1 className="login-title" style={{ color: "var(--text-logo)" }}>
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h1>
          <p className="login-subtitle">
            {step === 1 
              ? "Enter your email to receive a 6-digit reset code" 
              : "Enter the code sent to your email and your new password"}
          </p>
        </div>

        <div className="login-form">
          {step === 1 ? (
            <>
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                className={`login-btn ${loading ? "loading" : ""}`}
                onClick={handleRequestCode}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </>
          ) : (
            <>
              <div className="input-group">
                <label>6-Digit Code</label>
                <input
                  type="text"
                  placeholder="000000"
                  maxLength="6"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button
                className={`login-btn ${loading ? "loading" : ""}`}
                onClick={handleResetPassword}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Update Password"}
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => setStep(1)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', width: '100%', marginTop: '10px', fontSize: '14px' }}
              >
                Didn't get a code? Try again
              </button>
            </>
          )}

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
