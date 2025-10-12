import { useNavigate } from "react-router-dom";
import { TMDB_IMAGE_BASE } from "../../data/data";
import { FaAward } from "react-icons/fa";
import { useSelector } from "react-redux";

const CardPeople = ({ actor, index }) => {
  const { mode } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/people/${actor.id}`)}
      key={index}
      className={`${
        mode === "dark" ? "bg-[#1a1a1a] hover:bg-[#2a2a2a]" : "bg-white hover:bg-gray-50"
      }  rounded-lg p-4 text-center  transition-colors w-full h-full cursor-pointer  duration-300 shadow-lg  hover:scale-105`}>
      <div className="w-20 h-20 mx-auto mb-3 overflow-hidden rounded-full bg-slate-700">
        {actor.profile_path ? (
          <img
            src={`${TMDB_IMAGE_BASE}/${actor.profile_path}`}
            alt={actor.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-slate-400">
            <FaAward className="w-8 h-8" />
          </div>
        )}
      </div>
      <h3 className="mb-1 text-sm font-semibold truncate">{actor.name || "No Name"}</h3>
      <p className="text-xs font-bold truncate text-slate-400">
        {actor.department || actor.character || actor.known_for_department || "No Department"}
      </p>
    </div>
  );
};

export default CardPeople;
