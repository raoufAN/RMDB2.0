import { useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import { useGetGenresDetailsQuery } from "../../Redux/TmdbApi";
import Loading from "../../components/fetchHandler/Loading";
import Erorre from "../../components/fetchHandler/Erorre";
import { useState } from "react";
import ContentCard from "../../components/contentCard/ContentCard";
import PaginationWrapper from "../../components/paginationWrapper/PaginationWrapper";

const ShowAllByGenres = () => {
  const { name, type, id } = useParams();
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetGenresDetailsQuery({
    type: name.toLowerCase() === "movie" ? "movie" : "tv",
    genres_Id: id,
    page: page,
  });

  console.log(data);

  if (isLoading) return <Loading />;
  if (error) return <Erorre error={error.data.message} />;
  return (
    <Container>
      <h1 className="py-5 text-3xl md:text-5xl font-bold italic font-['Bebas_Neue'] text-center">
        {type} {name}
      </h1>
      <div className="grid grid-cols-2 gap-5 pb-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {data.results.map((element, index) => (
          <ContentCard element={element} sectionName={name} key={index} />
        ))}
      </div>
      <div className="flex items-center justify-center pb-5">
        <PaginationWrapper page={page} setPage={setPage} total_pages={data.total_pages} />
      </div>
    </Container>
  );
};

export default ShowAllByGenres;
