import { useParams } from "react-router-dom";
import { useGetContentQuery } from "../../Redux/TmdbApi";
import Loading from "../../components/fetchHandler/Loading";
import Erorre from "../../components/fetchHandler/Erorre";
import Container from "../../components/Container/Container";
import ContentCard from "../../components/contentCard/ContentCard";
import { useState } from "react";
import PaginationWrapper from "../../components/paginationWrapper/PaginationWrapper";

const ShowAll = () => {
  const { title, name } = useParams();
  const [page, setPage] = useState(1);
  const type = name.includes("Trending")
    ? `trending/${title}/week`
    : `${title.toLowerCase()}/${name.split(" ").join("_").toLowerCase()}`;

  const { data, error, isLoading } = useGetContentQuery({ type, page: page });

  if (isLoading) return <Loading />;
  if (error) return <Erorre />;

  return (
    <Container>
      <h1 className="py-5 text-3xl md:text-5xl font-bold italic font-['Bebas_Neue'] text-center">
        {name} {title}
      </h1>
      <div className="grid grid-cols-2 gap-5 pb-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {data.results.map((element, index) => (
          <ContentCard element={element} sectionName={title} key={index} />
        ))}
      </div>
      <div className="flex items-center justify-center pb-5">
        <PaginationWrapper page={page} setPage={setPage} total_pages={data.total_pages} />
      </div>
    </Container>
  );
};

export default ShowAll;
