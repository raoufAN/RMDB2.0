import { useDispatch, useSelector } from "react-redux";
import { toggleSign } from "../../Redux/AuthSlice";
import { Link } from "react-router-dom";
import noUserImage from "../../assets/Noimages.png";

const ConnectButton = () => {
  const { mode } = useSelector((state) => state.theme);
  const { userDetail, isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <>
      {isLoggedIn ? (
        <div
          className={`flex items-center space-x-1  cursor-pointer rounded-2xl md:px-3 md:py-1 text-sm  ${
            mode === "dark" ? "md:bg-[#2e2e2e]" : "md:bg-gray-100"
          }`}>
          <div className="border-2 border-[#3590F3] rounded-full ">
            <img
              src={userDetail.avatar || noUserImage}
              alt="avatar"
              className="rounded-full h-7 w-7"
            />
          </div>
          <span className="hidden font-bold md:flex">
            {userDetail.username.charAt(0).toUpperCase() + userDetail.username.slice(1)}
          </span>
        </div>
      ) : (
        <Link
          to={`/login`}
          className={`font-semibold ${
            mode === "dark"
              ? "bg-[#2e2e2e] hover:bg-[#3590F3]"
              : "bg-gray-100 hover:bg-[#3590F3] hover:text-white"
          } cursor-pointer rounded-2xl px-3 py-1.5 text-sm md:text-base`}
          onClick={() => {
            dispatch(toggleSign(true));
          }}>
          Se connecter
        </Link>
      )}
    </>
  );
};

export default ConnectButton;
