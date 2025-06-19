import { ReduxSidebarProps } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: ReduxSidebarProps = true;

const sidebarSlice = createSlice({
  initialState: INITIAL_STATE,
  name: "sidebar",
  reducers: {
    setSidebar: (_, action) => action.payload,
  },
});

export const { setSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
