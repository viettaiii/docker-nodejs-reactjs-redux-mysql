import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartMeAsync,
  addCartMeAsync,
  deleteCartItemMeAsync,
} from "./cartThunk";
const initialState = {
  cart: null,
  total: 0,
  countCartItem: 0,
  cartItemNewBuy: null,
  isLoading: false,
  isError: false,
};

export const getCartMe = createAsyncThunk(
  "cart/getCart",
  async (_, thunkAPI) => {
    return await getCartMeAsync("/shopping-cart", thunkAPI);
  }
);

export const addCartMe = createAsyncThunk(
  "cart/addCart",
  async (inputs, thunkAPI) => {
    return await addCartMeAsync("/shopping-cart", inputs, thunkAPI);
  }
);

export const deleteCartItemMe = createAsyncThunk(
  "cart/deleteCartItem",
  async (id, thunkAPI) => {
    return await deleteCartItemMeAsync(
      "/shopping-cart/shopping-cart-item/" + id,
      thunkAPI
    );
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cart = null;
      state.countCartItem = 0;
    },

    setCartItemNewBuy: (state, action) => {
      state.cartItemNewBuy = action.payload;
    },
  },

  extraReducers: (builder) => {
    // get cart me
    builder.addCase(getCartMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCartMe.fulfilled, (state, action) => {
      if (!action?.payload) return;
      const { data = [], total = 0, count = 0 } = action?.payload;
      state.cart = data;
      state.total = total;
      state.countCartItem = count;
      state.isLoading = state.isError = false;
    });
    builder.addCase(getCartMe.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
    // add cart me
    builder.addCase(addCartMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addCartMe.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
    });
    builder.addCase(addCartMe.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
    // delete cart item me
    builder.addCase(deleteCartItemMe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCartItemMe.fulfilled, (state, action) => {
      state.isLoading = state.isError = false;
    });
    builder.addCase(deleteCartItemMe.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
  },
});

export const { resetCart, setCartItemNewBuy } = cartSlice.actions;
export default cartSlice.reducer;
