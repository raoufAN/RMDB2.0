import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import { Autoplay } from "swiper/modules";

const SwipperWrapperForCard = ({ children, Datalength }) => {
  return (
    <Swiper
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      loop={Datalength}
      spaceBetween={5}
      freeMode={true}
      modules={[FreeMode, Autoplay]}
      className="mySwiper w-full"
      breakpoints={{
        320: { slidesPerView: 2.2 }, // mobile
        640: { slidesPerView: 4 }, // tablet
        1024: { slidesPerView: 6 }, // desktop
        1440: { slidesPerView: 9 }, // big desktop
      }}>
      {children}
    </Swiper>
  );
};

export default SwipperWrapperForCard;
