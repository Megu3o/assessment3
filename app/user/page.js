// app/users/page.js
"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load users from Laravel API
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await api.get("/users");
        const data = res.data.data || res.data || [];

        setUsers(data);
      } catch (err) {
        setError(err.message || "Error loading users.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>

      {/* error message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Unable to load users</p>
          <p>{error}</p>
        </div>
      )}

      {/* loading text */}
      {isLoading && (
        <p className="mb-2 text-sm text-gray-500">Loading users...</p>
      )}

      {/* user list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded border bg-white p-4 shadow-sm"
          >
            <p className="text-lg font-semibold">{user.name}</p>

            <p className="text-sm text-gray-700">
              {user.email?.address || "No email"}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Email verified:{" "}
              {user.email?.verified ? "Yes" : "No"}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Created: {user.created?.human || user.created?.string}
            </p>
          </div>
        ))}

        {!isLoading && !error && users.length === 0 && (
          <p className="text-sm text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}
