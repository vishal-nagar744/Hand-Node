// src/components/Navbar.jsx
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "../utils/token";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    window.location.href = "/login"; // redirect
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-800 to-purple-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">HandApp</Link>
        <div className="flex gap-4 items-center">
          <NavLink to="/">Home</NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
