import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsLove: [],
  productsHaveBeenSaw: [],
};

const productFutureLocalSlice = createSlice({
  name: "productFutureLocal",
  initialState,
  reducers: {
    setProductsLove: (state, action) => {
      const productCurr = state.productsLove?.find(
        (product) => product.id === action.payload.id
      );
      if (!productCurr) {
        state.productsLove?.unshift(action.payload);
      } else {
        state.productsLove = state.productsLove.filter(
          (product) => product.id !== productCurr.id
        );
      }
    },
    setProductsHaveBeenSaw: (state, action) => {
      const productCurr =
        action.payload &&
        state.productsHaveBeenSaw?.find(
          (product) => product.id === action.payload.id
        );
      if (!productCurr && action.payload !== null) {
        state.productsHaveBeenSaw?.push(action.payload);
      } else {
        if (!action.payload) return;
        state.productsHaveBeenSaw = state.productsHaveBeenSaw?.filter(
          (product) => product.id !== productCurr.id
        );
      }
    },
  },
});
export const { setProductsLove, setProductsHaveBeenSaw } =
  productFutureLocalSlice.actions;
export default productFutureLocalSlice.reducer;
