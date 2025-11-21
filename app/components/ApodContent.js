import Image from "next/image";
import Link from "next/link";

const ApodContent = ({ apodData }) => {
  if (!apodData) {
    return (
      <p className="text-sm text-slate-500 text-center">
        Please enter parameters and click &quot;Fetch APOD&quot;.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {apodData.map((data, index) => (
        <article
          key={data.date ?? index}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          {data.media_type === "image" ? (
            <div className="overflow-hidden rounded-lg">
              <Image
                src={data.url}
                alt={data.title}
                width={800}
                height={600}
                unoptimized
                className="h-auto w-full"
              />
            </div>
          ) : (
            <div className="mt-2 aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={data.url}
                title={`APOD video for ${data.title}`}
                className="h-full w-full"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <h2 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">
            {data.title}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {data.explanation}
          </p>

          <Link
            href={`/nasa-api/details?date=${data.date}`}
            className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow-sm transition-colors hover:bg-slate-700"
          >
            View
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ApodContent;
