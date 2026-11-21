import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const demoAdmin = {
  id: "admin-demo",
  name: "Admin Demo",
  email: "admin@elnetto.store",
  role: "admin",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));

  const login = (payload = demoAdmin) => {
    localStorage.setItem("token", "demo-jwt-token");
    localStorage.setItem("user", JSON.stringify(payload));
    setUser(payload);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout, isAdmin: user?.role === "admin" }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
