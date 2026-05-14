import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css"; // Reuse the login styles

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams(); // Extract token from URL

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please enter and confirm your new password");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/reset-password", { token, new_password: newPassword });
      toast.success("Password reset successfully! You can now log in.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to reset password.";
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
            style={{ width: "120px", height: "auto", borderRadius: "12px", marginBottom: "15px", border: "2px solid rgba(250, 204, 21, 0.3)" }} 
          />
          <h1 className="login-title" style={{ color: "var(--text-logo)" }}>Reset Password</h1>
          <p className="login-subtitle">Enter your new password below</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label>New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
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
            onClick={handleReset}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
