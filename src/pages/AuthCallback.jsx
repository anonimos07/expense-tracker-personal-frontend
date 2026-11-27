import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return; // StrictMode runs effects twice in dev
    handled.current = true;

    const hash = new URLSearchParams(window.location.hash.slice(1));
    const query = new URLSearchParams(window.location.search);
    const token = hash.get("token");
    const error = query.get("error");

    // Remove the token from the address bar and browser history right away
    window.history.replaceState(null, "", window.location.pathname);

    if (error || !token) {
      navigate("/login", {
        replace: true,
        state: { oauthError: error || "google_failed" },
      });
      return;
    }

    loginWithToken(token)
      .then(() => navigate("/", { replace: true, state: { oauthSuccess: true } }))
      .catch(() =>
        navigate("/login", { replace: true, state: { oauthError: "google_failed" } })
      );
  }, []);

  return <p>Signing you in with Google...</p>;
}