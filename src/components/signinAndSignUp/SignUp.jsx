import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosEyeOff } from "react-icons/io";
import { FaRegEye } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { toggleSign } from "../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Library/firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.theme);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    // Username checks
    if (cleanUsername === "") {
      toast.warn("Username cannot be empty ❌");
      return;
    }
    if (cleanUsername.length < 5) {
      toast.warn("Username is too short (min 5 chars) ⚠️");
      return;
    }
    if (cleanUsername.length > 12) {
      toast.warn("Username is too big (max 12 chars) ⚠️");
      return;
    }

    // Password checks
    if (cleanPassword === "") {
      toast.warn("Password cannot be empty ❌");
      return;
    }
    if (cleanPassword.length < 8) {
      toast.warn("Password is too short (min 8 chars) ⚠️");
      return;
    }

    try {
      // create User With Email And Password
      const response = await createUserWithEmailAndPassword(auth, email, password);

      const userId = response.user.uid;

      // Create user profile in Firestore
      await setDoc(doc(db, "users", userId), {
        avatar: avatar,
        username,
        email,
        id: userId,
        createdAt: new Date(),
      });
      // create user watchList

      await setDoc(doc(db, "watchlists", userId), {
        userId,
        items: [],
        createdAt: new Date(),
      });

      // create user watchList
      await setDoc(doc(db, "favoriteList", userId), {
        userId,
        items: [],
        createdAt: new Date(),
      });

      //dispatch(toggleAuth(true));
      dispatch(toggleSign(true));
      navigate("/");
      toast.success("Account created successfully 🎉");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered ❌");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak (min 6 characters) ⚠️");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format 📧");
      } else {
        toast.error("Something went wrong, try again later 🚨");
      }
    }
  };
  return (
    <div
      className={`w-full max-w-sm px-5 py-10  flex flex-col items-center justify-center  rounded-lg mx-3  ${
        mode === "dark"
          ? "bg-[#353535] shadow-[0_4px_20px_rgba(255,255,255,0.05)]"
          : "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
      }`}>
      <h3 className="mb-5 text-2xl font-semibold">Sign Up</h3>
      <form className="flex flex-col w-full mb-5 space-y-7" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <label htmlFor="file" className="cursor-pointer p-5 border border-[#3590F3] rounded-b-md">
            <FaUser size={40} className="text-[#3590F3]" />
          </label>
          <input
            type="file"
            name=""
            id="file"
            className="hidden"
            onChange={(e) => handleAvatar(e)}
          />
        </div>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          name="username"
          className={`w-full py-3 px-3 rounded-xl outline-0 focus:outline-2  focus:outline-[#3590F3] border-0 ${
            mode === "dark" ? "bg-[#3f3f3f]" : "bg-gray-100"
          }`}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Your Email"
          className={`w-full py-3 px-3 rounded-xl outline-0 focus:outline-2  focus:outline-[#3590F3] border-0 ${
            mode === "dark" ? "bg-[#3f3f3f]" : "bg-gray-100"
          }`}
        />
        <div className="relative">
          <input
            onChange={(e) => setPassword(e.target.value)}
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
