import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMode } from "../../Redux/themeSlice";

const SwitchMode = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  return (
    <div
      className={`flex items-center justify-between px-1 w-[50px] h- h-[22px] relative rounded-full transition-all ease-in duration-200 after:content-[''] after:w-[20px] after:h-[20px] after:absolute after:rounded-full after:top-1/2 after:-translate-y-1/2 after:transition-transform after:duration-200
        after:left-[2px]
     ${
       mode === "dark"
         ? "bg-[rgb(112,112,112)]  after:translate-x-[calc(100%+6px)] after:bg-[#000000]"
         : "bg-[rgb(209,206,206)]  after:translate-x-0  after:bg-[#fdb813]"
     } 
   `}
      onClick={() => dispatch(toggleMode(mode))}>
      <span>
        <FaMoon className="text-[#171b20]" />
      </span>
      <span>
        <IoSunny className="text-[#fdb813]" />
      </span>
    </div>
  );
};

export default SwitchMode;
