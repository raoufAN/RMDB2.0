import { HiOutlineXMark } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { navBarTitles } from "../../data/data";
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";

const MobileMenu = ({ setShowMenu }) => {
  const navigate = useNavigate();
  const [showList, setShowList] = useState({
    index: null,
    bolean: false,
  });
  const { mode } = useSelector((state) => state.theme);
  const handleLogOut = useLogout();

  return (
    <Motion.div
      key="mobileMenu"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`h-screen w-3/4 md:w-2/5 ${
        mode === "dark" ? "bg-[#1f1f1f]" : "bg-[#ffffff]"
      }  fixed inset-0 z-50 overflow-y-auto`}>
      <div className="w-full h-full">
        <div className="relative h-16">
          <span
            className="absolute cursor-pointer top-3 right-3"
            onClick={() => setShowMenu(false)}>
            <HiOutlineXMark className="size-6" />
          </span>
        </div>
        <div className="">
          {navBarTitles.map((sections) => {
            return sections.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div className="flex flex-col" key={index}>
                  <div
                    className={`px-4 py-2 flex items-center justify-between cursor-pointer ${
                      mode === "dark" ? "hover:bg-[#2e2e2e]" : "hover:bg-[#e4e4e4]"
                    }`}
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
                        setShowMenu(false);
                      } else {
                        navigate("/");
                        navigate(
                          item.title.toLowerCase() === "home"
                            ? "/"
                            : `/${item.title.toLowerCase().replace(/\s+/g, "-")}`
                        );
                        setShowMenu(false);
                      }
                    }}>
                    <div className="flex items-center space-x-3 ">
                      <Icon className="text-[#8f8f8f] size-5" />
                      <span>{item.title}</span>
                    </div>
                    <span className={`cursor-pointer ${item.list.length > 0 ? "block" : "hidden"}`}>
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
                        className={`pl-10 ${
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
                                      `/${title === "series" ? "tv" : "movie"}/${miniIitme.title}`
                                    );
                                  } else if (title === "genres") {
                                    navigate(`/${title}/${miniIitme.title}`);
                                  }
                                  setShowMenu(false);
                                }}
                                className="flex items-center space-x-2">
                                <Icon className="text-[#8f8f8f] size-5" />
                                <span>{miniIitme.title}</span>
                              </div>
                            </div>
                          );
                        })}
                      </Motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            });
          })}
        </div>
      </div>
    </Motion.div>
  );
};

export default MobileMenu;
