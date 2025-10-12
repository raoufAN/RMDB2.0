import { useLocation, useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import { TMDB_IMAGE_BASE } from "../../data/data";
import { FaArrowLeft, FaAward, FaCalendar, FaClock, FaStar } from "react-icons/fa";
import WrapperSwiper from "../../components/wrapperSwiper/WrapperSwiper";
import { SwiperSlide } from "swiper/react";
import { GiDramaMasks } from "react-icons/gi";
import { MdOutlineMovieCreation } from "react-icons/md";
import CardPeople from "../../components/cardPeople/CardPeople";

const Episode = () => {
  const location = useLocation();
  const { name, season, episode: episode_number } = useParams();
  const navigate = useNavigate();
  const { episode } = location.state || {};

  console.log(episode);

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

  return (
    <Container>
      <div className="py-12">
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={`${TMDB_IMAGE_BASE}/${episode.still_path}`}
                alt={episode.name}
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
              <h1 className="text-2xl md:text-3xl font-bold uppercase  italic font-['Bebas_neue'] mb-5 flex gap-2">
                <span>Season {season} </span>
                <span>Episode {episode_number}</span>
              </h1>
              {/* Season Info Bar */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full font-semibold">
                  <FaStar className="w-4 h-4 fill-current font-bold" />
                  <span>{episode.vote_average ? episode.vote_average.toFixed(1) : "N/A"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendar className="w-4 h-4" />
                  <span>{episode.air_date ? formatDate(episode.air_date) : "TBA"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="w-4 h-4" />
                  <span>{formatRuntime(episode.runtime)}</span>
                </div>
              </div>

              {/* Season Overview */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Season Overview</h3>
                <p className="leading-relaxed">
                  {episode.overview ||
                    `Season ${season} of ${name} episode number ${episode_number}.`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold my-5 flex items-center gap-2">
            <GiDramaMasks className="w-8 h-8 text-purple-600" />
            Cast ({episode.crew.length})
          </h2>
          {episode.crew && episode.crew.length > 0 ? (
            <WrapperSwiper dataLength={episode.crew.length > 5}>
              {episode.crew.map((actor, index) => (
                <SwiperSlide key={index}>
                  {episode.crew.length > 0 ? (
                    <CardPeople actor={actor} index={index} />
                  ) : (
                    <>no crew</>
                  )}
                </SwiperSlide>
              ))}
            </WrapperSwiper>
          ) : (
            <div className="h-40 flex items-center justify-center">(No crew)</div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold my-5 flex items-center gap-2">
            <MdOutlineMovieCreation className="w-8 h-8 text-yellow-600" />
            Guest Stars ({episode.guest_stars.length})
          </h2>
          {episode.guest_stars && episode.guest_stars.length > 0 ? (
            <WrapperSwiper dataLength={episode.guest_stars.length > 5}>
              {episode.guest_stars.map((actor, index) => (
                <SwiperSlide key={index}>
                  <CardPeople actor={actor} index={index} />
                </SwiperSlide>
              ))}
            </WrapperSwiper>
          ) : (
            <div className="h-40 flex items-center justify-center ">(No Guest Stars)</div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Episode;
