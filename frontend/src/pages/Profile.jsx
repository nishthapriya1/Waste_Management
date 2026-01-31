import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: { houseOrFlat: "", street: "", area: "", city: "", state: "", pincode: "" },
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    api
      .get("/auth/profile", { withCredentials: true })
      .then((res) => {
        const data = res.data;
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: {
            houseOrFlat: data.address?.houseOrFlat || "",
            street: data.address?.street || "",
            area: data.address?.area || "",
            city: data.address?.city || "",
            state: data.address?.state || "",
            pincode: data.address?.pincode || "",
          },
        });
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        toast.error("Failed to load profile");
      });
  }, []);

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

  const saveProfile = () => {
    api
      .put("/auth/profile", form, { withCredentials: true })
      .then(() => {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Profile update error:", err);
        toast.error("Failed to update profile");
      });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      {/* Name */}
      <div className="mb-3">
        <label className="font-medium">Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={!isEditing}
          className={`border p-2 w-full rounded ${isEditing ? "bg-white" : "bg-gray-100"}`}
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="font-medium">Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          readOnly
          className="border p-2 w-full rounded bg-gray-100"
        />
      </div>

      {/* Phone */}
      <div className="mb-3">
        <label className="font-medium">Phone:</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          disabled={!isEditing}
          className={`border p-2 w-full rounded ${isEditing ? "bg-white" : "bg-gray-100"}`}
        />
      </div>

      {/* Address Fields */}
      <h3 className="font-semibold mb-2">Permanent Address</h3>

      {["houseOrFlat", "street", "area", "city", "state", "pincode"].map((field) => (
        <div className="mb-2" key={field}>
          <label className="text-sm capitalize">{field.replace(/([A-Z])/g, " $1")}:</label>
          <input
            name={`address.${field}`}
            value={form.address[field] || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className={`border p-2 w-full rounded ${isEditing ? "bg-white" : "bg-gray-100"}`}
          />
        </div>
      ))}

      {/* Buttons */}
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
