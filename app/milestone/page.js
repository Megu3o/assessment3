"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import MilestoneCard from "./components/MilestoneCard";
import LoadingText from "../project/components/LoadingText";
import StatusMessage from "../project/components/StatusMessage";

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load all milestones from the API
  const loadMilestones = async (message = "") => {
    try {

      setIsLoading(true);
      setError("");

      const res = await api.get("/milestones");
      const data = res.data.data || res.data || [];

      setMilestones(data);
      if (message) setSuccess(message);
    } catch (err) {
      setError(err.message || "Error loading milestones.");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  // Load once on first render
  useEffect(() => {
    loadMilestones("Milestones loaded successfully.");
  }, []);

  // Delete milestone
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this milestone?")) return;

    try {
      setError("");
      setSuccess("");

      await api.delete(`/milestones/${id}`);

      const newList = milestones.filter((milestone) => milestone.id !== id);
      setMilestones(newList);

      setSuccess("Milestone deleted successfully.");
    } catch (err) {
      setError(err.message || "Error deleting milestone.");
      setSuccess("");
    }
  };

  return (
  <main className="min-h-[80vh] px-10 py-20">
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-8 flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-blue-900 text-center">
          Milestones
        </h1>
      </div>

      {/* Status messages */}
      <StatusMessage error={error} success={success} />

      {/* Loading indicator */}
      <LoadingText isLoading={isLoading} text="Loading milestones..." />

      {/* Milestone list */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {milestones.map((milestone) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            onDelete={() => handleDelete(milestone.id)}
          />
        ))}

        {!isLoading && milestones.length === 0 && !error && (
          <p className="text-sm text-gray-500">No milestones found.</p>
        )}
      </div>
    </div>
  </main>
);

}
