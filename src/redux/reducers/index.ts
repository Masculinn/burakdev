import { combineReducers } from "redux";
import themeSlice from "../slices/themeSlice";
import sidebarSlice from "../slices/sidebarSlice";

const rootReducer = combineReducers({
  theme: themeSlice,
  sidebar: sidebarSlice,
});

export default rootReducer;
