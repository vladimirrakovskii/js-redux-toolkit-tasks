import axios from "axios";

import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import routes from "../routes.js";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(routes.tasksPath());
  return response.data.items;
});

// BEGIN (write your solution here)
export const createTask = createAsyncThunk("tasks/createTask", async (name) => {
      const response = await axios.post(routes.tasksPath(), { name });
      return response.data;
});

export const removeTask = createAsyncThunk("tasks/removeTask", async (id) => {
      await axios.delete(routes.taskPath(id));
      return id;
});

const tasksAdapter = createEntityAdapter()
const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
  name: "items",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchTasks.fulfilled, tasksAdapter.setAll)
        .addCase(createTask.fulfilled, tasksAdapter.addOne)
        .addCase(removeTask.fulfilled, tasksAdapter.removeOne);
  },
});

export const { actions } = tasksSlice;
export const selectors = tasksAdapter.getSelectors((state) => state.tasks);
export default tasksSlice.reducer;
// END
