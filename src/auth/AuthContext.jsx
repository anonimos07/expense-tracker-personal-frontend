import { createContext, useContext, useState } from "react";
import api from "./Axios.jsx";

const AuthContext = createContext(null);

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const saveSession = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/login", { email, password });
    saveSession(data);
  };

  const register = async (payload) => {
    const { data } = await api.post("/register", payload);
    saveSession(data);
  };

  // Used by the Google OAuth callback: the backend gives us a token,
  // we fetch the user with it, then save the session like a normal login.
  const loginWithToken = async (newToken) => {
    const { data } = await api.get("/user", {
      headers: { Authorization: `Bearer ${newToken}` },
    });
    saveSession({ user: data, token: newToken });
    return data;
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, loginWithToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);