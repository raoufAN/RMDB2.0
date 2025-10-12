import { FiAlertCircle } from "react-icons/fi";
import { IoRefreshCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

const Erorre = ({ error }) => {
  const { mode } = useSelector((state) => state.theme);
  return (
    <div
      className={`flex items-center flex-col justify-center space-x-3 py-12 h-screen ${
        mode === "dark" ? "bg-black" : "bg-gray-100"
      }`}>
      <FiAlertCircle className="w-12 h-12 mb-4 text-red-500 animate-pulse" />
      <h3 className="mb-2 text-lg font-semibold text-white">Something went wrong</h3>
      {error && <p className="max-w-md mb-4 text-slate-400">{error}</p>}
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
        <IoRefreshCircleSharp className="w-5 h-5 cursor-pointer" />
        Try Again
      </button>
    </div>
  );
};

export default Erorre;
