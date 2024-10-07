import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrderMeAsync, getOrdersMeAsync } from "./orderThunk";
const initialState = {
  orders: [],
  isLoading: false,
  isError: false,
};

export const addOrderMe = createAsyncThunk(
  "order/addOrder",
  async (inputs, thunkAPI) => {
    return await addOrderMeAsync("/orders", inputs, thunkAPI);
  }
);

export const getOrdersMe = createAsyncThunk(
  "order/getOrder",
  async (inputs, thunkAPI) => {
    return await getOrdersMeAsync("/orders", thunkAPI);
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // get cart me
    builder.addCase(getOrdersMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getOrdersMe.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.isLoading = state.isError = false;
      state.orders = data
    });
    builder.addCase(getOrdersMe.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
    // add cart me
    builder.addCase(addOrderMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addOrderMe.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
    });
    builder.addCase(addOrderMe.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
  },
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
