import { useState } from "react";
import { IoIosEyeOff } from "react-icons/io";
import { FaRegEye } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleSign } from "../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../Library/firebase";

const SignIn = () => {
  const { mode } = useSelector((state) => state.theme);

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("welcome");
      e.target.reset();
      dispatch(toggleSign(true));
      navigate("/");
    } catch (error) {
      toast.error(error);
      toast.warn("Your email or password is incorrect");
    }
  };

  return (
    <div
      className={`w-full max-w-sm px-5 py-10  flex flex-col items-center justify-center  rounded-lg mx-3   ${
        mode === "dark"
          ? "bg-[#353535] shadow-[0_4px_20px_rgba(255,255,255,0.05)]"
          : "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
      }`}>
      <h3 className="mb-5 text-2xl font-semibold">Welcome Back ...</h3>
      <form className="flex flex-col w-full mb-5 space-y-7" onSubmit={handleLoginIn}>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className={`w-full py-3 px-3 rounded-xl outline-0 focus:outline-2  focus:outline-[#3590F3] border-0 ${
            mode === "dark" ? "bg-[#3f3f3f]" : "bg-gray-100 "
          }`}
        />
        <div className="relative">
          <input
            type={!showPassword ? "password" : "text"}
            name="password"
            placeholder="password"
            className={`w-full py-3 px-3 rounded-xl outline-0 focus:outline-2  focus:outline-[#3590F3] border-0 ${
              mode === "dark" ? "bg-[#3f3f3f]" : "bg-gray-100"
            }`}
          />
          {!showPassword ? (
            <span
              className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-2"
              onClick={() => setShowPassword(true)}>
              <IoIosEyeOff />
            </span>
          ) : (
            <span
              className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-2"
              onClick={() => setShowPassword(false)}>
              <FaRegEye />
            </span>
          )}
        </div>
        <button className="w-full text-center py-3 px-3 rounded-xl bg-[#3590F3] hover:bg-[#341b99] cursor-pointer font-semibold transition-all duration-200">
          Sign In
        </button>
      </form>
      <div className="flex items-center w-full mb-5 font-bold">
        <span className={`flex-1 h-0.5 ${mode === "dark" ? "bg-white" : "bg-black"}`}></span>
        <span className="mx-3">OR</span>
        <span className={`flex-1 h-0.5  ${mode === "dark" ? "bg-white" : "bg-black"}`}></span>
      </div>
      <button
        className={`w-full text-center py-3 px-3 rounded-xl border ${
          mode === "dark" ? "border-white" : "border-black"
        } hover:border-[#3590F3] hover:text-[#3590F3] cursor-pointer font-semibold transition-all duration-200`}
        onClick={() => dispatch(toggleSign(false))}>
        Sign up for an acount
      </button>
    </div>
  );
};

export default SignIn;
