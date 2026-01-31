
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
    phone: "",
      licenseNumber: "",
    aadhaarNumber: "",
    adminCode: "",
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
    if (form.role === "driver") {
      if (!form.licenseNumber.trim()) {
        toast.error("License number is required for drivers");
        return false;
      }
      if (!/^\d{12}$/.test(form.aadhaarNumber)) {
        toast.error("Aadhaar number must be 12 digits");
        return false;
      }
    }
    if (form.role === "admin" && !form.adminCode.trim()) {
      toast.error("Admin code is required");
      return false;
    }
    return true;
  };


  const submit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
           name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      if (form.role === "user" || form.role === "driver") {
        payload.phone = form.phone;
      }

      if (form.role === "driver") {
        payload.licenseNumber = form.licenseNumber;
        payload.aadhaarNumber = form.aadhaarNumber;
      }

      if (form.role === "admin") {
        payload.adminCode = form.adminCode;
      }
        
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
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-indigo-500"
            />
          )}
                {form.role === "driver" && (
          <>
            <input
              placeholder="License Number"
              value={form.licenseNumber}
              onChange={e => setForm({ ...form, licenseNumber: e.target.value })}
              className="w-full border p-2 rounded mb-4"
            />

            <input
              placeholder="Aadhaar Number"
              value={form.aadhaarNumber}
              onChange={e => setForm({ ...form, aadhaarNumber: e.target.value })}
              className="w-full border p-2 rounded mb-4"
            />
          </>
          )}
              {form.role === "admin" && (
          <input
            placeholder="Admin Code"
            value={form.adminCode}
            onChange={e => setForm({ ...form, adminCode: e.target.value })}
            className="w-full border p-2 rounded mb-4"
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
