import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { HiOutlineXMark } from "react-icons/hi2";
import { useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import SwitchMode from "../SwitchMode/SwitchMode";
import ConnectButton from "./ConnectButton";
import { useNavigate } from "react-router-dom";
const MobileHeader = ({ setShowMenu }) => {
  const { mode } = useSelector((state) => state.theme);
  const [showInputSearch, setShowInputSearch] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      {!showInputSearch ? (
        <Motion.div
          key="default"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3 }}
          className="container flex items-center justify-between h-full md:hidden">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 cursor-pointer">
              <TiThMenu className="size-6" onClick={() => setShowMenu(true)} />
            </div>
            <span
              className="text-xl font-bold tracking-wider cursor-pointer"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              onClick={() => navigate(`/`)}>
              RMDB 2.0
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="cursor-pointer" onClick={() => setShowInputSearch(true)}>
              <FaSearch />
            </span>
            <SwitchMode />
            <ConnectButton />
          </div>
        </Motion.div>
      ) : (
        <Motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className={`w-full h-full flex items-center relative ${
            mode === "dark" ? "bg-[#313131]" : "bg-white"
          }`}
          onAnimationComplete={() => {
            inputRef.current?.focus();
          }}>
          <input
            ref={inputRef}
            type="text"
            className={`w-full  bg-transparent  px-5 outline-0 ${
              mode === "dark"
                ? "text-[#ffffff] placeholder:text-[#8c8c8f]"
                : "text-[#121212] placeholder:text-[#121212]"
            }`}
            placeholder="Search Here ..."
          />
          <HiOutlineXMark
            className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-3 size-5"
            onClick={() => setShowInputSearch(false)}
          />
        </Motion.div>
      )}
    </AnimatePresence>
  );
};
export default MobileHeader;
