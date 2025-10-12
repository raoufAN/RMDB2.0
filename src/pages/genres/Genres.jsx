import { useNavigate, useParams } from "react-router-dom";
import Erorre from "../../components/fetchHandler/Erorre";
import Loading from "../../components/fetchHandler/Loading";
import { useGetGenresTypesQuery } from "../../Redux/TmdbApi";
import Container from "../../components/Container/Container";
import { useSelector } from "react-redux";

const Genres = () => {
  const { mode } = useSelector((state) => state.theme);
  const { name } = useParams();
  const types = name.toLowerCase() === "series" ? "tv" : "movie";
  const { data, error, isLoading } = useGetGenresTypesQuery({ type: types });
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (error) return <Erorre />;

  return (
    <Container>
      <h1 className="py-5 text-3xl md:text-5xl font-bold italic font-['Bebas_Neue'] text-center">
        {name} Genres
      </h1>

      <div className="grid grid-cols-2 gap-5 pb-5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {data.genres.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/genres/${name}/${item.name}/${item.id}`)}
            className={`h-32 md:h-40 flex items-center justify-center p-6  transition-all duration-300 shadow-lg cursor-pointer rounded-xl hover:scale-105 bg-gradient-to-br 
            from-[#121212] to-[#0a0a0a] hover:from-[#1a1a1a] hover:to-[#0f0f0f] ${
              mode === "dark"
                ? "from-[#121212] to-[#0a0a0a] hover:from-[#1a1a1a] hover:to-[#0f0f0f] border-[#1a1a1a] shadow-black/40"
                : "from-[#ffffff] to-stone-50 hover:from-[#f5f5f5] hover:to-gray-50 border-[#dcdcdc] shadow-gray-300/50"
            }`}
            y={index}>
            <h1 className="text-2xl font-bold text-center w-fit">{item.name}</h1>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Genres;
