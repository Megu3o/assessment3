// app/project/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  
import api from "../../lib/api";
import ProjectCard from "./components/ProjectCard";

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); 

  const loadProjects = async (message = "") => {
    try {
      setIsLoading(true);
      setError("");
      if (!message) {
        setSuccess("");
      }

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

  useEffect(() => {
    loadProjects("Projects loaded successfully.");
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      setError("");
      setSuccess("");

      await api.delete(`/projects/${id}`);

      setProjects((prev) => prev.filter((p) => p.id !== id));
      setSuccess("Project deleted successfully.");
    } catch (err) {
      setError(err.message || "Error deleting project.");
      setSuccess("");
    }
  };


  const handleEdit = (id) => {
    router.push(`/project/${id}`);
  };

  return (
    <main className="min-h-[80vh] bg-blue-50/60 px-20 py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-blue-900 text-center">
            Projects
          </h1>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p className="font-semibold">Unable to load projects</p>
            <p>{error}</p>
          </div>
        )}
        {!error && success && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-semibold">Success</p>
            <p>{success}</p>
          </div>
        )}

        {isLoading && (
          <p className="mb-4 text-sm text-gray-600">Loading projects...</p>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={() => handleEdit(project.id)} 
              onDelete={() => handleDelete(project.id)}   
            />
          ))}

          {!isLoading && !error && projects.length === 0 && (
            <p className="text-sm text-gray-600">No projects found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
