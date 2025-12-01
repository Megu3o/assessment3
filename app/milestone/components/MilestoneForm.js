"use client";

export default function MilestoneForm({
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
      {/* Title */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Milestone Title
        </label>
        <input
          type="text"
          placeholder="Enter a milestone title"
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
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
          placeholder="Describe the milestone (optional)"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
        />
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

      {/* Completed at */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Completed at (optional)
        </label>
        <input
          type="date"
          value={form.completedAt}
          onChange={(e) => onChange("completedAt", e.target.value)}
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
          {editingId ? "Save Milestone" : "Add Milestone"}
        </button>
      </div>
    </form>
  );
}
