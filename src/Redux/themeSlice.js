import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "dark", showMenu: false },
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    toggleMenu: (state, action) => {
      state.showMenu = action.payload;
    },
  },
});

export const { toggleMode, toggleMenu } = themeSlice.actions;
export default themeSlice.reducer;
