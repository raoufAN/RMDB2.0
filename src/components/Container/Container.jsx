import { useSelector } from "react-redux";

const Container = ({ children }) => {
  const { mode } = useSelector((state) => state.theme);

  return (
    <div
      className={`container xl:max-w-none
         ${mode === "dark" ? "bg-[#000000]" : "bg-gray-100 "} w-full`}>
      {children}
    </div>
  );
};

export default Container;
