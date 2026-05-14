import { useState } from "react";
import api from "../api/axios";
import { FaSmile, FaRegMeh, FaFrown, FaRobot, FaArrowRight } from "react-icons/fa";
import "../styles/global.css";

function Sentiment() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      setError("Please enter some review text to analyze.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await api.post("/predict-sentiment", { text });
      setResult(res.data);
    } catch (err) {
      setError("Analysis failed. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const getEmoji = (sentiment) => {
    switch (sentiment) {
      case "Positive": return <FaSmile style={{ color: "#22c55e", fontSize: "48px" }} />;
      case "Negative": return <FaFrown style={{ color: "#ef4444", fontSize: "48px" }} />;
      default: return <FaRegMeh style={{ color: "#94a3b8", fontSize: "48px" }} />;
    }
  };

  const getBadgeColor = (sentiment) => {
    switch (sentiment) {
      case "Positive": return { bg: "#22c55e20", text: "#22c55e" };
      case "Negative": return { bg: "#ef444420", text: "#ef4444" };
      default: return { bg: "#94a3b820", text: "#94a3b8" };
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Sentiment Analysis</h1>
        <p className="page-sub">Using NLP to understand customer feedback and emotions</p>
      </div>

      <div className="charts-row">
        {/* Input Card */}
        <div className="chart-card" style={{ flex: 1.5 }}>
          <h3 className="chart-title">Customer Feedback Analysis</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
            Paste a customer review below to detect the sentiment automatically.
          </p>
          
          <textarea
            placeholder="e.g. The tour guide Arnold was absolutely amazing! We had a wonderful time exploring Murchison Falls."
            style={{ 
              width: "100%", 
              height: "200px", 
              background: "var(--bg-main)", 
              border: "1px solid var(--border)", 
              borderRadius: "12px", 
              padding: "20px", 
              color: "var(--text-main)", 
              fontSize: "16px",
              lineHeight: "1.6",
              resize: "none",
              outline: "none",
              marginBottom: "20px"
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button 
            className={`btn-primary ${loading ? "loading" : ""}`}
            style={{ 
              width: "100%", 
              height: "50px", 
              borderRadius: "12px", 
              background: "var(--primary)", 
              color: "white", 
              border: "none", 
              cursor: "pointer", 
              fontWeight: 700, 
              fontSize: "16px",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              gap: "10px" 
            }}
            onClick={analyzeSentiment}
            disabled={loading}
          >
            {loading ? "Processing..." : <><FaRobot /> Analyze Sentiment <FaArrowRight /></>}
          </button>
          
          {error && <p style={{ color: "#ef4444", marginTop: "15px", textAlign: "center" }}>{error}</p>}
        </div>

        {/* Result Card */}
        <div className="chart-card" style={{ flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <h3 className="chart-title">Analysis Result</h3>
          
          {result ? (
            <div className="animate-fade-in" style={{ padding: "20px" }}>
              <div style={{ marginBottom: "20px" }}>
                {getEmoji(result.sentiment)}
              </div>
              <div style={{ 
                background: getBadgeColor(result.sentiment).bg, 
                color: getBadgeColor(result.sentiment).text,
                padding: "8px 24px",
                borderRadius: "30px",
                fontSize: "24px",
                fontWeight: 800,
                marginBottom: "15px"
              }}>
                {result.sentiment}
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                Detected using: <strong style={{ color: "var(--text-main)" }}>{result.method}</strong>
              </p>
              
              <div style={{ marginTop: "30px", padding: "15px", background: "var(--border)", borderRadius: "10px", fontSize: "13px", color: "var(--text-muted)" }}>
                <p>This result is based on pre-trained NLP classification or rule-based heuristics depending on available training data.</p>
              </div>
            </div>
          ) : (
            <div style={{ opacity: 0.3, padding: "40px" }}>
              <FaRobot style={{ fontSize: "60px", color: "#94a3b8", marginBottom: "20px" }} />
              <p>Waiting for analysis...</p>
            </div>
          )}
        </div>
      </div>

      <div className="activity-card" style={{ marginTop: "24px" }}>
        <h3 className="chart-title">How it works</h3>
        <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
          The system uses a <strong>TF-IDF Vectorizer</strong> to convert text into numerical features, which are then passed through a <strong>Logistic Regression</strong> classifier. If the dataset has insufficient examples for a specific sentiment, it falls back to a sophisticated rule-based analysis to ensure accuracy.
        </p>
      </div>
    </div>
  );
}

export default Sentiment;