import { Autoplay } from "swiper/modules";
import { TMDB_IMAGE_ORIGINAL } from "../../data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import { useGetContentQuery } from "../../Redux/TmdbApi";
import { FaInfoCircle } from "react-icons/fa";
import Erorre from "../../components/fetchHandler/Erorre";
import Loading from "../../components/fetchHandler/Loading";
import { Link } from "react-router-dom";

const Hero = () => {
  const { data, error, isLoading } = useGetContentQuery({
    type: "tv/on_the_air",
    page: 1,
  });
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Erorre />;
  }

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="mySwiper relative h-96 md:h-[600px] overflow-hidden  group bg-white">
      {data.results.map((movie, index) => (
        <SwiperSlide className="text-black" key={index}>
          <img
            src={`${TMDB_IMAGE_ORIGINAL}/${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-2xl p-6 md:p-12">
              <h1 className="mb-4 text-3xl italic font-bold text-white md:text-5xl">
                {movie.name}
              </h1>

              <div className="flex items-center mb-4 space-x-4">
                <div className="flex items-center space-x-1">
                  <FaStar className="mb-1 text-yellow-500 fill-current" />
                  <span className="font-medium text-white">{movie.vote_average}</span>
                </div>
                <span className="text-gray-300">Series</span>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-gray-200 md:text-lg line-clamp-3">
                {movie.overview}
              </p>

              <Link
                to={`detail/tv/${movie.id}`}
                className="bg-[#3590F3] w-fit text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2  hover:bg-[#341b99] transition-colors">
                <FaInfoCircle />
                <span>More Info</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
