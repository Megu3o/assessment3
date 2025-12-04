
"use client";

import Link from "next/link";

export default function MilestoneCard({ milestone, onDelete }) {
  const projectName = milestone.project?.name || "No project linked";
  const dueLabel = milestone.due_date || "No due date";
  const completedLabel = milestone.completed_at || "Not completed";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Milestone title */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold text-blue-700">
          {milestone.title || "Untitled milestone"}
        </h2>
      </div>

      {/* Description */}
      <p className="mb-3 text-sm text-slate-600">
        {milestone.description || "No description"}
      </p>

      {/* Meta info */}
      <div className="mb-4 space-y-1 text-xs text-gray-500">
        <p>Project: {projectName}</p>
        <p>Due: {dueLabel}</p>
        <p>Completed: {completedLabel}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/milestone/${milestone.id}/edit`}
          className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100"
        >
          Edit
        </Link>

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
