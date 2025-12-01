"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api.js";
import MilestoneCard from "./components/MilestoneCard.js";
import LoadingText from "../project/components/LoadingText.js";
import StatusMessage from "../project/components/StatusMessage.js";

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

      const newList = milestones.filter((m) => m.id !== id);
      setMilestones(newList);

      setSuccess("Milestone deleted successfully.");
    } catch (err) {
      setError(err.message || "Error deleting milestone.");
      setSuccess("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Milestones</h1>

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
  );
}
