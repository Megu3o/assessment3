
"use client";

import Link from "next/link";

export default function TaskCard({ task, onDelete }) {
  const projectName = task.project?.name || "No project linked";
  const dueLabel = task.due_date || "No due date";
  const createdLabel = task.created?.human || "";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <h2 className="text-lg font-semibold text-blue-600">
        {task.name || "Untitled task"}
      </h2>

      <p className="mt-1 text-sm text-gray-600">
        {task.description || "No description"}
      </p>

      <div className="mt-2 space-y-1 text-xs text-gray-500">
        <p>Project: {projectName}</p>
        <p>Status: {task.status || "unknown"}</p>
        <p>Due: {dueLabel}</p>
        {createdLabel && <p>Created: {createdLabel}</p>}
      </div>

      <div className="mt-3 flex gap-2">
        <Link
          href={`/task/${task.id}/edit`}
          className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
