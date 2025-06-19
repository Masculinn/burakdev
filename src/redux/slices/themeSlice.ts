import { ReduxThemeProps } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: ReduxThemeProps = "dark";

const themeSlice = createSlice({
  initialState: INITIAL_STATE,
  name: "theme",
  reducers: {
    setTheme: (_, action) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
