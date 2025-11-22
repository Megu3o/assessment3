"use client";

export default function StatusMessage({ error, success }) {
  if (error) {
    return (
      <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p className="font-semibold">Unable to complete the action</p>
        <p>{error}</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
        <p className="font-semibold">Success</p>
        <p>{success}</p>
      </div>
    );
  }

  return null;
}
