import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // ---- THEME STATE (light / dark) ----
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || "light";
  });

  // Apply theme to <html data-theme="..."> and persist
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium transition ${
      isActive
        ? "bg-primary text-primary-content"
        : "text-base-content hover:bg-base-200"
    }`;

  return (
    <nav className="bg-base-100 border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* LEFT — Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🐾</span>
            <span className="text-xl font-bold">PawMart</span>
          </Link>
        </div>

        {/* MIDDLE — Menu */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-4 items-center">
            <li>
              <NavLink to="/" className={navClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/pets-supplies" className={navClass}>
                Pets &amp; Supplies
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink to="/add-listing" className={navClass}>
                    Add Listing
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-listings" className={navClass}>
                    My Listings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-orders" className={navClass}>
                    My Orders
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* RIGHT — Theme Toggle + Auth */}
        <div className="flex items-center gap-3">
          {/* 🌙 Light/Dark Toggle (manual, reliable) */}
          <label className="swap swap-rotate cursor-pointer">
            {/* Checkbox reflects current theme */}
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />

            {/* Sun icon (light mode) */}
            <svg
              className="swap-off fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5 12a7 7 0 1114 0A7 7 0 015 12zm7-9a1 1 0 011 1v2a1 1 0 11-2 0V4a1 1 0 011-1zm0 16a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm9-7a1 1 0 01-1-1h-2a1 1 0 110-2h2a1 1 0 011 1zm-16 0a1 1 0 01-1-1H2a1 1 0 110-2h2a1 1 0 011 1zm12.657-6.657a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414L16.243 4.93a1 1 0 011.414 0zm-9.9 9.9a1 1 0 010 1.414L5.343 18.9a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0z" />
            </svg>

            {/* Moon icon (dark mode) */}
            <svg
              className="swap-on fill-current w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </label>

          {/* BEFORE LOGIN */}
          {!user && (
            <>
              <Link to="/login" className="btn btn-sm btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </>
          )}

          {/* AFTER LOGIN */}
          {user && (
            <>
              <div className="tooltip tooltip-bottom" data-tip={user.displayName || user.email}>
                <img
                  src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                  className="w-10 h-10 rounded-full border"
                  alt="profile"
                />
              </div>
              <button onClick={logout} className="btn btn-sm btn-outline">
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden px-4 pb-3">
        <ul className="flex flex-wrap gap-3">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/pets-supplies" className={navClass}>
            Pets &amp; Supplies
          </NavLink>

          {user && (
            <>
              <NavLink to="/add-listing" className={navClass}>
                Add Listing
              </NavLink>
              <NavLink to="/my-listings" className={navClass}>
                My Listings
              </NavLink>
              <NavLink to="/my-orders" className={navClass}>
                My Orders
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
