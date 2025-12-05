
import api from "../../../../lib/api";
import EditMilestoneClient from "./EditMilestoneClient";

export default function EditMilestonePage({ params }) {
  const { id } = params;
  return <EditMilestoneClient id={id} />;
}

export async function generateStaticParams() {
  if (
    !process.env.NEXT_PUBLIC_API_URL ||
    !process.env.NEXT_PUBLIC_API_TOKEN
  ) {
    return [];
  }

  try {
    const res = await api.get("/milestones");
    const milestones = res.data.data || res.data || [];

    return milestones
      .filter((milestone) => milestone?.id)
      .map((milestone) => ({ id: milestone.id.toString() }));
  } catch (error) {
    console.warn(
      "Unable to pre-generate milestone edit pages:",
      error.message
    );
    return [];
  }
}
