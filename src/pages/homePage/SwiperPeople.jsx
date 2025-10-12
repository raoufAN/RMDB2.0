import { useGetPopularPeopleQuery } from "../../Redux/TmdbApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import { Grid, Autoplay } from "swiper/modules";
import Loading from "../../components/fetchHandler/Loading";
import Erorre from "../../components/fetchHandler/Erorre";
import CardPeople from "../../components/cardPeople/CardPeople";

const SwiperPeople = () => {
  const { data, error, isLoading } = useGetPopularPeopleQuery(1);

  if (isLoading) return <Loading />;
  if (error) return <Erorre />;
  return (
    <div className="py-10">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-['Bebas_Neue']">Popular People</h1>
      </div>
      <Swiper
        modules={[Grid, Autoplay]}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        breakpoints={{
          320: { slidesPerView: 1.9 }, // mobile
          470: { slidesPerView: 3 }, // mobile
          640: { slidesPerView: 3.3 }, // tablet
          1024: { slidesPerView: 5 }, // desktop
          1440: { slidesPerView: 6 }, // big desktop
          1740: { slidesPerView: 8 }, // big desktop
        }}
        grid={{
          rows: 2, // 2 rows
          fill: "row", // fill rows first
        }}
        className="mySwiper w-full">
        {data?.results?.map((element, index) => (
          <SwiperSlide key={index}>
            <CardPeople actor={element} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperPeople;
