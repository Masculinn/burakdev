import { BlogPost } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_STATE: Omit<BlogPost, "content"> = {
  banner_image: "/assets/components/banner-bg.webp",
  description: "This is an example description",
  id: 0,
  level: 1,
  like: 0,
  published_at: new Date().toISOString(),
  slug: "example-slug",
  tags: ["tag1", "tag2"],
  title: "Example Blog Post",
  view: 0,
};

const blogSlice = createSlice({
  initialState: INITIAL_STATE,
  name: "blog",
  reducers: {
    setBlog: (_, action) => {
      return action.payload;
    },
  },
});

export const { setBlog } = blogSlice.actions;
export default blogSlice.reducer;
