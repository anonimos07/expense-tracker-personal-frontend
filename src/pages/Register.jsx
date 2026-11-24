import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthShell from "../components/AuthShell";
import GoogleButtons from "../components/GoogleButtons";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
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
      await register(form);
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

  const fields = [
    ["name", "Full name", "text", "name"],
    ["username", "Username", "text", "username"],
    ["email", "Email", "email", "email"],
    ["password", "Password", "password", "new-password"],
    ["password_confirmation", "Confirm password", "password", "new-password"],
  ];

  return (
    <AuthShell title="Create your account" subtitle="Start tracking in under a minute.">
      <form onSubmit={onSubmit} noValidate>
        {error && <div className="alert" role="alert">{error}</div>}

        {fields.map(([name, label, type, auto]) => (
          <label className="field" key={name}>
            <span>{label}</span>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={onChange}
              autoComplete={auto}
              required
            />
            {fieldErrors[name] && <small>{fieldErrors[name][0]}</small>}
          </label>
        ))}

        <button type="submit" className="btn btn--primary" disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <div className="divider"><span>or</span></div>

      <GoogleButtons label="Sign up with Gmail" />

      <p className="auth__switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </AuthShell>
  );
}