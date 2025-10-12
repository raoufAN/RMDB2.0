import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../Library/firebase";

const useHandleWatchlist = () => {
  const { isLoggedIn, userDetail } = useSelector((state) => state.auth);

  const handleWatchlist = async (element, typeOfElement) => {
    if (!isLoggedIn) {
      toast.info("You need to log in to add it to your watchlist.");
      return;
    }
    try {
      // Reference to user's watchlist document
      const userWatchlistRef = doc(db, "watchlists", userDetail.id);

      // Get the user's current watchlist
      const userDoc = await getDoc(userWatchlistRef);
      const currentItems = userDoc.exists() ? userDoc.data().items || [] : [];

      // Check if the item already exists in the watchlist
      const isAlreadyInWatchlist = currentItems.some(
        (item) => item.id === element.id && item.title === (element.title || element.name)
      );

      if (isAlreadyInWatchlist) {
        await updateDoc(userWatchlistRef, {
          items: arrayRemove(currentItems.find((item) => item.id === element.id)),
        });
        toast.warn("Removed from your watchlist.");
      } else {
        await updateDoc(userWatchlistRef, {
          items: arrayUnion({
            id: element.id,
            title: element.title || element.name,
            poster_path: element.poster_path,
            media_type: typeOfElement,
            vote_average: element.vote_average,
          }),
        });
        toast.success("Added to your watchlist!");
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
      toast.error("Something went wrong while updating your watchlist.");
    }
  };
  return handleWatchlist;
};

export default useHandleWatchlist;
