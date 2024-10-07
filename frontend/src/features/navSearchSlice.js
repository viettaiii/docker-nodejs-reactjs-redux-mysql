import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNavSearch: false,
  optionChoose: { title: "Tất cả" },
};

const navSearchSlice = createSlice({
  name: "navSearch",
  initialState,
  reducers: {
    setIsNavSearch: (state, action) => {
      state.isNavSearch = action.payload;
    },
    setOptionChoose: (state, action) => {
      state.optionChoose = action.payload;
    },
  },
});
export const { setIsNavSearch, setOptionChoose } = navSearchSlice.actions;
export default navSearchSlice.reducer;
