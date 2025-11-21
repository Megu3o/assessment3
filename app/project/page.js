"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import api from "../../lib/api";

// Simple helper to wait for a given time (ms)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editing, setEditing] = useState(null); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load project list from the API
  const loadProjects = async (message = "") => {
    try {
      setIsLoading(true);
      setError("");
      const res = await api.get("/projects");
      const data = res.data.data || res.data || [];
      setProjects(data);
      if (message) {
        setSuccess(message);
      }
    } catch (err) {
      setError(err.message || "Error loading projects.");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  // Load projects once when the page first renders
  useEffect(() => {
    loadProjects("Projects loaded successfully.");
  }, []);

  // Create or update a project
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");

      if (editing) {
        // Edit mode: update an existing project
        await api.put(`/projects/${editing}`, form);

        // Wait a bit for the backend to finish updating
        await wait(500);

        await loadProjects("Project updated successfully.");
      } else {
        // Create mode: create a new project
        const res = await api.post("/projects", form);
        console.log("POST /projects result:", res.data);

        // Wait a bit for the backend to finish saving
        await wait(500);

        await loadProjects("Project created successfully.");
      }

      // Reset the form
      setForm({ name: "", description: "" });
      setEditing(null);
    } catch (err) {
      setError(err.message || "Error saving project.");
      setSuccess("");
    }
  };

  // When the Edit button is clicked, fill the form with that project
  const handleEdit = (project) => {
    setForm({ name: project.name, description: project.description });
    setEditing(project.id);
    setSuccess("");
    setError("");
  };

  // Delete a project
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      setError("");
      setSuccess("");

      await api.delete(`/projects/${id}`);

      // Remove the deleted project from local state
      const newList = projects.filter((p) => p.id !== id);
      setProjects(newList);

      setSuccess("Project deleted successfully.");
    } catch (err) {
      setError(err.message || "Error deleting project.");
      setSuccess("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Projects</h1>

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

      {/* Project form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 space-y-4 rounded-lg border bg-white p-4 shadow-sm"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Project Name
          </label>
          <input
            type="text"
            placeholder="Enter a project name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            placeholder="Describe the project (optional)"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            disabled={isLoading}
          >
            {editing ? "Update Project" : "Add Project"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({ name: "", description: "" });
                setSuccess("");
                setError("");
              }}
              className="rounded bg-gray-400 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-500 disabled:opacity-60"
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Loading indicator */}
      {isLoading && (
        <p className="mb-2 text-sm text-gray-500">Loading projects...</p>
      )}

      {/* Project cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded border p-4 shadow transition hover:shadow-md"
          >
            <Link
              href={`/projects/${project.id}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {project.name}
            </Link>
            <p className="mb-2 text-sm text-gray-600">
              {project.description || "No description"}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleEdit(project)}
                className="rounded bg-yellow-500 px-3 py-1 text-xs font-semibold text-white hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(project.id)}
                className="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {!isLoading && projects.length === 0 && !error && (
          <p className="text-sm text-gray-500">No projects found.</p>
        )}
      </div>
    </div>
  );
}
