"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import ProjectForm from "./components/ProjectForm";
import ProjectCard from "./components/ProjectCard";
import StatusMessage from "./components/StatusMessage";
import LoadingText from "./components/LoadingText";


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

  // Handle form input change
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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

  // Cancel editing
  const handleCancelEdit = () => {
    setEditing(null);
    setForm({ name: "", description: "" });
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
      <StatusMessage error={error} success={success} />


      {/* Project form (ProjectForm component)*/}
      <ProjectForm
        form={form}
        isLoading={isLoading}
        editing={editing}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
      />

      {/* Loading indicator (LoadingText component) */}
      <LoadingText isLoading={isLoading} text="Loading projects..." />

      {/* Project cards (ProjectCard component) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={() => handleEdit(project)}
            onDelete={() => handleDelete(project.id)}
          />
        ))}

        {!isLoading && projects.length === 0 && !error && (
          <p className="text-sm text-gray-500">No projects found.</p>
        )}
      </div>
    </div>
  );
}
