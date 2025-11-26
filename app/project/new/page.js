// app/project/new/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import ProjectForm from "../components/ProjectForm";

// Simple helper to wait for a given time (ms)
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function NewProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // form value change
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // submit = create only
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setSuccess("");
      setIsLoading(true);

      await api.post("/projects", form);

      setForm({ name: "", description: "" });

      await wait(2000); // 2sec

      // go back to project page after creating a new project 
      router.push("/project");
    } catch (err) {
      setError(err.message || "Error creating project.");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleCancel = () => {
  //   setForm({ name: "", description: "" });
  //   setError("");
  //   setSuccess("");
  // };

  return (
    <main className="min-h-[80vh] bg-blue-50/60 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">

        {/* Heading */}
        <h1 className="text-center text-4xl font-bold text-blue-900">
          New Project
        </h1>

        {/* Status messages */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            <p className="font-semibold">Unable to create project</p>
            <p>{error}</p>
          </div>
        )}
        {!error && success && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
            <p className="font-semibold">Success</p>
            <p>{success}</p>
          </div>
        )}

        {/* Project Form (ProjectForm conponent) */}
        <div className="rounded-3xl border border-blue-100 bg-white/95 p-8 shadow-[0_18px_45px_rgba(37,99,235,0.18)]">
          <ProjectForm
            form={form}
            isLoading={isLoading}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            // onCancel={handleCancel}
          />
        </div>
      </div>
    </main>
  );
}
