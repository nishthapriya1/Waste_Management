import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Navbar({ authRole, setAuthRole }) {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const isLoggedIn = Boolean(authRole);

  const confirmLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      setAuthRole(null);
      setShowLogoutConfirm(false);
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-[#000035] text-white px-6 py-3 w-full">
        {/* Brand */}
        <Link to="/" className="font-bold text-xl hover:text-gray-300">
          Waste Management
        </Link>

        {/* Links */}
        <div className="flex space-x-6 text-lg items-center">
          <Link to="/" className="hover:text-gray-300">
            About Us
          </Link>
          <Link to="/our-mission" className="hover:text-gray-300">
            Our Mission
          </Link>

          {!isLoggedIn && (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Join Us
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              {authRole === "admin" && (
                <>
                  <Link to="/admin" className="hover:text-gray-300">
                    Admin Dashboard
                  </Link>
                </>
              )}
              {authRole === "user" && (
                <Link to="/user" className="hover:text-gray-300">
                  User Dashboard
                </Link>
              )}
              {authRole === "driver" && (
                <Link to="/driver" className="hover:text-gray-300">
                  Driver Dashboard
                </Link>
              )}

              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
