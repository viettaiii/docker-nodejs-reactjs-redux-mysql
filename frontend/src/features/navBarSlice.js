import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    toggleNavBar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});
export const { toggleNavBar } = navBarSlice.actions;
export default navBarSlice.reducer;
