const FetchHandler = ({ isLoading, isError, data, children }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-3xl md:text-4xl font-bold animate-pulse">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-3xl md:text-4xl font-bold text-red-500">Error!</p>
      </div>
    );
  }
  if (!data) {
    return null;
  }
  return children;
};

export default FetchHandler;
