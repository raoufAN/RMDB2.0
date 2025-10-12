import { useState } from "react";
import { useGetPeopleActingQuery } from "../../Redux/TmdbApi";
import SwipperWrapperForCard from "../../components/wrapperSwiper/SwipperWrapperForCard";
import { TMDB_IMAGE_BASE } from "../../data/data";
import { SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import Erorre from "../../components/fetchHandler/Erorre";
import Loading from "../../components/fetchHandler/Loading";
import { FaCamera } from "react-icons/fa";
import { MdOutlineMovieCreation } from "react-icons/md";
import { GiDramaMasks } from "react-icons/gi";

const Acting = ({ person_id }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const { data, isLoading, error } = useGetPeopleActingQuery({ person_id });
  const { mode } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (error) return <Erorre />;

  return (
    <div className="flex flex-col space-y-6">
      <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold">
        <GiDramaMasks className="w-8 h-8 text-purple-600" />
        Cast ({data.cast.length})
      </h2>
      {data.cast && data.cast.length > 0 ? (
        <SwipperWrapperForCard Datalength={data.cast.length > 5}>
          {data.cast.map((element, index) => (
            <SwiperSlide key={index}>
              <div
                className="overflow-hidden group rounded-xl"
                onClick={() => setShowOverlay(!showOverlay)}>
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={`${TMDB_IMAGE_BASE}/${element.poster_path}`}
                    alt={element.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center space-x-5 text-white z-30 group-hover:opacity-100
                            ${showOverlay ? "opacity-100" : "opacity-0"}`}>
                    <span
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`detail/${element.media_type}/${element.id}`);
                      }}>
                      <BsFillInfoCircleFill size={24} />
                    </span>
                    <span className="cursor-pointer">
                      <IoBookmark size={24} />
                    </span>
                    <span className="cursor-pointer">
                      <FaHeart size={24} />
                    </span>
                  </div>
                </div>
                <div
                  className={`${
                    mode === "dark" ? "bg-[#1a1a1a]  text-white" : "bg-[#ffffff]  text-black"
                  } p-3 flex flex-col space-y-2`}>
                  <div className="flex items-center ">
                    <span className="mr-1 text-sm font-bold whitespace-nowrap">Character :</span>
                    <span className="text-sm font-semibold line-clamp-1">
                      {element.character || "No character"}
                    </span>
                  </div>
                  <span className="text-sm font-semibold line-clamp-1">
                    {element.title || element.name || " No Name"}
                  </span>
                  <div className="flex items-center">
                    <span className="mr-1 text-sm font-bold">Type :</span>
                    <span className="text-sm font-semibold line-clamp-1">{element.media_type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaStar className="mb-1 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{element.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </SwipperWrapperForCard>
      ) : (
        <div className="flex items-center justify-center h-40 ">(No cast)</div>
      )}
      <h2 className="flex items-center gap-2 my-6 text-2xl font-bold">
        <MdOutlineMovieCreation className="w-8 h-8 text-yellow-500" />
        Crew ({data.crew.length})
      </h2>

      {data.crew && data.crew.length > 0 ? (
        <SwipperWrapperForCard Datalength={data.crew.length > 5}>
          {data.crew.map((element, index) => (
            <SwiperSlide key={index}>
              <div
                className="overflow-hidden group rounded-xl"
                onClick={() => setShowOverlay(!showOverlay)}>
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={`${TMDB_IMAGE_BASE}/${element.poster_path}`}
                    alt={element.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center space-x-5 text-white z-30 group-hover:opacity-100
                            ${showOverlay ? "opacity-100" : "opacity-0"}`}>
                    <span
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`detail/${element.media_type}/${element.id}`);
                      }}>
                      <BsFillInfoCircleFill size={24} />
                    </span>
                    <span className="cursor-pointer">
                      <IoBookmark size={24} />
                    </span>
                    <span className="cursor-pointer">
                      <FaHeart size={24} />
                    </span>
                  </div>
                </div>
                <div
                  className={`${
                    mode === "dark" ? "bg-[#1a1a1a]  text-white" : "bg-[#ffffff]  text-black"
                  } p-3 flex flex-col space-y-2`}>
                  <div className="flex items-center ">
                    <span className="mr-1 text-sm font-bold whitespace-nowrap">Character :</span>
                    <span className="text-sm font-semibold line-clamp-1">
                      {element.character || "No character"}
                    </span>
                  </div>
                  <div className="flex items-center ">
                    <span className="mr-1 text-sm font-bold whitespace-nowrap">Department :</span>
                    <span className="text-sm font-semibold line-clamp-1">{element.department}</span>
                  </div>

                  <span className="text-sm font-semibold line-clamp-1">
                    {element.title || element.name || " No Name"}
                  </span>
                  <div className="flex items-center">
                    <span className="mr-1 text-sm font-bold">Type :</span>
                    <span className="text-sm font-semibold line-clamp-1">{element.media_type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaStar className="mb-1 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{element.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </SwipperWrapperForCard>
      ) : (
        <div className="flex items-center justify-center h-40 ">(No Crew)</div>
      )}
    </div>
  );
};

export default Acting;
