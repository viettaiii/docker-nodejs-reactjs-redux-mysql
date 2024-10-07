import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersAsync } from "./userThunk";

const initialState = {
  users: [],
  perPage: 6,
  totalPages: 1,
  total: 2,
  query: {
    name: "",
    email: "",
  },
  page: 1,
  isLoading: false,
  isError: false,
};

export const getUsers = createAsyncThunk(
  "colors/getUsers",
  async (params, thunkAPI) => {
    return await getUsersAsync("/users", { params }, thunkAPI);
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setQueryUser: (state, action) => {
      state.query = {
        name: action.payload.name === "name" ? action.payload.value : "",
        email: action.payload.name === "email" ? action.payload.value : "",
      };
    },
    resetQueryUser: (state) => {
      state.query = { name: "", email: "" };
    },
  },
  extraReducers: (builder) => {
    // CASE GET COLORS
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
      state.users = action.payload.data;
      state.perPage = action.payload.perPage;
      state.totalPages = action.payload.totalPages;
      state.total = action.payload.total;
      state.page = action.payload.page || 1;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
  },
});

export const { setQueryUser, resetQueryUser } = userSlice.actions;
export default userSlice.reducer;
