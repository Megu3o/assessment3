
"use client";

export default function TaskForm({
  form,
  editingId,
  isLoading,
  onChange,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 space-y-4 rounded-lg border bg-white p-4 shadow-sm"
    >
      {/* Task name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Task Name
        </label>
        <input
          type="text"
          placeholder="Enter a task name"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          placeholder="Describe the task (optional)"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
        />
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={form.status}
          onChange={(e) => onChange("status", e.target.value)}
          className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="todo">To do</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Due date */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Due date
        </label>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => onChange("dueDate", e.target.value)}
          className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Project ID */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Project ID (optional)
        </label>
        <input
          type="text"
          placeholder="Link to project by ID"
          value={form.projectId}
          onChange={(e) => onChange("projectId", e.target.value)}
          className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          disabled={isLoading}
        >
          {editingId ? "Save" : "Add Task"}
        </button>

        
      </div>
    </form>
  );
}
