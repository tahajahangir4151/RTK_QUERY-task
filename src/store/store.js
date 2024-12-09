import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./services/githubApi";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});
