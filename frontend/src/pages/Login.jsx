
import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

// Toast UI
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ setAuthRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Simple email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      setAuthRole(res.data.role);
      toast.success("Logged in successfully!");

      setTimeout(() => {
        if (res.data.role === "admin") navigate("/admin");
        else if (res.data.role === "user") navigate("/user");
        else if (res.data.role === "driver") navigate("/driver");
      }, 1200);

    } catch (err) {
      const status = err.response?.status;
      const serverMsg = err.response?.data?.message;

      if (status === 404) {
        toast.error("User not found. Please register first.");
        setTimeout(() => navigate("/register"), 2000);
      } else if (status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error(serverMsg || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#000035] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-indigo-500"
          />

          <button
            onClick={submit}
            disabled={loading}
            className={`w-full text-white py-2 rounded transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>

      {/* /* Toast Popups
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      /> */ }
    </>
  );
}
