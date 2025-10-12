import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import MobileHeader from "./MobileHeader";
import { useSelector } from "react-redux";
import MobileMenu from "../mobileMenu/MobileMenu";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import SwitchMode from "../SwitchMode/SwitchMode";
import ConnectButton from "./ConnectButton";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { mode } = useSelector((state) => state.theme);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("drawer-bodyLocked");
    } else {
      document.body.classList.remove("drawer-bodyLocked");
    }
  }, [showMenu]);

  return (
    <div
      className={`h-16 w-full md:sticky top-0 left-0 z-40 ${
        mode === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"
      }  transition-colors duration-200 `}>
      <div className="container items-center justify-between hidden h-full xl:max-w-none md:flex">
        <div className="flex flex-row items-center gap-5 xl:hidden">
          <span
            className="text-xl font-bold tracking-wider cursor-pointer"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            onClick={() => navigate(`/`)}>
            RMDB 2.0
          </span>
          <div className="flex items-center gap-2">
            <TiThMenu className="cursor-pointer size-6" onClick={() => setShowMenu(true)} />
            <span className="text-sm font-semibold">Menu</span>
          </div>
        </div>

        <div className="relative justify-end flex-1 hidden md:flex md:px-5 xl:px-0">
          <input
            type="text"
            className={`w-full xl:w-7/12 ${
              mode === "dark" ? "bg-white" : "bg-gray-100"
            } py-1 px-5 outline-0 rounded-[5px] text-[#121212]  focus:outline-[#3590F3] focus:outline-3`}
            name="search"
            placeholder="Search Here ..."
          />
          <span
            className="text-[#121212] absolute top-1/2 md:right-7 xl:right-2 -translate-y-1/2 placeholder:text-[#121212]"
            placeholder="Search Here ...">
            <FaSearch />
          </span>
        </div>
        <div className="flex pl-5 space-x-3 xl:pr-5 2xl:pr-10">
          <div className="flex items-center">
            <SwitchMode />
          </div>
          <ConnectButton />
        </div>
      </div>
      <MobileHeader setShowMenu={setShowMenu} />
      <AnimatePresence>{showMenu && <MobileMenu setShowMenu={setShowMenu} />}</AnimatePresence>
    </div>
  );
};

export default Header;
