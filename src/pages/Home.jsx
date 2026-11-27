import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const { state } = useLocation();



  return (
    <main className="home">
     {state?.oauthSuccess && (
        <div className="alert alert--success" role="status">
          Signed in with Google successfully.
        </div>
      )}
      <h1>Hi, {user?.name || user?.username}</h1>
      <p>You're logged in. Your expense dashboard goes here.</p>
      <button className="btn btn--outline" onClick={onLogout}>Log out</button>
    </main>
  );
}