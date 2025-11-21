"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const API_KEY = "GurS0wJyr12na3jhvOraArdY3bGr64N2ovBUUTh5";

export default function ApodDetailsPage() {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!date) {
      setApodData(null);
      setError("");
      return;
    }

    const fetchApodDetail = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch APOD details.");
        }

        const data = await response.json();
        setApodData(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unexpected error fetching APOD details.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchApodDetail();
  }, [date]);

  return (
    <section className="py-8 md:py-10">
      <div className="mx-auto max-w-4xl px-4">
        {/* Back button */}
        <div className="mb-4">
          <Link
            href="/nasa-api"
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            &larr; Back to NASA API
          </Link>
        </div>

        {/* No date selected */}
        {!date && (
          <p className="text-sm text-red-600">
            No date supplied. Please choose an item from the NASA API page.
          </p>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-2 py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-600" />
            <p className="text-sm text-slate-600">Loading details...</p>
          </div>
        )}

        {/* Error message */}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        {/* APOD content */}
        {apodData && !error && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {apodData.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">{apodData.date}</p>

            {apodData.media_type === "image" ? (
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src={apodData.url}
                  alt={apodData.title}
                  width={800}
                  height={600}
                  unoptimized
                  className="h-auto w-full"
                />
              </div>
            ) : (
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  src={apodData.url}
                  title={`APOD video for ${apodData.title}`}
                  className="h-full w-full"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              {apodData.explanation}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
