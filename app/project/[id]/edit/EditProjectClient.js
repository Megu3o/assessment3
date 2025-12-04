// app/project/[id]/edit/EditProjectClient.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../lib/api";
import ProjectForm from "../../components/ProjectForm";
import StatusMessage from "../../components/StatusMessage";

export default function EditProjectClient({ id }) {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load existing project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError("");
        // Get the current project from the API
        const res = await api.get(`/projects/${id}`);
        const project = res.data.data || res.data;
         // Prefill the form
        setForm({
          name: project.name || "",
          description: project.description || "",
        });
      } catch (err) {
        setError(err.message || "Error loading project.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  // When a form field changes, update that one field
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      setIsLoading(true);

      await api.put(`/projects/${id}`, form);

      setSuccess("Project updated successfully.");

      // go back to project detail page
      router.push(`/project/${id}`);
    } catch (err) {
      setError(err.message || "Error updating project.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">
          Edit Project
        </h1>

        {/* Status messages */}
        <StatusMessage error={error} success={success} />

      <ProjectForm
        form={form}
        isLoading={isLoading}
        mode="edit"
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
      </div>
    </main>
  );
}
