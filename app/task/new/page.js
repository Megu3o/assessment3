
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "../../../lib/api";
import TaskForm from "../components/TaskForm";
import StatusMessage from "../../project/components/StatusMessage";


// Page for creating a new task
export default function NewTaskPage() {
  // Read query string from URL
  const searchParams = useSearchParams();
  const projectIdFromQuery = searchParams.get("project") || "";
  
   // Form state for the new task
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "todo",
    dueDate: "",
    projectId: projectIdFromQuery, 
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    // When a form field changes, update that one field
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      setIsLoading(true);

      const payload = {
        name: form.name,
        description: form.description,
        status: form.status,
        due_date: form.dueDate || null,
        project_id: form.projectId || null,
      };

      // Send POST /tasks to create the task
      await api.post("/tasks", payload);
      setSuccess("Task created successfully.");
      setForm({
        name: "",
        description: "",
        status: "todo",
        dueDate: "",
        projectId: projectIdFromQuery, 
      });
    } catch (err) {
      setError(err.message || "Error creating task.");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">New Task</h1>

      {/* Status messages */}
      <StatusMessage error={error} success={success} />

      <TaskForm
        form={form}
        isLoading={isLoading}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
