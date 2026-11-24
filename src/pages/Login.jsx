import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import AuthShell from "../auth/AuthShell.jsx";
import GoogleButtons from "../components/GoogleButtons";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      const res = err.response;
      if (res?.status === 422) setFieldErrors(res.data.errors || {});
      setError(
        res?.data?.message || "Can't reach the server. Check that your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Log in to see your expenses.">
      <form onSubmit={onSubmit} noValidate>
        {error && <div className="alert" role="alert">{error}</div>}

        <label className="field">
          <span>Username</span>
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            autoComplete="username"
            required
          />
          {fieldErrors.username && <small>{fieldErrors.username[0]}</small>}
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            autoComplete="current-password"
            required
          />
          {fieldErrors.password && <small>{fieldErrors.password[0]}</small>}
        </label>

        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="divider"><span>or</span></div>

      <GoogleButtons label="Log in with Gmail" />
      <GoogleButtons label="Sign up with Gmail" />

      <p className="auth__switch">
        New here?{" "}
        <Link to="/register" className="btn btn--outline">Create an account</Link>
      </p>
    </AuthShell>
  );
}