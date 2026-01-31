import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function DriversList() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await api.get("/auth/users?role=driver", { withCredentials: true });
      setDrivers(res.data);
    } catch (err) {
      toast.error("Failed to fetch drivers");
    }
  };

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6">All Drivers</h2>
      {drivers.length === 0 ? (
        <p>No drivers found.</p>
      ) : (
        <div className="space-y-4">
          {drivers.map((driver) => (
            <div
              key={driver._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{driver.name} ({driver.email})</p>
                {driver.phone && <p className="text-sm text-gray-600">Phone: {driver.phone}</p>}
              </div>
              <p className="text-sm text-green-700 font-medium">{driver.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
