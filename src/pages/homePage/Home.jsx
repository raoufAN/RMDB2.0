import Hero from "./Hero";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import CarouselSection from "./CarouselSection";
import SwiperPeople from "./SwiperPeople";
import Container from "../../components/Container/Container";

const Home = () => {
  return (
    <div className="py-4">
      <Hero />
      <Container>
        <CarouselSection sectionName={"Trending Movies This Week"} type="trending/movie/week" />
        <CarouselSection sectionName={"Trending TV Shows  This Week"} type="trending/tv/week" />
        <CarouselSection sectionName={"Upcoming Movie"} type="movie/upcoming" />
        <CarouselSection sectionName={"TV Shows  On The Air"} type="tv/on_the_air" />
        <CarouselSection sectionName={"Top Rated Movies"} type="/movie/top_rated" />
        <CarouselSection sectionName={"Top Rated tV Shows"} type="/tv/top_rated" />
        <SwiperPeople />
      </Container>
    </div>
  );
};

export default Home;
