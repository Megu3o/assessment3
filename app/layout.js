import Link from "next/link";
import "../styles/globals.css";

export const metadata = {
  title: "AT3 Next.js App",
  description: "A modern application built with Next.js and Tailwind CSS",
  openGraph: {
    title: "AT3 Next.js App",
    description: "A modern web application built with Next.js and Tailwind CSS",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "App Logo",
      },
    ],
    siteName: "AT3 Next.js App",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        {/* Navbar */}
        <nav className="bg-slate-900 text-slate-100">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              AT3 Next.js App
            </Link>

            <div className="flex gap-4 text-sm">
              <Link
                href="/"
                className="hover:text-emerald-300 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/project"
                className="hover:text-emerald-300 transition-colors"
              >
                Project
              </Link>
              <Link
                href="/nasa-api"
                className="hover:text-emerald-300 transition-colors"
              >
                NASA API
              </Link>
              <Link
                href="/about"
                className="hover:text-emerald-300 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </nav>

        {/* Main content section */}
        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200">
          <div className="mx-auto max-w-5xl px-4 py-4 text-center text-xs text-slate-500">
            © 2025 <span className="font-semibold">AT3 Next.js App</span>. Built
            with Next.js & Tailwind CSS
          </div>
        </footer>
      </body>
    </html>
  );
}
