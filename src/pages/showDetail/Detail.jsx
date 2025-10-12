import { FaStar, FaCalendarAlt, FaClock } from "react-icons/fa";
import { TMDB_IMAGE_BASE } from "../../data/data";

const Detail = ({ data, type }) => {
  const formatRuntime = (runtimes) => {
    if (!runtimes.length) return "N/A";
    const avg = Math.round(runtimes.reduce((a, b) => a + b, 0) / runtimes.length);
    return `${avg}min`;
  };

  const formatRuntimeMovie = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="-mt-45 relative z-10 flex flex-col md:flex-row items-center justify-center gap-5 ">
      <div className="flex-shrink-0">
        <img
          src={`${TMDB_IMAGE_BASE}/${data.poster_path}`}
          alt={data.name}
          className="w-64 h-96 rounded-xl shadow-2xl object-cover mx-auto lg:mx-0"
        />
      </div>
      <div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-2 italic font-['Bebas_neue']  md:text-white">
          {data.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">
            <FaStar className="w-4 h-4 fill-current" />
            <span>{data.vote_average.toFixed(1)}</span>
          </div>
          {data.first_air_date && (
            <div className="flex items-center gap-1 text-[#3590F3]">
              <FaCalendarAlt className="w-4 h-4" />
              <span>{new Date(data.first_air_date).getFullYear()}</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-[#3590F3]">
            <FaClock className="w-4 h-4" />
            <span>
              {type === "tv"
                ? formatRuntime(data.episode_run_time)
                : formatRuntimeMovie(data.runtime)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#3590F3]">
            <FaStar className="w-4 h-4" />
            <span>
              {data.number_of_seasons} Season{data.number_of_seasons !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="text-[#3590F3]">
            <span className="bg-white px-2 py-1 rounded text-sm">{data.status}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {data.genres.map((genre) => (
            <span
              key={genre.id}
              className="bg-[#3590F3] text-white px-3 py-1 rounded-full text-sm font-medium">
              {genre.name}
            </span>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Overview</h3>
          <p className="leading-relaxed">{data.overview}</p>
        </div>
        {type === "tv" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-extrabold">Total Episodes:</span>
              <span className="ml-2">{data.number_of_episodes}</span>
            </div>
            <div>
              <span className="font-extrabold">Networks:</span>
              <span className="ml-2">{data.networks.map((n) => n.name).join(", ")}</span>
            </div>
            {data.created_by.length > 0 && (
              <div>
                <span className="font-extrabold">Created by:</span>
                <span className="ml-2 ">{data.created_by.map((c) => c.name).join(", ")}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Budget:</span>
              <span className="ml-2">{data.budget ? formatCurrency(data.budget) : "N/A"}</span>
            </div>
            <div>
              <span className="font-semibold">Revenue:</span>
              <span className="ml-2">{data.revenue ? formatCurrency(data.revenue) : "N/A"}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
