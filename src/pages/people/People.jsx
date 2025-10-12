import { useGetPopularPeopleQuery } from "../../Redux/TmdbApi";
import Loading from "../../components/fetchHandler/Loading";
import Erorre from "../../components/fetchHandler/Erorre";
import Container from "../../components/Container/Container";
import { useState } from "react";
import CardPeople from "../../components/cardPeople/CardPeople";
import PaginationWrapper from "../../components/paginationWrapper/PaginationWrapper";

const People = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useGetPopularPeopleQuery(page);

  if (isLoading) return <Loading />;
  if (error) return <Erorre />;

  return (
    <Container>
      <h1 className="py-5 text-3xl md:text-5xl font-bold italic font-['Bebas_Neue'] text-center">
        Popular People
      </h1>
      <div className="grid grid-cols-2 gap-5 pb-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data.results.map((element, index) => (
          <CardPeople actor={element} key={index} />
        ))}
      </div>
      <div className="flex items-center justify-center w-full pb-5">
        <PaginationWrapper page={page} setPage={setPage} total_pages={data.total_pages} />
      </div>
    </Container>
  );
};

export default People;
