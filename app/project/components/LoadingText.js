"use client";

export default function LoadingText({ isLoading, text }) {
  if (!isLoading) return null;

  return (
    <p className="mb-2 text-sm text-gray-500">
      {text}
    </p>
  );
}
