"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700" />
      <p className="text-sm text-slate-600">Loading data from NASA...</p>
    </div>
  );
}
