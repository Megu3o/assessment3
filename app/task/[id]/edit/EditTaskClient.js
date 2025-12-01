// Client component for editing a task

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../lib/api";
import TaskForm from "../../components/TaskForm";
import StatusMessage from "../../../project/components/StatusMessage";


export default function EditTaskClient({ id }) {
  const router = useRouter();

  // Form values
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "todo",
    dueDate: "",
    projectId: "",
  });

  // Messages and loading state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get the task data when the page loads 
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setIsLoading(true);
        setError("");

        // Get this task from the API
        const res = await api.get(`/tasks/${id}`);
        const task = res.data.data || res.data;

        // Put API data into the form
        setForm({
          name: task.name || "",
          description: task.description || "",
          status: task.status || "todo",
          // API field is "due_date", but our form uses "dueDate"
          dueDate: task.due_date || "",
          // If task has a project, use its id
          projectId: task.project?.id || "",
        });
      } catch (err) {
        setError(err.message || "Error loading task.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  // When a form field changes, update that one field
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Save changes (PUT /tasks/{id})
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      setError("");
      setSuccess("");
      setIsLoading(true);

      // Data we send to the API
      const payload = {
        name: form.name,
        description: form.description,
        status: form.status,
        due_date: form.dueDate || null,
        project_id: form.projectId || null,
      };

      await api.put(`/tasks/${id}`, payload);

      setSuccess("Task updated successfully.");

      // Go back to task list page
      router.push("/task");
    } catch (err) {
      setError(err.message || "Error updating task.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] bg-blue-50/60 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">
          Edit Task
        </h1>

        {/* Status messages */}
        <StatusMessage error={error} success={success} />

        {/* Task form */}
        <TaskForm
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
