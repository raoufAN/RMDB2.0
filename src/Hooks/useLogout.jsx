import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../Library/firebase";
import { toggleLogIn, setUserDetail, setWatchlist } from "../Redux/AuthSlice";

const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await signOut(auth); // Firebase logout
      dispatch(toggleLogIn(false)); // update redux
      dispatch(
        setUserDetail({
          username: "",
          email: "",
          avatar: "",
        })
      );
      dispatch(setWatchlist([]));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return handleLogOut;
};

export default useLogout;
