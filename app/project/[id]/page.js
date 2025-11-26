import Link from "next/link";
import { notFound } from "next/navigation";
import api from "../../../lib/api";
import ProjectDetailCard from "../components/ProjectDetailCard";

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

export default async function ProjectDetail({ params }) {
  // params is already a plain object – no need for await
  const { id } = params;
  const project = await getProject(id);
  const createdAt = project.created?.human || project.created_at;

  return (
    <main className="min-h-[80vh] bg-blue-50/60 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Back link */}
        <Link
          href="/project"
          className="text-sm text-blue-700 hover:underline"
        >
          ← Back to projects
        </Link>

        {/* Project detail card */}
        <ProjectDetailCard project={project} createdAt={createdAt} />

        {/* Task actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          {/* Pass project ID in the query string */}
          <Link
            href={`/task/new?project=${project.id}`}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            Add Task for this Project
          </Link>
        </div>
      </div>
    </main>
  );
}

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
