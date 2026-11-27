import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import { ProtectedRoute, GuestRoute } from "./routes/RouteGuards.jsx";
import AuthCallback from "./pages/AuthCallback";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />


      
      <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
    
  );
}