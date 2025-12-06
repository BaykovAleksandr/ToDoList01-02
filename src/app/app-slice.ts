import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode;
    }),
  }),
});

// action creator достается из appSlice.actions
export const { changeThemeModeAC } = appSlice.actions;
export const { selectThemeMode } = appSlice.selectors;
// reducer достается из appSlice.reducer
export const appReducer = appSlice.reducer;

export type ThemeMode = "dark" | "light";
