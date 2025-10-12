import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { useGetTrailerQuery } from "../../Redux/TmdbApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import Loading from "../../components/fetchHandler/Loading";
import Erorre from "../../components/fetchHandler/Erorre";

const Trailer = ({ type, id }) => {
  const { data, error, isLoading } = useGetTrailerQuery({ type, id });
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  useEffect(() => {
    if (data?.results?.length > 0) {
      const trailer =
        data.results.find((vid) => vid.type === "Trailer" && vid.site === "YouTube") ||
        data.results[0];
      setSelectedTrailer(trailer);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Erorre />;
  }

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold  mb-6 flex items-center gap-2">
        <FaPlay className="w-8 h-8 text-red-500" />
        Trailers & Videos
      </h2>

      {/* Main Trailer Player */}
      {selectedTrailer && (
        <div className="bg-[#121212] rounded-xl p-6 mb-6">
          <div className="aspect-video rounded-lg overflow-hidden mb-4">
            <iframe
              src={`https://www.youtube.com/embed/${selectedTrailer.key}`}
              title={selectedTrailer.name}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
          <h3 className="text-white text-lg font-semibold">{selectedTrailer.name}</h3>
        </div>
      )}

      {/* Trailer Thumbnails */}
      {data.results && data.results.length > 0 ? (
        <Swiper
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          loop={data.results.length > 5}
          spaceBetween={5}
          freeMode={true}
          modules={[FreeMode, Autoplay]}
          className="mySwiper w-full"
          breakpoints={{
            320: { slidesPerView: 1.7 }, // mobile
            640: { slidesPerView: 2 }, // tablet
            1024: { slidesPerView: 3.5 }, // desktop
            1440: { slidesPerView: 4 }, // big desktop
          }}>
          {data.results
            .filter((vid) => vid.site === "YouTube")
            .map((video, index) => (
              <SwiperSlide key={index}>
                <div
                  key={video.id}
                  onClick={() => setSelectedTrailer(video)}
                  className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-300 hover:scale-105  ${
                    selectedTrailer?.id === video.id ? "ring-2 ring-[#3590F3]" : ""
                  }`}>
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    alt={video.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
                    <FaPlay className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-medium truncate">{video.name}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <div className="h-40 flex items-center justify-center ">(No Trailer)</div>
      )}
    </section>
  );
};

export default Trailer;
