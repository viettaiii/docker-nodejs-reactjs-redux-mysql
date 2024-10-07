import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSpinner: false,
};

const spinnerSlice = createSlice({
  name: "spinner",
  initialState,
  reducers: {
    setSpinner: (state, action) => {
      state.isSpinner = action.payload;
    },
  },
});

export const { setSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;
