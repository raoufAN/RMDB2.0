import { TMDB_IMAGE_BASE } from "../../data/data";
import { useNavigate } from "react-router-dom";
import { FaTv } from "react-icons/fa";

const BoxSeason = ({ data, id }) => {
  const navigate = useNavigate();

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaTv className="w-8 h-8 text-[#3590F3] " />
        Seasons
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.seasons
          .filter((season) => season.season_number > 0)
          .map((season) => (
            <div
              key={season.id}
              className="bg-[#1a1a1a] p-4 rounded-lg overflow-hidden shadow-md shadow-[#3590F3]/50 hover:shadow-lg hover:bg-[#2a2a2a] hover:shadow-[#3590F3]/70 hover:-translate-y-2 transition duration-300 cursor-pointer">
              <div
                className="flex gap-4"
                onClick={() => {
                  navigate(`/${data.name}/${id}/${season.season_number}`);
                }}>
                <div className="w-16 h-24 rounded bg-[#3590F3] flex-shrink-0">
                  {season.poster_path ? (
                    <img
                      src={`${TMDB_IMAGE_BASE}/${data.poster_path}`}
                      alt={season.name}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <FaTv className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{season.name}</h3>
                  <p className="text-slate-400 text-sm mb-2">{season.episode_count} episodes</p>
                  <p className="text-slate-400 text-sm">
                    {season.air_date && new Date(season.air_date).getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default BoxSeason;
