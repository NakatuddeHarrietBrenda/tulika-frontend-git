import { useEffect, useState } from "react";
import api from "../api/axios";
import { FaShieldAlt, FaBrain, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import "../styles/global.css";

function ModelEvaluation() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/model-evaluation")
      .then(res => setData(res.data))
      .catch(() => setError("Failed to load evaluation metrics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading"><div className="spinner" /><p>Evaluating models...</p></div>;
  if (error) return <div className="page-error">{error}</div>;

  const renderStatus = (status) => {
    if (status === "Trained" || status === "Active") {
      return <span className="badge" style={{ background: "#22c55e20", color: "#22c55e" }}><FaCheckCircle /> {status}</span>;
    }
    return <span className="badge" style={{ background: "#ef444420", color: "#ef4444" }}><FaExclamationTriangle /> {status}</span>;
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Model Evaluation & Metrics</h1>
        <p className="page-sub">Performance audit of the machine learning engine at Tulika Tours</p>
      </div>

      <div className="charts-row" style={{ flexWrap: "wrap" }}>
        {/* Segmentation */}
        <div className="chart-card" style={{ flex: "1 1 450px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="chart-title" style={{ margin: 0 }}><FaBrain style={{ color: "#6366f1" }} /> Customer Segmentation</h3>
            {renderStatus(data.segmentation.status)}
          </div>
          <div className="metrics-list">
            <div className="metric-item">
              <span className="metric-label">Algorithm</span>
              <span className="metric-value">{data.segmentation.model}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Silhouette Score</span>
              <span className="metric-value">{data.segmentation.silhouette_score ? data.segmentation.silhouette_score.toFixed(4) : "N/A"}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Inertia (Sum of Squares)</span>
              <span className="metric-value">{Math.round(data.segmentation.inertia).toLocaleString()}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Target Clusters</span>
              <span className="metric-value">{data.segmentation.n_clusters} Segments</span>
            </div>
          </div>
          <div style={{ marginTop: "20px", padding: "12px", background: "rgba(99, 102, 241, 0.1)", borderRadius: "8px", fontSize: "13px" }}>
            <strong>Insights:</strong> High silhouette score indicates well-separated clusters. {data.segmentation.n_samples} samples processed.
          </div>
        </div>

        {/* Demand Forecast */}
        <div className="chart-card" style={{ flex: "1 1 450px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="chart-title" style={{ margin: 0 }}><FaShieldAlt style={{ color: "#22c55e" }} /> Demand Forecasting</h3>
            {renderStatus(data.demand_forecast.status)}
          </div>
          <div className="metrics-list">
            <div className="metric-item">
              <span className="metric-label">Algorithm</span>
              <span className="metric-value">{data.demand_forecast.model}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">R² Score (Accuracy)</span>
              <span className="metric-value">{data.demand_forecast.r2_score ? (data.demand_forecast.r2_score * 100).toFixed(2) + "%" : "N/A"}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Predictors</span>
              <span className="metric-value">{data.demand_forecast.features.join(", ")}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Target Variable</span>
              <span className="metric-value">{data.demand_forecast.target}</span>
            </div>
          </div>
          <div style={{ marginTop: "20px", padding: "12px", background: "rgba(34, 197, 94, 0.1)", borderRadius: "8px", fontSize: "13px" }}>
            <strong>Insights:</strong> The model uses pricing and popularity as primary indicators for group size predictions.
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="chart-card" style={{ flex: "1 1 450px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="chart-title" style={{ margin: 0 }}><FaBrain style={{ color: "#ef4444" }} /> Sentiment NLP</h3>
            {renderStatus(data.sentiment_analysis.status)}
          </div>
          <div className="metrics-list">
            <div className="metric-item">
              <span className="metric-label">Pipeline</span>
              <span className="metric-value">{data.sentiment_analysis.model}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Reviews Analyzed</span>
              <span className="metric-value">{data.sentiment_analysis.n_reviews} Feedback items</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Classes Found</span>
              <span className="metric-value">{data.sentiment_analysis.classes_found.join(", ") || "None"}</span>
            </div>
          </div>
          <div style={{ marginTop: "20px", padding: "12px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "8px", fontSize: "13px", color: "#fca5a5" }}>
            <FaExclamationTriangle /> {data.sentiment_analysis.note}
          </div>
        </div>

        {/* Recommendation Engine */}
        <div className="chart-card" style={{ flex: "1 1 450px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="chart-title" style={{ margin: 0 }}><FaShieldAlt style={{ color: "#f59e0b" }} /> Recommendation Engine</h3>
            {renderStatus(data.recommendation.status)}
          </div>
          <div className="metrics-list">
            <div className="metric-item">
              <span className="metric-label">Strategy</span>
              <span className="metric-value">{data.recommendation.model}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Search Space</span>
              <span className="metric-value">{data.recommendation.n_packages} Active Packages</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Category Support</span>
              <span className="metric-value">{data.recommendation.categories.length} Different types</span>
            </div>
          </div>
          <div style={{ marginTop: "20px", padding: "12px", background: "rgba(245, 158, 11, 0.1)", borderRadius: "8px", fontSize: "13px" }}>
            <strong>Insights:</strong> Multi-criteria filtering ensures recommendations match both budget constraints and category preferences.
          </div>
        </div>
      </div>
      
      {/* Visualizations Section */}
      <div style={{ marginTop: "40px" }}>
        <h2 className="section-title" style={{ color: "white", marginBottom: "20px", fontSize: "22px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "10px" }}>
          Model Interpretability & Data Insights
        </h2>
        <div className="charts-row" style={{ flexWrap: "wrap", gap: "24px" }}>
          {/* Segmentation Plot */}
          <div className="chart-card" style={{ flex: "1 1 450px", display: "flex", flexDirection: "column" }}>
            <h3 className="chart-title">K-Means Customer Clusters</h3>
            <div style={{ background: "#0b1329", padding: "10px", borderRadius: "8px", textAlign: "center", marginBottom: "15px" }}>
              <img 
                src="/images/segmentation_clusters.png" 
                alt="K-Means Clusters" 
                style={{ maxWidth: "100%", height: "auto", borderRadius: "4px" }} 
              />
            </div>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>
              <strong>Description:</strong> Visual distribution of customers segmented into 3 distinct behavioral clusters based on package price and popularity index. Helpful for identifying targeted marketing strategies.
            </p>
          </div>

          {/* Demand Forecast Plot */}
          <div className="chart-card" style={{ flex: "1 1 450px", display: "flex", flexDirection: "column" }}>
            <h3 className="chart-title">Demand Forecast & Volume</h3>
            <div style={{ background: "#0b1329", padding: "10px", borderRadius: "8px", textAlign: "center", marginBottom: "15px" }}>
              <img 
                src="/images/demand_forecast.png" 
                alt="Demand Forecast" 
                style={{ maxWidth: "100%", height: "auto", borderRadius: "4px" }} 
              />
            </div>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>
              <strong>Description:</strong> Monthly visitor volume trend tracking historical tour demand. Used by the Linear Regression model to forecast future demand patterns.
            </p>
          </div>

          {/* Sentiment Distribution Plot */}
          <div className="chart-card" style={{ flex: "1 1 450px", display: "flex", flexDirection: "column" }}>
            <h3 className="chart-title">Reviews Sentiment Distribution</h3>
            <div style={{ background: "#0b1329", padding: "10px", borderRadius: "8px", textAlign: "center", marginBottom: "15px" }}>
              <img 
                src="/images/sentiment_distribution.png" 
                alt="Sentiment Distribution" 
                style={{ maxWidth: "100%", height: "auto", borderRadius: "4px" }} 
              />
            </div>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>
              <strong>Description:</strong> Breakdown of feedback sentiments (Positive, Neutral, Negative) computed from customer review text ratings. Crucial for assessing customer satisfaction.
            </p>
          </div>

          {/* Traveler Preferences Plot */}
          <div className="chart-card" style={{ flex: "1 1 450px", display: "flex", flexDirection: "column" }}>
            <h3 className="chart-title">Traveler Preference Distribution</h3>
            <div style={{ background: "#0b1329", padding: "10px", borderRadius: "8px", textAlign: "center", marginBottom: "15px" }}>
              <img 
                src="/images/eda_preferences.png" 
                alt="Traveler Preferences" 
                style={{ maxWidth: "100%", height: "auto", borderRadius: "4px" }} 
              />
            </div>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>
              <strong>Description:</strong> Exploratory analysis showing the distribution of traveler category preferences. Informs the recommendation engine on which package types are in highest demand.
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        .metrics-list { display: flex; flex-direction: column; gap: 12px; }
        .metric-item { display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; }
        .metric-label { color: #94a3b8; font-size: 14px; }
        .metric-value { color: white; font-weight: 600; font-size: 14px; }
        .badge { display: flex; alignItems: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }
      `}</style>
    </div>
  );
}

export default ModelEvaluation;
