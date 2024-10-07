import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProvidersAsync } from "./providerThunk";

const initialState = {
  providers: [],
  isLoading: false,
  isError: false,
};

export const getProviders = createAsyncThunk(
  "providers/getProvidersAsync",
  async (_, thunkAPI) => {
    return await getProvidersAsync("/providers", thunkAPI);
  }
);
const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CASE GET PROVIDERS
    
    builder.addCase(getProviders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProviders.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
      state.providers = action.payload.data;
    });
    builder.addCase(getProviders.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
  },
});

export const {} = providerSlice.actions;
export default providerSlice.reducer;
