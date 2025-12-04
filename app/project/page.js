// app/project/page.js
"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import ProjectCard from "./components/ProjectCard";
import StatusMessage from "../project/components/StatusMessage";
import LoadingText from "./components/LoadingText";

export default function ProjectListPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);


// load all the projects form API
  const fetchProjects = (message = "") => {

  setIsLoading(true);
  setError("");
  if (!message) {
    setSuccess("");
  }

  return api
    .get("/projects")
    .then((res) => {
      const data = res.data.data || res.data || [];
      setProjects(data);
      if (message) {
        setSuccess(message); // show success text if provided
      }
      setError(""); 
    })
    .catch((err) => {
      setError(err.message || "Error loading projects.");
      setSuccess("");
    })
    .finally(() => {
      setIsLoading(false);
    });
};

// Load projects once on first render
useEffect(() => {
  fetchProjects("Projects loaded successfully.");
}, []);


  // Delete handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      setError("");
      setSuccess("");

      await api.delete(`/projects/${id}`);

      setProjects((prev) => prev.filter((project) => project.id !== id));
      setSuccess("Project deleted successfully.");
    } catch (err) {
      setError(err.message || "Error deleting project.");
      setSuccess("");
    }
  };



  return (
    <main className="min-h-[80vh] px-10 py-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-blue-900 text-center">
            Projects
          </h1>
        </div>

        {/* Status messages */}
        <StatusMessage error={error} success={success} />
        
         {/* Loading indicator */}
        <LoadingText isLoading={isLoading} text="Loading projects..." />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
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
