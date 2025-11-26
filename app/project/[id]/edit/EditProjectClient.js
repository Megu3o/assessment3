// app/project/[id]/edit/EditProjectClient.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../lib/api";
import ProjectForm from "../../components/ProjectForm";

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

        const res = await api.get(`/projects/${id}`);
        const project = res.data.data || res.data;

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

  // Handle form change
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
    <main className="min-h-[80vh] bg-blue-50/60 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">
          Edit Project
        </h1>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <p className="font-semibold">Unable to edit project</p>
            <p>{error}</p>
          </div>
        )}
        {!error && success && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-semibold">Success</p>
            <p>{success}</p>
          </div>
        )}

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
