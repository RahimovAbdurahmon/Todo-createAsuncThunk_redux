import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let API = "http://localhost:3000/data";

/// get
export const getUser = createAsyncThunk("todos/getUser", async () => {
  try {
    let { data } = await axios.get(API);
    return data;
  } catch (error) {
    console.log(error);
  }
});

/// delete
export const deleteUser = createAsyncThunk(
  "todos/deleteUser",
  async (id, { dispatch }) => {
    try {
      let { data } = await axios.delete(`${API}/${id}`);
      dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  }
);

/// isComplete
export const isCompleteUser = createAsyncThunk(
  "todos/isCompleteUSer",
  async (user, { dispatch }) => {
    try {
      let { data } = await axios.put(`${API}/${user.id}`, {
        id: user.id,
        name: user.name,
        isComplete: !user.isComplete,
      });
      dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  }
);

/// info
export const infoUser = createAsyncThunk("todos/infoUser", async (id) => {
  try {
    let { data } = await axios.get(`${API}/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

/// add
export const addUser = createAsyncThunk(
  "todos/addUser",
  async (newUser, { dispatch }) => {
    try {
      let { data } = await axios.post(API, newUser);
      dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  }
);

/// edit
export const editUser = createAsyncThunk(
  "todos/editUser",
  async (user, { dispatch }) => {
    try {
      let { data } = await axios.put(`${API}/${user.id}`, user);
      dispatch(getUser());
    } catch (error) {
      console.log(error);
    }
  }
);

/// search
export const searchUser = createAsyncThunk(
  "todos/searchUser",
  async (searchValue) => {
    try {
      let { data } = await axios.get(`${API}?q=${searchValue}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

///select
export const selectUser = createAsyncThunk(
  "todos/selectUser",
  async (selValue) => {
    try {
      if (selValue == "") {
        let { data } = await axios.get(API);
        return data;
      }
      let { data } = await axios.get(
        `${API}?isComplete=${selValue == "active" ? true : false}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
