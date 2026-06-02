import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { actions as usersActions } from "./usersSlice.js";
import { actions as postsActions } from "./postsSlice.js";

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComments: commentsAdapter.addMany,
    addComment: commentsAdapter.addOne,
  },
  // BEGIN (write your solution here)
extraReducers: (builder) => {
    builder.addCase(usersActions.removeUser, (state, action) => {
      const userId = action.payload;
      const restEntities = Object.values(state.entities).filter((entity) => entity.author !== userId);
      commentsAdapter.setAll(state, restEntities);
    }).addCase(postsActions.removePost, (state, action) => {
      const commentsIds = action.payload.comments;
      const restEntities = Object.values(state.entities).filter(comment => !commentsIds.includes(comment.id));
      commentsAdapter.setAll(state, restEntities);
    })
  }
  // END
});

export const { actions } = commentsSlice;
export const selectors = commentsAdapter.getSelectors(
  (state) => state.comments
);
export default commentsSlice.reducer;
