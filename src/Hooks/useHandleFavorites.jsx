import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../Library/firebase";

const useHandleFavorites = () => {
  const { isLoggedIn, userDetail } = useSelector((state) => state.auth);

  const handleFavorites = async (element, typeOfElement) => {
    if (!isLoggedIn) {
      toast.info("You need to log in to add it to your watchlist.");
      return;
    }

    try {
      // Reference to user's favorite document
      const userFavoriteRef = doc(db, "favoriteList", userDetail.id);
      // Get the user's current favorite
      const userDoc = await getDoc(userFavoriteRef);
      const currentItems = userDoc.exists() ? userDoc.data().items || [] : [];

      // Check if the item already exists in the favorite
      const isAlreadyInFavorite = currentItems.some(
        (item) => item.id === element.id && item.title === (element.title || element.name)
      );

      if (isAlreadyInFavorite) {
        await updateDoc(userFavoriteRef, {
          items: arrayRemove(currentItems.find((item) => item.id === element.id)),
        });
      } else {
        await updateDoc(userFavoriteRef, {
          items: arrayUnion({
            id: element.id,
            title: element.title || element.name,
            poster_path: element.poster_path,
            media_type: typeOfElement,
            vote_average: element.vote_average,
          }),
        });
      }
    } catch (error) {
      console.error("Error updating favorite List:", error);
      toast.error("Something went wrong while updating your favorite List.");
    }
  };

  return handleFavorites;
};

export default useHandleFavorites;
