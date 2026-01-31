import React, { useEffect, useState } from "react";
import api from "./api/axios";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import AboutUs from "./pages/AboutUs";
import OurMission from "./pages/OurMission";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import MyWastes from "./pages/MyWastes";
import Profile from "./pages/Profile";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Lists
import UsersList from "./lists/UsersList";
import DriversList from "./lists/DriversList";
// Utils
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const [authRole, setAuthRole] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // 🔐 Check authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/profile"); // cookie-based
        setAuthRole(res.data.role);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("name", res.data.name);
      } catch (err) {
        // Not logged in (401 expected)
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        setAuthRole(null);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  // ⏳ Prevent UI flicker before auth check completes
  if (!authChecked) return null;

  return (
    <>
      <Navbar authRole={authRole} setAuthRole={setAuthRole} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<AboutUs />} />
        <Route path="/our-mission" element={<OurMission />} />
        <Route path="/login" element={<Login setAuthRole={setAuthRole} />} />
        <Route path="/register" element={<Register />} />

        {/* Shared protected routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/waste" element={<MyWastes />} />

        {/* Role-based protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin" authRole={authRole}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectedRoute role="user" authRole={authRole}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver"
          element={
            <ProtectedRoute role="driver" authRole={authRole}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={<UsersList />}
        />
        
        <Route
          path="/admin/drivers"
          element={<DriversList />}
        />
      </Routes>

      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
