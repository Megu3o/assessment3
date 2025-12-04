"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../lib/api";
import MilestoneForm from "../../components/MilestoneForm";
import StatusMessage from "../../../project/components/StatusMessage";

export default function EditMilestoneClient({ id }) {
  const router = useRouter();

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

  // Load existing milestone data
  useEffect(() => {
    const fetchMilestone = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await api.get(`/milestones/${id}`);
        const milestone = res.data.data || res.data;

        setForm({
          title: milestone.title || "",
          description: milestone.description || "",
          dueDate: milestone.due_date || "",
          completedAt: milestone.completed_at || "",
          projectId: milestone.project?.id || "",
        });
      } catch (err) {
        setError(err.message || "Error loading milestone.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMilestone();
    }
  }, [id]);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Submit update (PUT /milestones/{id})
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

      await api.put(`/milestones/${id}`, payload);

      setSuccess("Milestone updated successfully.");

      // After saving, go back to milestone list
      router.push("/milestone");
    } catch (err) {
      setError(err.message || "Error updating milestone.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh]  px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">
          Edit Milestone
        </h1>

        {/* Status messages */}
        <StatusMessage error={error} success={success} />

        <MilestoneForm
          form={form}
          isLoading={isLoading}
          editingId={id}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
