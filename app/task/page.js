
"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import TaskCard from "../task/components/TaskCard";
import LoadingText from "../project/components/StatusMessage";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load all tasks from the API
  const loadTasks = async (message = "") => {
    try {
      setIsLoading(true);
      setError("");

      const res = await api.get("/tasks");
      const data = res.data.data || res.data || [];

      setTasks(data);
      if (message) setSuccess(message);
    } catch (err) {
      setError(err.message || "Error loading tasks.");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  // Load once on first render
  useEffect(() => {
    loadTasks("Tasks loaded successfully.");
  }, []);

  // Delete task
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      setError("");
      setSuccess("");

      await api.delete(`/tasks/${id}`);

      // remove from local state
      const newList = tasks.filter((t) => t.id !== id);
      setTasks(newList);

      setSuccess("Task deleted successfully.");
    } catch (err) {
      setError(err.message || "Error deleting task.");
      setSuccess("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Tasks</h1>

      {/* Status messages */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Unable to complete the action</p>
          <p>{error}</p>
        </div>
      )}
      {!error && success && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <p className="font-semibold">Success</p>
          <p>{success}</p>
        </div>
      )}

      {/* Loading indicator */}
      <LoadingText isLoading={isLoading} text="Loading tasks..." />

      {/* Task list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => handleDelete(task.id)}
          />

        ))}

        {!isLoading && tasks.length === 0 && !error && (
          <p className="text-sm text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
}
