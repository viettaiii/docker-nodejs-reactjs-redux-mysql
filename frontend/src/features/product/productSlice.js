import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsAsync, getProductsHotSalesAsync ,getProductsPhuKienAsync } from "./productThunk";
const initialState = {
  products: [],
  perPage: 8,
  totalPages: 1,
  total: 2,
  query: {
    name: "",
    categoryId: "",
    providerId: "",
    sort: "",
    page: 1,
  },

  isLoading: false,
  isError: false,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    return await getProductsAsync("/products", thunkAPI);
  }
);

export const getProductsHotSales = createAsyncThunk(
  "products/getProductsHotSales",
  async (_, thunkAPI) => {
    return await getProductsHotSalesAsync("/products/hot-sales", thunkAPI);
  }
);
export const getProductsPhuKien = createAsyncThunk(
  "products/getProductsPhuKien",
  async (_, thunkAPI) => {
    return await getProductsPhuKienAsync("/products/phu-kien", thunkAPI);
  }
);



const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setQueryProduct: (state, action) => {
      if (action.payload.name === "categoryId") state.query.page = 1;
      const value =
        action.payload.value === "all" ? null : action.payload.value;
      state.query = {
        ...state.query,
        [action.payload.name]: value,
      };
    },
    resetQueryProduct: (state) => {
      state.query = { name: "", categoryId: "", providerId: "", sort: "" };
    },
  },

  extraReducers: (builder) => {
    // CASE GET ALL PRODUCTS
    builder.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      const { data, page, perPage, totalPages, total } = action.payload;
      state.products = data;
      state.page = page;
      state.perPage = perPage;
      state.totalPages = totalPages;
      state.total = total;
      state.isLoading = state.isError = false;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });

    // get product hot sales
    builder.addCase(getProductsHotSales.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsHotSales.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.productsHotSales = data;

      state.isLoading = state.isError = false;
    });
    builder.addCase(getProductsHotSales.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });
    // get product hot sales
    builder.addCase(getProductsPhuKien.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsPhuKien.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.productsPhukien = data;
      state.isLoading = state.isError = false;
    });
    builder.addCase(getProductsPhuKien.rejected, (state, action) => {
      state.isLoading = state.isError = true;
    });

  
  },
});

export const { setQueryProduct, resetQueryProduct } = productSlice.actions;
export default productSlice.reducer;
