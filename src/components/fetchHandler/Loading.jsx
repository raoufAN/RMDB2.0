import { useSelector } from "react-redux";

const Loading = () => {
  const { mode } = useSelector((state) => state.theme);
  return (
    <div
      className={`flex items-center justify-center py-12 h-screen ${
        mode === "dark" ? "bg-black" : "bg-gray-100"
      }`}>
      <p className="text-3xl md:text-4xl font-bold animate-pulse">Loading...</p>
    </div>
  );
};

export default Loading;
