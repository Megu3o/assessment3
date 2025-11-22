"use client";

export default function ProjectForm({
  form,
  isLoading,
  editing,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 space-y-4 rounded-lg border bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          placeholder="Enter a project name"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          placeholder="Describe the project (optional)"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          disabled={isLoading}
        >
          {editing ? "Update Project" : "Add Project"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded bg-gray-400 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-500 disabled:opacity-60"
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}