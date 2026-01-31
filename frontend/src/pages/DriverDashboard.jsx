import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { HiOutlineMenu } from "react-icons/hi";
import api from "../api/axios";
import { toast } from "react-toastify";

const statusOptions = [
  { label: "All Assigned", value: "all" },
  { label: "Pending", value: "assigned" },
  { label: "Out for Pickup", value: "out_for_pickUp" },
  { label: "At Doorstep", value: "at_doorstep" },
  { label: "Collected", value: "collected" },
];

const statusColors = {
  assigned: "bg-yellow-100 text-yellow-800",
  out_for_pickUp: "bg-blue-100 text-blue-800",
  at_doorstep: "bg-green-100 text-green-800",
  collected: "bg-emerald-100 text-emerald-800",
};

export default function DriverDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [assignedWastes, setAssignedWastes] = useState([]);
  const [filteredWastes, setFilteredWastes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchAssignedWastes();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [selectedFilter, assignedWastes]);

  const fetchAssignedWastes = async () => {
    try {
      const res = await api.get("/waste/all", { withCredentials: true });
      setAssignedWastes(res.data);
    } catch {
      toast.error("Failed to fetch wastes");
    }
  };

  const applyFilter = () => {
    if (selectedFilter === "all") {
      setFilteredWastes(assignedWastes);
    } else {
      setFilteredWastes(
        assignedWastes.filter((w) => w.status === selectedFilter)
      );
    }
  };

  const changeStatus = (wasteId, status) => {
    setSelectedStatus({ ...selectedStatus, [wasteId]: status });
  };

  const updateStatusOnServer = async (wasteId) => {
    try {
      const status = selectedStatus[wasteId];
      if (!status)
        return toast.warning("Please select a status");

      await api.patch(
        `/waste/${wasteId}/status`,
        { status },
        { withCredentials: true }
      );
      toast.success("Status updated successfully");
      fetchAssignedWastes();
    } catch {
      toast.error("Failed to update status");
    }
  };

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
          Driver Dashboard
        </h1>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Filters */}
      <div className="px-6 py-4 max-w-5xl mx-auto flex gap-4">
        {statusOptions.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedFilter(filter.value)}
            className={`px-4 py-2 rounded-full border ${
              selectedFilter === filter.value
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="px-6 py-10 max-w-5xl mx-auto">
        {filteredWastes.length === 0 && (
          <p className="text-center text-gray-500">
            No wastes found for selected filter
          </p>
        )}

        {filteredWastes.map((waste) => (
          <div
            key={waste._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {(waste.category || "").toUpperCase()}
              </h3>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  statusColors[waste.status]
                }`}
              >
                {waste.status.replace("_", " ")}
              </span>
            </div>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Description:</span> {waste.description}
            </p>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">User Phone:</span> {waste.user?.phone || "Not available"}
            </p>

            {waste.address && (
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Address:</span> {waste.address.houseOrFlat}, {waste.address.street}, {waste.address.area}, {waste.address.city}, {waste.address.state} - {waste.address.pincode}
              </p>
            )}

            {waste.address?.lat && waste.address?.lng && (
              <a
                href={`https://www.google.com/maps?q=${waste.address.lat},${waste.address.lng}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 font-medium mt-1 hover:underline"
              >
                📍 View Live Location
              </a>
            )}

            {/* Status Options */}
            <div className="flex gap-6 mt-6">
              {statusOptions.slice(1).map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`status-${waste._id}`}
                    checked={selectedStatus[waste._id] === option.value}
                    onChange={() => changeStatus(waste._id, option.value)}
                    className="accent-blue-600"
                  />
                  {option.label}
                </label>
              ))}
            </div>

            <button
              onClick={() => updateStatusOnServer(waste._id)}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Update Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
