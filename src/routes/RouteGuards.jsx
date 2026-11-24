import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Only logged-in users can see these pages
export function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

// Logged-in users skip login/register and go straight home
export function GuestRoute({ children }) {
  const { token } = useAuth();
  return token ? <Navigate to="/" replace /> : children;
}