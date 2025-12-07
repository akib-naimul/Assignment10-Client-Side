/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { toast } from "react-hot-toast";

// ✅ Export context from here (so all existing imports keep working)
export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Optional: theme state (if you’re using dark/light toggle)
  const [theme, setTheme] = useState(
    () => localStorage.getItem("pawmart-theme") || "light"
  );

  const applyTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("pawmart-theme", t);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 🔐 Register
  const register = (email, password, name, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        if (name || photoURL) {
          await updateProfile(res.user, {
            displayName: name || "",
            photoURL: photoURL || "",
          });
        }
        toast.success("Account created");
        return res;
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message || "Registration failed");
        throw err;
      })
      .finally(() => setLoading(false));
  };

  // 🔐 Login (email/password)
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        toast.success("Logged in");
        return res;
      })
      .catch((err) => {
        console.error(err);
        toast.error("Invalid email or password");
        throw err;
      })
      .finally(() => setLoading(false));
  };

  // 🔐 Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success("Logged in with Google");
        return res;
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google sign-in failed");
        throw err;
      })
      .finally(() => setLoading(false));
  };

  // 🚪 Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        toast.success("Logged out");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Logout failed");
      })
      .finally(() => setLoading(false));
  };

  // 👀 Auth state observer
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (current) => {
      setUser(current);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const authInfo = {
    user,
    loading,
    register,
    login,
    googleLogin,
    logout,
    theme,
    toggleTheme,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
