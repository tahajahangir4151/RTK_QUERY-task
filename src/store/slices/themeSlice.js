import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme !== null) {
    return savedTheme === "true";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { darkMode: getInitialDarkMode() },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", String(state.darkMode));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
