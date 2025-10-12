import { useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import List from "./List";

const WatchList = () => {
  const { isLoggedIn, watchlist } = useSelector((state) => state.auth);

  return (
    <Container>
      {isLoggedIn ? (
        <List data={watchlist} />
      ) : (
        <div className="flex items-center justify-center w-full h-screen">
          <h1 className="text-lg font-bold animate-pulse">
            You can’t see your watchlist until you’re logged in
          </h1>
        </div>
      )}
    </Container>
  );
};

export default WatchList;
