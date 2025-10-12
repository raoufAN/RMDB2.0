import { useDispatch } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Library/firebase";
import { setWatchlist } from "../Redux/AuthSlice";

const useGetWatchlist = () => {
  const dispatch = useDispatch();

  const fetchWatchlist = async (userId) => {
    try {
      if (!userId) {
        console.error("No user ID provided for watchlist fetch");
        dispatch(setWatchlist([]));
        return;
      }

      // Subscribe to live updates (you can use getDoc if you want one-time)
      const unsub = onSnapshot(doc(db, "watchlists", userId), (docSnap) => {
        if (docSnap.exists()) {
          dispatch(setWatchlist(docSnap.data().items || []));
        } else {
          dispatch(setWatchlist([]));
        }
      });

      return unsub; // useful if you want to clean up
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  return { fetchWatchlist }; // ✅ return callable function
};

export default useGetWatchlist;
