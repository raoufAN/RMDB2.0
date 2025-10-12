import { SwiperSlide } from "swiper/react";
import ContentCard from "../../components/contentCard/ContentCard";
import { useGetContentQuery } from "../../Redux/TmdbApi";
import SwipperWrapperForCard from "../../components/wrapperSwiper/SwipperWrapperForCard";
import Erorre from "../../components/fetchHandler/Erorre";
import Loading from "../../components/fetchHandler/Loading";

const CarouselSection = ({ sectionName, type }) => {
  const { data, error, isLoading } = useGetContentQuery({
    type: type,
    page: 1,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Erorre />;
  }
  return (
    <div className="pt-10">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-['Bebas_Neue']">{sectionName}</h1>
      </div>

      <SwipperWrapperForCard Datalength={data.results > 5}>
        {data.results.map((element, index) => (
          <SwiperSlide key={index}>
            <ContentCard element={element} sectionName={sectionName} />
          </SwiperSlide>
        ))}
      </SwipperWrapperForCard>
    </div>
  );
};

export default CarouselSection;
