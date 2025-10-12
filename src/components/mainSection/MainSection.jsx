import { useSelector } from "react-redux";

const MainSection = () => {
  const { mode } = useSelector((state) => state.theme);

  return (
    <div
      className={`h-[4000px]  transition-colors duration-200  ${
        mode === "dark"
          ? "bg-black xl:bg-transparent text-white"
          : "bg-gray-100 xl:bg-transparent text-black"
      }`}>
      <div
        className={`container xl:max-w-none ${
          mode === "dark" ? "bg-[#000000]" : "bg-gray-100 "
        }  xl:rounded-tl-2xl w-full h-[4000px]`}>
        hello
      </div>
    </div>
  );
};

export default MainSection;
