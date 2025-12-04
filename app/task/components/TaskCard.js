// app/tasks/components/TaskCard.js
"use client";

import Link from "next/link";

export default function TaskCard({ task, onDelete }) {
  const projectName = task.project?.name || "No project linked";
  const dueLabel = task.due_date || "No due date";
  const createdLabel = task.created?.human || "";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Task name */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold text-blue-700">
          {task.name || "Untitled task"}
        </h2>
      </div>

      {/* Description */}
      <p className="mb-3 text-sm text-slate-600">
        {task.description || "No description"}
      </p>

      {/* Meta info (similar style to project card text) */}
      <div className="mb-4 space-y-1 text-xs text-gray-500">
        <p>Project: {projectName}</p>
        <p>Status: {task.status || "Unknown"}</p>
        <p>Due: {dueLabel}</p>
        {createdLabel && <p>Created: {createdLabel}</p>}
      </div>

      {/* Actions – same pill style as ProjectCard */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Edit */}
        <Link
          href={`/task/${task.id}/edit`}
          className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100"
        >
          Edit
        </Link>

        {/* Delete */}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center justify-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
