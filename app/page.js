// app/page.js
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex justify-center px-4 pt-24">
      <div className="w-full max-w-3xl">
        <h1 className="mb-16 text-center text-3xl font-bold text-slate-900">
          Welcome to the NM TAFE Next.js App
        </h1>

        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          {/* New Project */}
          <Link
            href="/project"
            className="group w-full max-w-md h-56 rounded-3xl border border-blue-200 bg-blue-50 px-8 py-10 text-center transition hover:bg-blue-100 shadow-sm flex flex-col justify-center"
          >
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-blue-800">
                New Project
              </h2>
              <p className="text-lg text-blue-900/80">
                Create a new project 
              </p>
            </div>
          </Link>

          {/* Manage Projects */}
          <Link
            href="/project"
            className="group w-full max-w-md h-56 rounded-3xl border border-emerald-200 bg-emerald-50 px-8 py-10 text-center transition hover:bg-emerald-100 shadow-sm flex flex-col justify-center"
          >
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-emerald-800">
                Manage Projects
              </h2>
              <p className="text-lg text-emerald-900/80">
                Select a project to view its details and manage related tasks.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
