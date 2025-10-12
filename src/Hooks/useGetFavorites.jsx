import { useDispatch } from "react-redux";
import { setFavoriteList } from "../Redux/AuthSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Library/firebase";

const useGetFavorites = () => {
  const dispatch = useDispatch();

  const getFavorite = async (userId) => {
    try {
      if (!userId) {
        console.error("No user ID provided for watchlist fetch");
        dispatch(setFavoriteList([]));
        return;
      }
      const unsub = onSnapshot(doc(db, "favoriteList", userId), (docSnap) => {
        if (docSnap.exists()) {
          dispatch(setFavoriteList(docSnap.data().items || []));
        } else {
          dispatch(setFavoriteList([]));
        }
      });

      return unsub;
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  return { getFavorite };
};

export default useGetFavorites;
