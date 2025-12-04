
export default function ProjectDetailCard({
  project,
  createdAt,
  tasks = [],
  milestones = [],
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Project title + description */}
      <h1 className="text-3xl font-bold text-slate-900">
        {project.name}
      </h1>

      {project.description && (
        <p className="mt-2 text-slate-700">
          {project.description}
        </p>
      )}

      {/* Project meta */}
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

      {/* Tasks */}
      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Tasks for this Project
        </h2>

        {tasks.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No tasks yet.</p>
        ) : (
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Task
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {task.name || "Untitled task"}
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  Due: {task.due_date || "No due date"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Milestones */}
      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Milestones for this Project
        </h2>

        {milestones.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No milestones yet.</p>
        ) : (
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {milestones.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Milestone
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {m.title || "Untitled milestone"}
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  Due: {m.due_date || "No due date"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
