import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, db } from "../Library/firebase";
import { doc, getDoc } from "firebase/firestore";
import { setFavoriteList, setUserDetail, setWatchlist, toggleLogIn } from "../Redux/AuthSlice";
import useGetWatchlist from "./useGetWatchlist";
import useGetFavorites from "./useGetFavorites";

const UseAuth = () => {
  const dispatch = useDispatch();
  const { fetchWatchlist } = useGetWatchlist();
  const { getFavorite } = useGetFavorites();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // get Firestore user document
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // console.log(userData);

            dispatch(
              setUserDetail({
                id: userData.id,
                username: userData.username,
                email: userData.email,
                avatar: userData.avatar,
              })
            );
            fetchWatchlist(userData.id);
            getFavorite(userData.id);
          } else {
            // fallback: use Firebase Auth data
            dispatch(
              setUserDetail({
                username: currentUser.displayName || "",
                email: currentUser.email,
                avatar: currentUser.photoURL || "",
              })
            );
          }

          dispatch(toggleLogIn(true));
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        dispatch(toggleLogIn(false));
        dispatch(setUserDetail({ id: "", username: "", email: "", avatar: "" }));
        dispatch(setWatchlist([]));
        dispatch(setFavoriteList([]));
      }
    });

    return () => unsubscribe();
  }, [dispatch, fetchWatchlist, getFavorite]);
};

export default UseAuth;
