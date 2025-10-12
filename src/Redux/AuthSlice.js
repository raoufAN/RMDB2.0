import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    signIn: true,
    userDetail: {
      id: "",
      username: "",
      email: "",
      avatar: "",
    },
    watchlist: [],
    favoriteList: [],
  },
  reducers: {
    toggleLogIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    toggleSign: (state, action) => {
      state.sign = action.payload;
    },
    setUserDetail: (state, action) => {
      state.userDetail = { ...state.userDetail, ...action.payload };
    },
    clearUserDetail: (state) => {
      state.userDetail = { username: "", email: "", avatar: "" };
    },
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    setFavoriteList: (state, action) => {
      state.favoriteList = action.payload;
    },
  },
});

export const {
  toggleLogIn,
  toggleSign,
  setUserDetail,
  clearUserDetai,
  setWatchlist,
  setFavoriteList,
} = AuthSlice.actions;
export default AuthSlice.reducer;
