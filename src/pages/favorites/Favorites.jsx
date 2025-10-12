import { useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import ListFavorites from "./ListFavorites";

const Favorites = () => {
  const { isLoggedIn, favoriteList } = useSelector((state) => state.auth);
  return (
    <Container>
      {isLoggedIn ? (
        <ListFavorites data={favoriteList} />
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

export default Favorites;
