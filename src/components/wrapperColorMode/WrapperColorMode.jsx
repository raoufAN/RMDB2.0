import { useSelector } from "react-redux";

const WrapperColorMode = ({ children }) => {
  const { mode } = useSelector((state) => state.theme);

  return (
    <div
      className={`${
        mode === "dark"
          ? "bg-black xl:bg-transparent text-white"
          : "bg-gray-100 xl:bg-transparent text-black"
      } 
        transition-colors duration-200  `}>
      {children}
    </div>
  );
};

export default WrapperColorMode;
