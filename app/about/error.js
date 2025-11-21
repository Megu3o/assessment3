
"use client";

export default function Error({ error, reset }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-red-50">
      <div className="mx-auto max-w-lg px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-red-700">
          Error Occurred
        </h1>
        <p className="mt-3 text-sm text-red-800">
          {error.message}
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow-sm transition-colors hover:bg-slate-700"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
