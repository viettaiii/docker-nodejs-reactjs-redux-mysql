import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listIphone: [],
  listIpad: [],
  listMac: [],
  listHotSale: [],
  listAppleWatch: [],
};

const cacheProductSlice = createSlice({
  name: "cacheProduct",
  initialState,
  reducers: {
    setCacheProductType: (state, action) => {
      state[action.payload.type] = action.payload.list;
    },
  },
});
export const { setCacheProductType } = cacheProductSlice.actions;
export default cacheProductSlice.reducer;
