import ContentCard from "../../components/contentCard/ContentCard";

const List = ({ data }) => {
  if (data && data.length < 1) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-lg font-bold animate-pulse">The Watchlist Is Empty</h1>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen">
      <h1 className="py-5 text-2xl md:text-4xl font-bold italic font-['Bebas_Neue']">
        Your series watchlist ({data.filter((el) => el.media_type.toLowerCase() === "tv").length})
      </h1>
      {data.filter((el) => el.media_type.toLowerCase() === "tv").length > 0 ? (
        <div className="grid grid-cols-2 gap-5 pb-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {data
            .filter((el) => el.media_type.toLowerCase() === "tv")
            .map((item, index) => (
              <ContentCard element={item} sectionName={item.media_type} key={index} />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-72">
          <h1 className="text-lg font-bold animate-pulse">The Watchlist Series Is Empty</h1>
        </div>
      )}

      <h1 className="py-5 text-2xl md:text-4xl font-bold italic font-['Bebas_Neue']">
        Your Movies watchlist ({data.filter((el) => el.media_type.toLowerCase() === "movie").length}
        )
      </h1>
      {data.filter((el) => el.media_type.toLowerCase() === "movie").length > 0 ? (
        <div className="grid grid-cols-2 gap-5 pb-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {data
            .filter((el) => el.media_type.toLowerCase() === "movie")
            .map((item, index) => (
              <ContentCard element={item} sectionName={item.media_type} key={index} />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-72">
          <h1 className="text-lg font-bold animate-pulse">The Watchlist Movies Is Empty</h1>
        </div>
      )}
    </div>
  );
};

export default List;
