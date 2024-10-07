import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getColorsAsync } from "./colorThunk";

const initialState = {
  colors: [],
  isLoading: false,
  isError: false,
};

export const getColors = createAsyncThunk(
  "colors/getColorsAsync",
  async (_, thunkAPI) => {
    return await getColorsAsync("/colors", thunkAPI);
  }
);
const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CASE GET COLORS
    builder.addCase(getColors.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getColors.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
      state.colors = action.payload.data;
    });
    builder.addCase(getColors.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
  },
});

export const {} = colorSlice.actions;
export default colorSlice.reducer;
