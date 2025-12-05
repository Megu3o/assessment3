"use client";

import { useState } from "react";
import api from "../../../lib/api";
import MilestoneForm from "../components/MilestoneForm";
import StatusMessage from "../../project/components/StatusMessage";
import Link from "next/link";

export default function NewMilestonePage() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    completedAt: "",
    projectId: "", 
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      setIsLoading(true);

      const payload = {
        title: form.title,
        description: form.description,
        due_date: form.dueDate || null,
        completed_at: form.completedAt || null,
        project_id: form.projectId || null,
      };

      await api.post("/milestones", payload);
      setSuccess("Milestone created successfully.");
      setForm({
        title: "",
        description: "",
        dueDate: "",
        completedAt: "",
        projectId: "",
      });
    } catch (err) {
      setError(err.message || "Error creating milestone.");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">New Milestone</h1>

       {/* Status messages */}
      <StatusMessage error={error} success={success} />

      <MilestoneForm
        form={form}
        isLoading={isLoading}
        editingId={null}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
      {/* Back link */}
        <Link
          href="/milestone"
          className="text-sm text-blue-700 hover:underline"
        >
          ← Back to Milestones
        </Link>
    </div>
  );
}
