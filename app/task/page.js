
"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import TaskCard from "../task/components/TaskCard";
import LoadingText from "../project/components/LoadingText";
import StatusMessage from "../project/components/StatusMessage";

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
      const newList = tasks.filter((task) => task.id !== id);
      setTasks(newList);

      setSuccess("Task deleted successfully.");
    } catch (err) {
      setError(err.message || "Error deleting task.");
      setSuccess("");
    }
  };

  return (
    <main className="min-h-[80vh] px-10 py-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-blue-900 text-center">
            Tasks
          </h1>
        </div>

        {/* Status messages */}
        <StatusMessage error={error} success={success} />

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
            <p className="text-sm text-gray-600">No tasks found.</p>
          )}
        
        </div>
      </div>
    </main>
  );
}
