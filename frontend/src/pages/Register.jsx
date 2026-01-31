
import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    phone: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      toast.error("Valid email is required");
      return false;
    }
    if (!form.password || form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if ((form.role === "user" || form.role === "driver") && !form.phone.trim()) {
      toast.error("Phone number is required for selected role");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const payload =
        form.role === "admin"
          ? { name: form.name, email: form.email, password: form.password, role: form.role }
          : form;

      await api.post("/auth/register", payload);

      toast.success("Registered successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1200);

    } catch (err) {
      const msg = err.response?.data?.msg;
      if (msg) {
        toast.error(msg);
        if (msg === "User already exists") {
          setTimeout(() => navigate("/login"), 1500);
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#000035] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Join Us
          </h2>

          {/* Name */}
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-indigo-500"
          />

          {/* Email */}
          <input
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-indigo-500"
          />

          {/* Password toggle */}
          <div className="relative mb-4">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 cursor-pointer text-indigo-600 font-medium select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Role select */}
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-indigo-500"
          >
            <option value="user">User</option>
            <option value="driver">Driver</option>
            <option value="admin">Admin</option>
          </select>

          {/* Phone for users & drivers */}
          {(form.role === "user" || form.role === "driver") && (
            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-indigo-500"
            />
          )}

          {/* Submit button */}
          <button
            onClick={submit}
            disabled={loading}
            className={`w-full text-white py-2 rounded transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Submitting..." : "Join Us"}
          </button>
        </div>
      </div>
    
    </>
  );
}
