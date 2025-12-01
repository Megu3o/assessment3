// app/task/[id]/edit/page.js
import EditTaskClient from "./EditTaskClient";
import api from "../../../../lib/api";

// SERVER component wrapper
export default async function EditTaskPage({ params }) {
  const { id } = await params; 
  return <EditTaskClient id={id} />;
}

export async function generateStaticParams() {
  if (
    !process.env.NEXT_PUBLIC_API_URL ||
    !process.env.NEXT_PUBLIC_API_TOKEN
  ) {
    return [];
  }

  try {
    const res = await api.get("/tasks");
    const tasks = res.data.data || res.data || [];

    return tasks
      .filter((task) => task?.id)
      .map((task) => ({ id: task.id.toString() }));
  } catch (error) {
    console.warn("Unable to pre-generate task edit pages:", error.message);
    return [];
  }
}
