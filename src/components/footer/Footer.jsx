import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { navBarTitles } from "../../data/data";
import { MdLocalMovies } from "react-icons/md";
import { FiTv } from "react-icons/fi";

const Footer = () => {
  const { mode } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  return (
    <div className={`${mode === "dark" ? "bg-[#121212]" : "bg-white"} pt-5`}>
      <div className="container h-full xl:max-w-none xl:px-5">
        <div className="grid grid-cols-1 gap-5 mb-2 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span
              className="text-2xl font-bold tracking-wider cursor-pointer md:text-3xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              onClick={() => navigate(`/`)}>
              RMDB 2.0
            </span>
            <span className="w-full text-xs font-semibold md:w-2/3">
              Your ultimate destination for movie and TV series information. Discover, explore, and
              dive deep into the world of entertainment.
            </span>
          </div>
          <div className="text-center md:text-start">
            <h2 className="flex items-center justify-center gap-2 pb-2 font-bold md:justify-start">
              <MdLocalMovies className="w-6 h-6" />
              <span className="text-lg">{navBarTitles[0].items[1].title}</span>
            </h2>
            <ul>
              {navBarTitles[0].items[1].list.map((item, index) => {
                return (
                  <li
                    onClick={() => navigate(`/${navBarTitles[0].items[1].title}/${item.title}`)}
                    key={index}
                    className="py-1 pl-0.5 cursor-pointer  hover:translate-x-1.5 font-semibold duration-150 transition-all">
                    <span className="text-sm font-semibold">{item.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="text-center md:text-start">
            <h2 className="flex items-center justify-center gap-2 pb-2 font-bold md:justify-start">
              <FiTv className="h-6 w-6  mb-0.5" />
              <span className="text-lg">{navBarTitles[0].items[2].title}</span>
            </h2>
            <ul>
              {navBarTitles[0].items[2].list.map((item, index) => {
                return (
                  <li
                    onClick={() => navigate(`/tv/${item.title}`)}
                    key={index}
                    className="py-1 pl-0.5 cursor-pointer  hover:translate-x-1.5 font-semibold duration-150 transition-all">
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="flex items-center justify-center gap-2 pb-2 font-bold md:justify-start">
              Categories
            </h2>
          </div>
        </div>
        <div className="border-t border-[#F8F8F8] py-4 text-sm flex flex-col justify-center items-center gap-0.5">
          <span>© 2025 RMDB 2.0. All rights reserved.</span>
          <span>made by RAOUF ANNANI 😇 </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
