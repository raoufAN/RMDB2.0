import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toggleSign } from "../../Redux/AuthSlice";
import SignIn from "../../components/signinAndSignUp/SignIn";
import SignUp from "../../components/signinAndSignUp/SignUp";

const Login = () => {
  const { mode } = useSelector((state) => state.theme);
  const { sign } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <div
      className={`${
        mode === "dark" ? "bg-[#121212] text-white" : "bg-gray-100 text-black"
      } h-screen flex justify-center items-center relative`}>
      <Link
        to={`/`}
        className="flex items-center space-x-2 absolute top-2 left-2"
        onClick={() => {
          dispatch(toggleSign(true));
        }}>
        <FaArrowLeft size={24} />
        <span className="font-semibold">Back</span>
      </Link>
      {sign ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default Login;
