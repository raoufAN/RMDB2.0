import { useSelector } from "react-redux";
import { TMDB_IMAGE_BASE } from "../../data/data";
import TrailerButton from "./TrailerButton";
import { FaStar } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHandleWatchlist from "../../Hooks/useHandleWatchlist";
import useHandleFavorites from "../../Hooks/useHandleFavorites";

const ContentCard = ({ element, sectionName }) => {
  const { mode } = useSelector((state) => state.theme);
  const { watchlist, favoriteList } = useSelector((state) => state.auth);
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const handleWatchlist = useHandleWatchlist();
  const handleFavorites = useHandleFavorites();

  const typeOfElment = sectionName.toLowerCase().includes("movie") ? "movie" : "tv";

  return (
    <div
      className="overflow-hidden group rounded-xl group-hover:scale-105:"
      onClick={() => setShowOverlay(!showOverlay)}>
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={`${TMDB_IMAGE_BASE}/${element.poster_path}`}
          alt={element.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center gap-3 text-white z-10 group-hover:opacity-100
            ${showOverlay ? "opacity-100" : "opacity-0"}`}
          onClick={(e) => e.stopPropagation()}>
          <button
            className="relative z-20 p-2 rounded-full cursor-pointer hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `/detail/${
                  element.media_type
                    ? element.media_type
                    : sectionName.toLowerCase().includes("movie")
                    ? "movie"
                    : "tv"
                }/${element.id}`
              );
            }}>
            <BsFillInfoCircleFill size={24} />
          </button>
          <button
            className="relative z-20 p-2 rounded-full cursor-pointer hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              handleWatchlist(element, typeOfElment);
            }}>
            <IoBookmark
              size={24}
              className={
                watchlist.find((mark) => mark.title === (element.title || element.name))
                  ? "text-[#3590F3] "
                  : "text-white"
              }
            />
          </button>
          <button
            className="relative z-20 p-2 rounded-full cursor-pointer hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              handleFavorites(element, typeOfElment);
            }}>
            <FaHeart
              size={24}
              className={
                favoriteList.find((fav) => fav.title === (element.title || element.name))
                  ? "text-[#ff2277] "
                  : "text-white"
              }
            />
          </button>
        </div>
      </div>

      <div
        className={`${
          mode === "dark"
            ? "bg-[#1a1a1a] group-hover:bg-[#2a2a2a]   text-white"
            : "bg-[#ffffff] group-hover:bg-gray-50  text-black"
        } p-3 flex flex-col space-y-2`}>
        <span className="text-sm font-semibold line-clamp-1">{element.title || element.name}</span>
        <div className="flex items-center space-x-1">
          <FaStar className="mb-1 text-yellow-500 fill-current" />
          <span className="text-sm font-medium">{element.vote_average.toFixed(1)}</span>
        </div>
        <TrailerButton
          id={element.id}
          type={
            element.media_type
              ? element.media_type
              : sectionName.toLowerCase().includes("movie")
              ? "movie"
              : "tv"
          }
        />
      </div>
    </div>
  );
};

export default ContentCard;
