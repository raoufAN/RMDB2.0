import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./themeSlice";
import AuthReducer from "./AuthSlice";
import { TmdbApi } from "./TmdbApi";

const store = configureStore({
  reducer: {
    // stor name
    theme: ThemeReducer,
    auth: AuthReducer,
    // ⬇️ add RTK Query reducer
    [TmdbApi.reducerPath]: TmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(TmdbApi.middleware),
});

export default store;
