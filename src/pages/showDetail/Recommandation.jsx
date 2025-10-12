import { useGetRecommandationQuery } from "../../Redux/TmdbApi";
import { SwiperSlide } from "swiper/react";
import ContentCard from "../../components/contentCard/ContentCard";
import { AiOutlineGlobal } from "react-icons/ai";
import SwipperWrapperForCard from "../../components/wrapperSwiper/SwipperWrapperForCard";
import Erorre from "../../components/fetchHandler/Erorre";
import Loading from "../../components/fetchHandler/Loading";

const Recommandation = ({ type, id }) => {
  const { data, error, isLoading } = useGetRecommandationQuery({ type, id });

  if (isLoading) return <Loading />;
  if (error) return <Erorre />;

  return (
    <section className="pb-10">
      <h2 className="flex items-center gap-2 my-6 text-2xl font-bold">
        <AiOutlineGlobal className="w-8 h-8 text-green-500" />
        Recommendations
      </h2>
      <SwipperWrapperForCard Datalength={data.results.length > 5}>
        {data.results.map((element, index) => (
          <SwiperSlide key={index}>
            <ContentCard element={element} sectionName={type} />
          </SwiperSlide>
        ))}
      </SwipperWrapperForCard>
    </section>
  );
};

export default Recommandation;
