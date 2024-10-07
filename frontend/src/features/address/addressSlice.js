import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddressesMeAsync, deleteAddressMeAsync ,addAddressMeAsync } from "./addressThunk";

const initialState = {
  addresses: [],
  totalAddress: 0,
  isLoading: false,
  isError: false,
};

export const getAddressesMe = createAsyncThunk(
  "addresses/getAddressesMe",
  async (_, thunkAPI) => {
    return await getAddressesMeAsync("/addresses", thunkAPI);
  }
);

export const deleteAddressMe = createAsyncThunk(
  "addresses/deleteAddressMe",
  async (id, thunkAPI) => {
    return await deleteAddressMeAsync("/addresses/" + id, thunkAPI);
  }
);
export const addAddressMe = createAsyncThunk(
  "addresses/addAddressMe",
  async (inputs, thunkAPI) => {
    return await addAddressMeAsync("/addresses/", inputs, thunkAPI);
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CASE GET COLORS
    builder.addCase(getAddressesMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAddressesMe.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
      state.addresses = action.payload.data;
      state.totalAddress = action.payload.total;
    });
    builder.addCase(getAddressesMe.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
    // CASE GET COLORS
    builder.addCase(deleteAddressMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAddressMe.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
    });
    builder.addCase(deleteAddressMe.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
    // CASE GET COLORS
    builder.addCase(addAddressMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addAddressMe.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
    });
    builder.addCase(addAddressMe.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
  },
});

export const {} = addressSlice.actions;
export default addressSlice.reducer;
