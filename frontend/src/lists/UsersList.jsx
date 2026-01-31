import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/auth/users?role=user", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6">All Users</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 rounded shadow"
            >
              <p className="font-medium text-lg">
                {user.name}{" "}
                <span className="text-gray-600">({user.email})</span>
              </p>

              {user.phone && (
                <p className="text-sm text-gray-700">
                  📞 Phone: {user.phone}
                </p>
              )}

              <p className="text-sm text-gray-600">
                Role: {user.role}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
