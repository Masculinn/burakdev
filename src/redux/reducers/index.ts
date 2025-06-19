import { combineReducers } from "redux";
import cookieSlice from "../slices/cookieSlice";
import themeSlice from "../slices/themeSlice";
import sidebarSlice from "../slices/sidebarSlice";
import blogSlice from "../slices/blogSlice";

const rootReducer = combineReducers({
  cookieSlice: cookieSlice,
  theme: themeSlice,
  sidebar: sidebarSlice,
  blog: blogSlice,
});

export default rootReducer;
