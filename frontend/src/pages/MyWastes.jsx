import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyWastes() {
  const [wastes, setWastes] = useState([]);

  const fetchWastes = async () => {
    try {
      const res = await api.get("/waste/all"); // returns only user’s wastes
      setWastes(res.data);
    } catch (err) {
      console.error("Error fetching wastes", err);
    }
  };

  useEffect(() => {
    fetchWastes();
  }, []);

  return (
      <div className="px-6 py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Waste Requests</h2>

      {wastes.length === 0 ? (
        <p>No waste requests yet.</p>
      ) : (
        wastes.map((w) => (
          <div key={w._id} className="bg-white p-4 rounded shadow-sm mb-4">
            <p><span className="font-semibold">Description:</span> {w.description}</p>
            <p>Pickup Date: {new Date(w.pickupDate).toLocaleDateString()}</p>
            <p>Time Slot: {w.pickupTimeSlot}</p>
            <p><span className="font-semibold">Status:</span> {w.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
