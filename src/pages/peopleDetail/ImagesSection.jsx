import { useState } from "react";
import { useGetPeopleImageQuery } from "../../Redux/TmdbApi";
import { FaChevronLeft, FaChevronRight, FaUser } from "react-icons/fa";
import { TMDB_IMAGE_BASE } from "../../data/data";
import { SwiperSlide } from "swiper/react";
import WrapperSwiper from "../../components/wrapperSwiper/WrapperSwiper";
import Erorre from "../../components/fetchHandler/Erorre";
import Loading from "../../components/fetchHandler/Loading";

const ImagesSection = ({ person_id, person_name }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    data: images,
    error: imagesError,
    isLoading: imagesLoading,
  } = useGetPeopleImageQuery({ person_id });

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1 >= images.profiles.length ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 < 0 ? images.profiles.length - 1 : prev - 1));
  };

  if (imagesLoading) return <Loading />;
  if (imagesError) return <Erorre />;

  return (
    <div className="bg-[#121212] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">
          Photo {currentImageIndex + 1} of {images.profiles.length}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevImage}
            className="p-2 bg-[#3590F3] text-white rounded-full hover:bg-[#341b99] cursor-pointer  transition-colors">
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="p-2 bg-[#3590F3] text-white rounded-full hover:bg-[#341b99] cursor-pointer  transition-colors">
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="aspect-[3/4] max-w-md mx-auto rounded-lg overflow-hidden bg-slate-700">
        <img
          src={`${TMDB_IMAGE_BASE}/${
            images?.profiles[currentImageIndex]?.file_path ||
            images?.profiles[currentImageIndex]?.poster_path
          }`}
          alt={`${person_name} photo ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      <WrapperSwiper dataLength={images.profiles.length}>
        {images.profiles.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              key={index}
              className="h-64 cursor-pointer"
              onClick={() => setCurrentImageIndex(index)}>
              <img
                src={`${TMDB_IMAGE_BASE}/${image.file_path || image.poster_path}`}
                alt={person_name}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </WrapperSwiper>
    </div>
  );
};

export default ImagesSection;
