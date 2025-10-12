import { FaPlay } from "react-icons/fa";

const TrailerButton = ({ id, type }) => {
  const handleTrailer = async (id, type) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const data = await res.json();
    console.log(data);
    const trailer = data.results.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");
    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    } else {
      alert("No trailer available");
    }
  };
  return (
    <button
      className="px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        handleTrailer(id, type);
      }}>
      <FaPlay />
      <span className="text-sm font-semibold">Trailer</span>
    </button>
  );
};

export default TrailerButton;
