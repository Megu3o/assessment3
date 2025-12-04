// app/project/components/ProjectCard.js
"use client";

import Link from "next/link";

export default function ProjectCard({ project, onDelete }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Project name */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <Link
          href={`/project/${project.id}`}
          className="text-lg font-semibold text-blue-700 hover:underline"
        >
          {project.name}
        </Link>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm text-slate-600">
        {project.description || "No description"}
      </p>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {/* View details */}
        <Link
          href={`/project/${project.id}`}
          className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 hover:bg-blue-100"
        >
          View Details
        </Link>

        {/* Edit button */}
        <Link
          href={`/project/${project.id}/edit`}
          className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100"
        >
          Edit
        </Link>

        {/* Delete button */}
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
