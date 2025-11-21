"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-slate-50">
      <div className="mx-auto max-w-lg px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          404 - Page Not Found
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow-sm transition-colors hover:bg-slate-700"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
