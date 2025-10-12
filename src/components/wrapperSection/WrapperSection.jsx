import { useSelector } from "react-redux";
import NavBar from "../navBar/navBar";
import Header from "../header/Header";
import Home from "../../pages/homePage/Home";
//import { Route, Routes } from "react-router-dom";
import Setting from "../../pages/setting/Setting";
import Favorites from "../../pages/favorites/Favorites";
import WatchList from "../../pages/watchList/WatchList";
import WrapperColorMode from "../wrapperColorMode/WrapperColorMode";
import Comments from "../../pages/comments/Comments";
import People from "../../pages/People/People";
import ShowAll from "../../pages/showAll/ShowAll";
import ShowDetail from "../../pages/showDetail/ShowDetail";
import SeasonDetail from "../../pages/seasonDetail/SeasonDetail";
import PeopleDetail from "../../pages/peopleDetail/PeopleDetail";
import Episode from "../../pages/episode/Episode";
import ScrollTop from "../scrollTop/ScrollTop";
import Footer from "../footer/Footer";
import Genres from "../../pages/genres/Genres";
import ShowAllByGenres from "../../pages/ShowAllByGenres/ShowAllByGenres";
import { Routes, Route } from "react-router-dom";

const WrapperSection = () => {
  const { mode } = useSelector((state) => state.theme);

  return (
    <div
      className={`${
        mode === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"
      } w-full h-auto relative flex`}>
      <div className="xl:w-[15%] hidden xl:flex relative h-auto">
        <NavBar />
      </div>
      <div className="w-full xl:w-[85%] relative ">
        <Header />
        <WrapperColorMode>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":title/:name" element={<ShowAll />} />
            <Route path="detail/:type/:id" element={<ShowDetail />} />
            <Route path=":name/:id/:season" element={<SeasonDetail />} />
            <Route path=":name/:id/:season/:episode" element={<Episode />} />
            <Route path="people/:person_id" element={<PeopleDetail />} />
            <Route path="people" element={<People />} />
            <Route path="genres/:name" element={<Genres />} />
            <Route path="genres/:name/:type/:id" element={<ShowAllByGenres />} />
            <Route path="watchList" element={<WatchList />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="comments" element={<Comments />} />
            <Route path="setting" element={<Setting />} />
          </Routes>
        </WrapperColorMode>
        <Footer />
      </div>
    </div>
  );
};

export default WrapperSection;
