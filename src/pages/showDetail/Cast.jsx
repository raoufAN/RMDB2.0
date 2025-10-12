import { useGetCreditsQuery } from "../../Redux/TmdbApi";
import { MdOutlineMovieCreation } from "react-icons/md";
import { GiDramaMasks } from "react-icons/gi";
import { SwiperSlide } from "swiper/react";
import WrapperSwiper from "../../components/wrapperSwiper/WrapperSwiper";
import CardPeople from "../../components/cardPeople/CardPeople";

const Cast = ({ type, id }) => {
  const { data } = useGetCreditsQuery({ type, id });

  if (!data?.cast?.length) return null;
  if (!data?.crew?.length) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mt-6 mb-2 flex items-center gap-2">
        <GiDramaMasks className="w-8 h-8 text-purple-600" />
        Cast ({data.cast.length})
      </h2>
      <WrapperSwiper dataLength={data.cast.length > 5}>
        {data.cast.map((actor, index) => (
          <SwiperSlide key={index}>
            <CardPeople actor={actor} index={index} />
          </SwiperSlide>
        ))}
      </WrapperSwiper>

      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <MdOutlineMovieCreation className="w-8 h-8 text-yellow-500" />
        Crew ({data.crew.length})
      </h2>
      <WrapperSwiper dataLength={data.crew.length > 5}>
        {data.crew.map((actor, index) => (
          <SwiperSlide key={index} className="bg-black">
            <CardPeople actor={actor} index={index} />
          </SwiperSlide>
        ))}
      </WrapperSwiper>
    </section>
  );
};

export default Cast;
