import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingComp: false,
};

const loadingCompSlice = createSlice({
  name: "loadingComp",
  initialState,
  reducers: {
    setIsLoadingComp: (state, action) => {
      state.isLoadingComp = action.payload;
    },
  },
});
export const { setIsLoadingComp } = loadingCompSlice.actions;
export default loadingCompSlice.reducer;
