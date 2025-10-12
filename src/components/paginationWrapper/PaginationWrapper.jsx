import { useSelector } from "react-redux";
import { Pagination } from "@heroui/react";

const PaginationWrapper = ({ total_pages, page, setPage }) => {
  const { mode } = useSelector((state) => state.theme);
  return (
    <Pagination
      total={total_pages}
      page={page}
      onChange={(newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      showControls
      size="sm"
      variant="bordered"
      renderItem={({ children, onPress, isActive, index }) => {
        return (
          <button
            key={index}
            onClick={onPress}
            className={`px-3 py-1 text-sm md:px-4 md:py-2 md:text-base rounded-md font-semibold transition-colors cursor-pointer
          ${
            isActive
              ? "bg-blue-600 text-white"
              : mode === "dark"
              ? "bg-[#121212] text-white"
              : "bg-white text-black"
          }
          ${!isActive ? (mode === "dark" ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-50") : ""}
          ${typeof children !== "number" ? "min-h-7 md:min-h-10 hidden sm:flex" : ""}
        `}>
            {children}
          </button>
        );
      }}
    />
  );
};

export default PaginationWrapper;
