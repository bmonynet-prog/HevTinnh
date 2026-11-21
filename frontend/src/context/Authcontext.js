import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: "Mony Net",
    email: "mony@example.com",
    address: "Phnom Penh, Cambodia",
  });

  const login = ({ email, password }) => {
    if (!email || !password) {
      return { ok: false, message: "Email and password are required." };
    }

    setUser({
      name: email.split("@")[0] || "ShopEasy Customer",
      email,
      address: "Phnom Penh, Cambodia",
    });

    return { ok: true };
  };

  const register = ({ name, email, password }) => {
    if (!name || !email || !password) {
      return { ok: false, message: "All fields are required." };
    }

    setUser({ name, email, address: "" });
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (profile) => {
    setUser((current) => ({ ...current, ...profile }));
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      register,
      updateProfile,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
