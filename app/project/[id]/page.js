// app/project/[id]/page.js

import Link from "next/link";
import { notFound } from "next/navigation";
import api from "../../../lib/api";
import ProjectDetailCard from "../components/ProjectDetailCard";

// Get a single project
async function getProject(id) {
  try {
    const res = await api.get(`/projects/${id}`);
    return res.data.data || res.data;
  } catch (error) {
    if (error.response?.status === 404) {
      notFound();
    }
    throw error;
  }
}

// Get tasks that belong to this project
async function getTasksForProject(projectId) {
  try {
    const res = await api.get("/tasks");
    const tasks = res.data.data || res.data || [];

    return tasks.filter(
      (task) => task.project?.id?.toString() === projectId.toString()
    );
  } catch (error) {
    console.warn("Unable to load tasks for project:", error.message);
    return [];
  }
}

// Get milestones that belong to this project
async function getMilestonesForProject(projectId) {
  try {
    const res = await api.get("/milestones");
    const milestones = res.data.data || res.data || [];

    return milestones.filter(
      (milestone) => milestone.project?.id?.toString() === projectId.toString()
    );
  } catch (error) {
    console.warn("Unable to load milestones for project:", error.message);
    return [];
  }
}

// Project detail page 
export default async function ProjectDetail({ params }) {
  const { id } = await params;

  const project = await getProject(id);
  const createdAt = project.created?.human || project.created_at;

  const [tasks, milestones] = await Promise.all([
    getTasksForProject(id),
    getMilestonesForProject(id),
  ]);

  return (
    <main className="min-h-[80vh]  px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Back link */}
        <Link
          href="/project"
          className="text-sm text-blue-700 hover:underline"
        >
          ← Back to projects
        </Link>

        {/* Project detail card with tasks & milestones inside */}
        <ProjectDetailCard
          project={project}
          createdAt={createdAt}
          tasks={tasks}
          milestones={milestones}
        />

      {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/task/new?project=${project.id}`}
            className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100"
          >
            Add Task for this Project
          </Link>

          <Link
            href={`/milestone/new?project=${project.id}`}
            className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
          >
            Add Milestone for this Project
          </Link>
        </div>
      </div>
    </main>
  );
}

// Pre-generate static project pages
export async function generateStaticParams() {
  if (
    !process.env.NEXT_PUBLIC_API_URL ||
    !process.env.NEXT_PUBLIC_API_TOKEN
  ) {
    return [];
  }

  try {
    const res = await api.get("/projects");
    const projects = res.data.data || res.data || [];

    return projects
      .filter((project) => project?.id)
      .map((project) => ({ id: project.id.toString() }));
  } catch (error) {
    console.warn("Unable to pre-generate project pages:", error.message);
    return [];
  }
}
