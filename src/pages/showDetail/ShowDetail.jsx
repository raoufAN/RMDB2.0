import { useParams } from "react-router-dom";
import { useGetDetailMovieAndSerieQuery } from "../../Redux/TmdbApi";
import { TMDB_IMAGE_ORIGINAL } from "../../data/data";
import Container from "../../components/Container/Container";
import BoxSeason from "./BoxSeason";
import Detail from "./Detail";
import Trailer from "./Trailer";
import Cast from "./Cast";
import Recommandation from "./Recommandation";
import Loading from "../../components/fetchHandler/Loading";
import Erorre from "../../components/fetchHandler/Erorre";
import CommentsDiv from "./commentsDiv/CommentsDiv";

const ShowDetail = () => {
  const { type, id } = useParams();
  const { data, error, isLoading } = useGetDetailMovieAndSerieQuery({ type, id });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Erorre />;
  }

  return (
    <div className="">
      <div
        className="relative bg-center bg-cover h-96"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(15,23,42,0.9)), url(${`${TMDB_IMAGE_ORIGINAL}/${data.backdrop_path}`})`,
        }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <Container>
        <Detail data={data} type={type} />
        <CommentsDiv />
        {type === "tv" && <BoxSeason data={data} id={id} />}
        <Cast type={type} id={data.id} />
        <Trailer type={type} id={data.id} />
        <Recommandation type={type} id={data.id} />
      </Container>
    </div>
  );
};

export default ShowDetail;
