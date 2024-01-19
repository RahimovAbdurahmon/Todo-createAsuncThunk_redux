import { createSlice } from "@reduxjs/toolkit";
import { getUser, searchUser, selectUser } from "../../api/todos/todosApi";

const todoList = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    
    ///get
    builder
    .addCase(getUser.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.todos = action.payload
    })
    .addCase(getUser.rejected, (state, action) => {
      state.isLoading = false
    })

    /// search
    builder
    .addCase(searchUser.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(searchUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.todos = action.payload
    })
    .addCase(searchUser.rejected, (state, action) => {
      state.isLoading = false
    })

    /// select
    builder
    .addCase(selectUser.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(selectUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.todos = action.payload
    })
    .addCase(selectUser.rejected, (state, action) => {
      state.isLoading = false
    })
  },
});

export default todoList.reducer;
