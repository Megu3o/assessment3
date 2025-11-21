"use client";

import { useState } from "react";

const ApodForm = ({ fetchApodData }) => {
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState("");
  const [thumbs, setThumbs] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (date) params.date = date;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    if (count) params.count = count;
    if (thumbs) params.thumbs = true;
    fetchApodData(params);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      {/* Date */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">
          Date (YYYY-MM-DD)
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
      </div>

      {/* Start Date */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">
          Start Date (YYYY-MM-DD)
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
      </div>

      {/* End Date */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">
          End Date (YYYY-MM-DD)
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
      </div>

      {/* Count */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700">
          Count
        </label>
        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
      </div>

      {/* Thumbs */}
      <div className="flex items-center gap-2">
        <input
          id="thumbs"
          type="checkbox"
          checked={thumbs}
          onChange={(e) => setThumbs(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
        />
        <label
          htmlFor="thumbs"
          className="text-sm font-medium text-slate-700"
        >
          Include Video Thumbnails
        </label>
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow-sm transition-colors hover:bg-slate-700"
        >
          Fetch APOD
        </button>
      </div>
    </form>
  );
};

export default ApodForm;
