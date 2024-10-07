import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesAsync } from "./categoryThunk";

const initialState = {
  categories: [],
  isLoading: false,
  isError: false,
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    return await getCategoriesAsync("/categories", thunkAPI);
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CASE GET CATEGORIES STATIC
    builder.addCase(getCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.categories = data;
      state.isLoading = state.isError = false;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
