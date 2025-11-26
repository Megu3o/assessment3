// app/project/[id]/edit/page.js
import api from "../../../../lib/api";
import EditProjectClient from "./EditProjectClient";

// Server component: just passes id into the client component
export default function EditProjectPage({ params }) {
  const { id } = params;
  return <EditProjectClient id={id} />;
}

/**
 * Next needs this for output: "export" because [id] is a dynamic route.
 */
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
    console.warn(
      "Unable to pre-generate project edit pages:",
      error.message
    );
    return [];
  }
}
