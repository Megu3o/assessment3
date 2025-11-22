"use client";

import Link from "next/link";

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className="rounded border p-4 shadow transition hover:shadow-md">
      <Link
        href={`/project/${project.id}`}
        className="text-lg font-semibold text-blue-600 hover:underline"
      >
        {project.name}
      </Link>

      <p className="mb-2 text-sm text-gray-600">
        {project.description || "No description"}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="rounded bg-yellow-500 px-3 py-1 text-xs font-semibold text-white hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
