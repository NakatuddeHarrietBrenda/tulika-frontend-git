import { Routes, Route } from "react-router-dom";
import Login          from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword  from "./pages/ResetPassword";
import Dashboard    from "./pages/Dashboard";
import Recommend    from "./pages/RecommendationComponent";
import Sentiment    from "./pages/SentimentAnalysisComponent";
import Segmentation from "./pages/Segmentation";
import DemandForecast    from "./pages/DemandForecast";
import ModelEvaluation   from "./pages/ModelEvaluation";
import Analytics         from "./pages/Analytics";
import TopDestinations   from "./pages/TopDestinations";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Layout         from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="/dashboard" element={
        <ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>
      } />
      <Route path="/segmentation" element={
        <ProtectedRoute><Layout><Segmentation /></Layout></ProtectedRoute>
      } />
      <Route path="/recommend" element={
        <ProtectedRoute><Layout><Recommend /></Layout></ProtectedRoute>
      } />
      <Route path="/sentiment" element={
        <ProtectedRoute><Layout><Sentiment /></Layout></ProtectedRoute>
      } />
      <Route path="/demand-forecast" element={
        <ProtectedRoute><Layout><DemandForecast /></Layout></ProtectedRoute>
      } />
      <Route path="/model-evaluation" element={
        <ProtectedRoute><Layout><ModelEvaluation /></Layout></ProtectedRoute>
      } />
      <Route path="/analytics" element={
        <ProtectedRoute><Layout><Analytics /></Layout></ProtectedRoute>
      } />
      <Route path="/top-destinations" element={
        <ProtectedRoute><Layout><TopDestinations /></Layout></ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;