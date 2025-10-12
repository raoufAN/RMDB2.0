import { useSelector } from "react-redux";
import { navBarTitles } from "../../data/data";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { motion as Motion, AnimatePresence } from "framer-motion";
import useLogout from "../../Hooks/useLogout";

const NavBar = () => {
  const [showList, setShowList] = useState({
    index: null,
    bolean: false,
  });
  const { mode } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const handleLogOut = useLogout();
  return (
    <div
      className={`h-screen fixed top-0 xl:w-[15%] flex flex-col 
    ${mode === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"}
    transition-colors duration-200`}>
      <div className="flex items-center h-16 xl:ml-5 2xl:ml-10">
        <span
          className="text-3xl font-bold tracking-wider cursor-pointer"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          onClick={() => navigate(`/`)}>
          RMDB 2.0
        </span>
      </div>
      <div className="flex flex-col xl:mt-5 2xl:mt-10 xl:ml-5 2xl:ml-10  h-[calc(100%-64px)] gap-10 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#121212]">
        {navBarTitles.map((section) => {
          return (
            <div key={section.name}>
              <h3
                className="mb-5 text-2xl font-bold cursor-pointer"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {section.name}
              </h3>
              <ul className="flex flex-col gap-3 ml-1">
                {section.items.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div className="flex flex-col" key={index}>
                      <div
                        className={`flex items-center justify-between  px-2 py-1 rounded-xs cursor-pointer
                        ${mode === "dark" ? "hover:bg-[#2e2e2e]" : "hover:bg-[#e4e4e4]"}`}
                        key={item.title}
                        onClick={() => {
                          const title = item.title.toLowerCase();

                          if (title === "series" || title === "movie" || title === "genres") {
                            setShowList((prev) => ({
                              ...prev,
                              index: index !== prev.index ? index : null,
                              bolean: index !== prev.index, // true if opening, false if closing
                            }));
                          } else if (title === "log out") {
                            handleLogOut();
                          } else {
                            navigate("/");
                            navigate(
                              item.title.toLowerCase() === "home"
                                ? "/"
                                : `/${item.title.toLowerCase().replace(/\s+/g, "-")}`
                            );
                          }
                        }}>
                        <div className="flex items-center space-x-2">
                          <Icon className="size-5 text-[#8f8f8f]" />
                          <span className="text-lg font-semibold">{item.title}</span>
                        </div>
                        <span
                          className={`cursor-pointer ${item.list.length > 0 ? "block" : "hidden"}`}>
                          {showList.bolean && showList.index === index ? (
                            <MdKeyboardArrowUp size={24} />
                          ) : (
                            <MdOutlineKeyboardArrowDown size={24} />
                          )}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {showList.bolean && showList.index === index && (
                          <Motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className={`${
                              item.list.length > 0 ? " border-b border-[#8f8f8f]" : ""
                            }`}>
                            {item.list.map((miniIitme, index) => {
                              const Icon = miniIitme.icon;
                              return (
                                <div
                                  key={index}
                                  className={`px-4 py-2 cursor-pointer ${
                                    mode === "dark" ? "hover:bg-[#2e2e2e]" : "hover:bg-[#e4e4e4]"
                                  }`}>
                                  <div
                                    onClick={() => {
                                      const title = item.title.toLowerCase();
                                      if (title === "series" || title === "movie") {
                                        navigate(
                                          `/${title === "series" ? "tv" : "movie"}/${
                                            miniIitme.title
                                          }`
                                        );
                                      } else if (title === "genres") {
                                        navigate(`/${title}/${miniIitme.title}`);
                                      }
                                    }}
                                    className="flex items-center space-x-2">
                                    <Icon className="text-[#8f8f8f] size-5" />
                                    <span className="text-sm font-extrabold line-clamp-1">
                                      {miniIitme.title}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </Motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
