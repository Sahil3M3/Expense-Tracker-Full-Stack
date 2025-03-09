import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { darkMode: false, isPremium: false },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    activatePremium: (state,action) => {
      state.isPremium = action.payload;
      if(action.payload===false)
      {
        state.darkMode=false;
      }
    },
  },
});

export const { toggleTheme, activatePremium } = themeSlice.actions;
export default themeSlice.reducer;