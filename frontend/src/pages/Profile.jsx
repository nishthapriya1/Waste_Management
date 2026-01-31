import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    licenseNumber: "",
    aadhaarNumber: "",
    address: {
      line1: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Load profile
  useEffect(() => {
    api
      .get("/auth/profile", { withCredentials: true })
      .then((res) => {
        const data = res.data;
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          role: data.role || "",
          licenseNumber: data.licenseNumber || "",
          aadhaarNumber: data.aadhaarNumber || "",
          address: {
            line1: data.address?.line1 || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            pincode: data.address?.pincode || "",
          },
        });
      })
      .catch(() => toast.error("Failed to load profile"));
  }, []);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 🔹 Save profile (only editable fields)
  const saveProfile = () => {
    const payload = {
      name: form.name,
      phone: form.phone,
      address: form.address,
    };

    api
      .put("/auth/profile", payload, { withCredentials: true })
      .then(() => {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch(() => toast.error("Failed to update profile"));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      {/* Name */}
      <div className="mb-3">
        <label className="font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={!isEditing}
          className={`border p-2 w-full rounded ${
            isEditing ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>

      {/* Email (read-only) */}
      <div className="mb-3">
        <label className="font-medium">Email</label>
        <input
          value={form.email}
          readOnly
          className="border p-2 w-full rounded bg-gray-100"
        />
      </div>

      {/* Phone */}
      <div className="mb-3">
        <label className="font-medium">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          disabled={!isEditing}
          className={`border p-2 w-full rounded ${
            isEditing ? "bg-white" : "bg-gray-100"
          }`}
        />
      </div>

      {/* 🚗 Driver-only (READ-ONLY) */}
      {form.role === "driver" && (
        <>
          <div className="mb-3">
            <label className="font-medium">License Number</label>
            <input
              value={form.licenseNumber}
              readOnly
              className="border p-2 w-full rounded bg-gray-100"
            />
          </div>

          <div className="mb-3">
            <label className="font-medium">Aadhaar Number</label>
            <input
              value={form.aadhaarNumber}
              readOnly
              className="border p-2 w-full rounded bg-gray-100"
            />
          </div>
        </>
      )}

      {/* Address */}
      <h3 className="font-semibold mb-2">Permanent Address</h3>

      {["line1", "city", "state", "pincode"].map((field) => (
        <div className="mb-2" key={field}>
          <label className="text-sm capitalize">
            {field === "line1" ? "Address Line" : field}
          </label>
          <input
            name={`address.${field}`}
            value={form.address[field]}
            onChange={handleChange}
            disabled={!isEditing}
            className={`border p-2 w-full rounded ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>
      ))}

      {/* Actions */}
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={saveProfile}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
