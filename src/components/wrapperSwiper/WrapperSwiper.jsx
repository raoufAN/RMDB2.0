import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import { Autoplay } from "swiper/modules";

const WrapperSwiper = ({ children, dataLength }) => {
  return (
    <Swiper
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      loop={dataLength > 5}
      spaceBetween={5}
      freeMode={true}
      modules={[FreeMode, Autoplay]}
      className="mySwiper w-full my-10"
      breakpoints={{
        320: { slidesPerView: 2.2 }, // mobile
        640: { slidesPerView: 3.5 }, // tablet
        1024: { slidesPerView: 5.5 }, // desktop
        1440: { slidesPerView: 8.5 }, // big desktop
      }}>
      {children}
    </Swiper>
  );
};

export default WrapperSwiper;
