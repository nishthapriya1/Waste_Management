import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { HiOutlineMenu } from "react-icons/hi";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [wastes, setWastes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [filter, setFilter] = useState("all"); // filter state

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch all wastes AND all drivers
  const fetchData = async () => {
    try {
      const wastesRes = await api.get("/waste/all", {
        withCredentials: true,
      });
      const driversRes = await api.get("/auth/users?role=driver", {
        withCredentials: true,
      });

      setWastes(wastesRes.data);
      setDrivers(driversRes.data);
    } catch (err) {
      console.error("Fetch Data Failed:", err.response || err);
      toast.error(
        err.response?.data?.message || "Failed to load dashboard data"
      );
    }
  };

  // Assign driver in backend
  const assign = async (wasteId, driverId) => {
    try {
      const res = await api.put(
        "/waste/assign",
        { wasteId, driverId },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Driver assigned successfully!");
      fetchData();
      console.log("Assign success:", res.data);
    } catch (err) {
      console.error("Assign Error:", err.response || err);
      toast.error(err.response?.data?.message || "Failed to assign driver");
    }
  };

  // Filtered wastes list
  const filteredWastes = wastes.filter((w) => {
    if (filter === "assigned") return !!w.assignedDriver;
    if (filter === "unassigned") return !w.assignedDriver;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="flex items-center bg-indigo-600 text-white p-4 shadow">
        <HiOutlineMenu
          size={26}
          className="cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        />
        <h1 className="flex-1 text-center text-xl font-bold">
          Admin Dashboard
        </h1>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="px-6 py-8 max-w-6xl mx-auto space-y-6">

        {/* FILTER BUTTONS */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${
              filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("assigned")}
            className={`px-4 py-2 rounded ${
              filter === "assigned" ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            Assigned
          </button>
          <button
            onClick={() => setFilter("unassigned")}
            className={`px-4 py-2 rounded ${
              filter === "unassigned" ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            Unassigned
          </button>
        </div>

        {filteredWastes.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No waste requests found
          </p>
        )}

        {filteredWastes.map((w) => (
          <div
            key={w._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <p>
              <b>Category:</b>{" "}
              <span className="capitalize">{w.category || "N/A"}</span>
            </p>
            <p>
              <b>Description:</b> {w.description || "N/A"}
            </p>

            {w.address && (
              <div className="my-2">
                <p className="font-semibold">Address:</p>
                {w.address.houseOrFlat && (
                  <p>House/Flat: {w.address.houseOrFlat}</p>
                )}
                {w.address.street && <p>Street: {w.address.street}</p>}
                {w.address.area && <p>Area: {w.address.area}</p>}
                {w.address.city && <p>City: {w.address.city}</p>}
                {w.address.state && <p>State: {w.address.state}</p>}
                {w.address.pincode && (
                  <p>Pincode: {w.address.pincode}</p>
                )}
                {w.address.lat && w.address.lng && (
                  <p className="mt-1">
                    <a
                      href={`https://www.google.com/maps?q=${w.address.lat},${w.address.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View on Map
                    </a>
                  </p>
                )}
              </div>
            )}

            <p>
              <b>Pickup Date:</b>{" "}
              {w.pickupDate
                ? new Date(w.pickupDate).toLocaleDateString()
                : "Not set"}
            </p>
            <p>
              <b>Time Slot:</b> {w.pickupTimeSlot || "Not set"}
            </p>

            <p className="mt-2">
              <b>Assigned Driver:</b>{" "}
              {w.assignedDriver?.name || "None"}
            </p>

            {/* ASSIGN DRIVER DROPDOWN */}
            <div className="mt-4">
              <select
                value={w.assignedDriver?._id || ""}
                onChange={(e) => assign(w._id, e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Assign Driver</option>
                {drivers.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
