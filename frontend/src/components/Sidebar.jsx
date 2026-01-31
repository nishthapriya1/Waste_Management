import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

import {
  HiOutlineBell,
  HiOutlineClipboardList,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineTrash,
  HiOutlineUsers,
  HiOutlineTruck,
} from "react-icons/hi";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    api.get("/auth/profile", { withCredentials: true })
      .then(res => setProfile(res.data))
      .catch(() => navigate("/login"));
  }, [navigate]);

  const confirmLogout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      setShowLogoutConfirm(false);
      navigate("/login");
    }
  };

  const confirmDeleteAccount = async () => {
    try {
      await api.delete("/auth/delete-account", { withCredentials: true });
    } catch (err) {
      console.error("Delete account failed", err);
    } finally {
      localStorage.clear();
      navigate("/register");
    }
  };

  // Links are dynamic based on role
  const links = [];

  if (profile?.role === "user") {
    links.push(
      {
        label: "My Wastes",
        path: "/user/waste",
        icon: HiOutlineClipboardList,
        iconColor: "text-indigo-600",
      },
      {
        label: "Notifications",
        path: "/user/notifications",
        icon: HiOutlineBell,
        iconColor: "text-yellow-400",
      }
    );
  }

 if (profile?.role === "admin") {
  links.push(
    {
      label: "Admin Dashboard",
      path: "/admin",
      icon: HiOutlineUser,
      iconColor: "text-indigo-600",
    },
    {
      label: "All Users",
      path: "/admin/users",
      icon: HiOutlineUsers,
      iconColor: "text-indigo-700",
    },
    {
      label: "All Drivers",
      path: "/admin/drivers",
      icon: HiOutlineTruck,
      iconColor: "text-green-600",
    }
  );
}

  if (profile?.role === "driver") {
    links.push(
      {
        label: "Driver Dashboard",
        path: "/driver",
        icon: HiOutlineTruck,
        iconColor: "text-green-600",
      }
    );
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Profile Header */}
        <Link
          to="/profile"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-6 py-5 bg-indigo-600 text-white"
        >
          <div className="w-10 h-10 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold text-lg">
            {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <p className="font-semibold">{profile?.name}</p>
            <p className="text-sm">{profile?.email}</p>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="mt-4 flex flex-col space-y-3 px-4">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-indigo-100 rounded-md transition"
              >
                <Icon className={`text-xl ${link.iconColor}`} />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-red-100 rounded-md transition mt-4"
          >
            <HiOutlineLogout className="text-xl text-red-600" />
            <span className="font-medium">Logout</span>
          </button>

          {/* Delete Account */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-3 px-4 py-3 text-red-700 hover:bg-red-200 rounded-md transition"
          >
            <HiOutlineTrash className="text-xl" />
            <span className="font-medium">Delete Account</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full px-4 py-3 text-sm text-gray-500 border-t">
          &copy; {new Date().getFullYear()}
        </div>
      </div>

      {/* Confirm Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to logout?</p>
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

      {/* Confirm Delete Account Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Delete Account
            </h3>
            <p className="mb-6">This action is permanent. Are you sure?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAccount}
                className="px-4 py-2 bg-red-700 text-white rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
