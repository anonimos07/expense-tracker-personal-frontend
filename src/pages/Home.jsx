import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Placeholder: replace with your dashboard
export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="home">
      <h1>Hi, {user?.name || user?.username}</h1>
      <p>You're logged in. Your expense dashboard goes here.</p>
      <button className="btn btn--outline" onClick={onLogout}>Log out</button>
    </main>
  );
}