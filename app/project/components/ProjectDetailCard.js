// app/project/components/ProjectDetailCard.js

export default function ProjectDetailCard({ project, createdAt }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">
        {project.name}
      </h1>

      {project.description && (
        <p className="mt-2 text-slate-700">
          {project.description}
        </p>
      )}

      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Project ID
          </dt>
          <dd className="mt-1 font-mono text-sm text-slate-900 break-all">
            {project.id}
          </dd>
        </div>

        {createdAt && (
          <div className="rounded-xl border border-slate-200 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Created
            </dt>
            <dd className="mt-1 text-sm text-slate-900">
              {createdAt}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
