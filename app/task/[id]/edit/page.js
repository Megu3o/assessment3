
// This is the server-side page for /task/[id]/edit
// It gets the id from the URL and passes it to the client component(EditTaskClient.js)

import EditTaskClient from "./EditTaskClient";
import api from "../../../../lib/api";

export default async function EditTaskPage({ params }) {
  const { id } = params; 
  // Render the client component and give it the task id
  return <EditTaskClient id={id} />;
}

// This tells Next.js which /task/[id]/edit pages to pre-generate at build time
export async function generateStaticParams() {
  if (
    !process.env.NEXT_PUBLIC_API_URL ||
    !process.env.NEXT_PUBLIC_API_TOKEN
  ) {
    return [];
  }

  try {
    // Get all tasks from the API
    const res = await api.get("/tasks");
    const tasks = res.data.data || res.data || [];

    return tasks
     // Keep only tasks that have an id,
      .filter((task) => task?.id)
      .map((task) => ({ id: task.id.toString() }));
  } catch (error) {
    console.warn("Unable to pre-generate task edit pages:", error.message);
    return [];
  }
}
