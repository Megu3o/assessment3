"use client";

import { useState } from "react";

import ApodForm from "../components/ApodForm";
import ApodContent from "../components/ApodContent";

const NasaApi = () => {
  const [apodData, setApodData] = useState(null);
  const [error, setError] = useState("");

  const fetchApodData = async (params) => {
    const apiKey = "";
    let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    for (const key in params) {
      apiUrl += `&${key}=${params[key]}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setApodData(Array.isArray(data) ? data : [data]);
      setError("");
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
        NASA Astronomy Picture of the Day
      </h1>

      <ApodForm fetchApodData={fetchApodData} />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <ApodContent apodData={apodData} />
    </div>
  );
};

export default NasaApi;
