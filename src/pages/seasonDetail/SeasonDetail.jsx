import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSeasonDeatilQuery } from "../../Redux/TmdbApi";

import Container from "../../components/Container/Container";
import { TMDB_IMAGE_BASE } from "../../data/data";
import { FaArrowLeft, FaCalendar, FaClock, FaNetworkWired, FaPlay, FaStar } from "react-icons/fa";
import Loading from "../../components/fetchHandler/Loading";
import Erorre from "../../components/fetchHandler/Erorre";

const SeasonDetail = () => {
  const { name, id, season } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetSeasonDeatilQuery({
    series_id: id,
    season_number: season,
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isLoading) return <Loading />;
  if (error) return <Erorre errorDetail={error.data.status_message} />;

  return (
    <Container>
      <div className="py-12">
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={`${TMDB_IMAGE_BASE}/${data.poster_path}`}
                alt={season.name}
                className="w-64 h-96 rounded-xl shadow-2xl object-cover mx-auto lg:mx-0"
              />
            </div>

            <div className="flex-1">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-purple-700 font-bold hover:text-purple-900 cursor-pointer mb-4 transition-colors animate-pulse">
                <FaArrowLeft className="w-5 h-5" />
                Back to
              </button>

              <h1 className="text-4xl md:text-6xl font-bold uppercase  italic font-['Bebas_neue'] mb-5">
                {name}
              </h1>
              <h1 className="text-2xl md:text-3xl font-bold uppercase  italic font-['Bebas_neue'] mb-5">
                Season {season}
              </h1>
              {/* Season Info Bar */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">
                  <FaStar className="w-4 h-4 fill-current font-bold" />
                  <span>{data.vote_average ? data.vote_average.toFixed(1) : "N/A"}</span>
                </div>
                <div className="flex items-center gap-1 font-bold">
                  <FaCalendar className="w-4 h-4" />
                  <span>{data.air_date ? new Date(data.air_date).getFullYear() : "TBA"}</span>
                </div>
                <div className="flex items-center gap-1 font-bold">
                  <FaPlay className="w-4 h-4" />
                  <span>{data.episodes.length} Episodes</span>
                </div>
                <div className="flex items-center gap-1 font-bold">
                  <FaNetworkWired className="w-4 h-4" />
                  <span> Network :</span>
                  <span>{data.networks.map((n) => n.name).join(", ")}</span>
                </div>
              </div>

              {/* Season Overview */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Season Overview</h3>
                <p className="leading-relaxed">
                  {data.overview || `Season ${data.season_number} of ${data.name}.`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold  mb-6 flex items-center gap-2">
            <FaPlay className="w-6 h-6 text-blue-500" />
            All Episodes ({data.episodes.length})
          </h2>

          <div className="space-y-4">
            {data.episodes.map((episode, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(`/${name}/${id}/${season}/${episode.episode_number}`, {
                    state: { episode },
                  })
                }
                className={`bg-[#121212] rounded-lg p-4 hover:bg-[#212121] transition-colors cursor-pointer`}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-40 md:h-30 rounded bg-slate-700 flex-shrink-0 overflow-hidden">
                    {episode.still_path ? (
                      <img
                        src={`${TMDB_IMAGE_BASE}/${episode.still_path}`}
                        alt={episode.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <FaPlay className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-white">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg truncate">
                        {episode.episode_number}. {episode.name}
                      </h3>
                      <div className="flex items-center gap-1 text-yellow-500 ml-4">
                        <FaStar className="w-4 h-4 fill-current" />
                        <span className="text-sm">{episode.vote_average.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm  mb-2">
                      <div className="flex items-center gap-1">
                        <FaCalendar className="w-3 h-3" />
                        <span>{episode.air_date ? formatDate(episode.air_date) : "TBA"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        <span>{formatRuntime(episode.runtime)}</span>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm line-clamp-2">
                      {episode.overview || "No episode description available."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SeasonDetail;
