import httpRequest from "../../api/httpRequest";

export const getProductsAsync = async (url, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const query = {
      ...state.product.query,
    };
    if (state.navSearch.optionChoose.value !== "Tất cả") {
      query[state.navSearch.optionChoose.name] =
        state.navSearch.optionChoose.value;
    }
    const { data } = await httpRequest.get(url, {
      params: query,
    });
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
export const getProductsHotSalesAsync = async (url, thunkAPI) => {
  try {
    const { data } = await httpRequest.get(url);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
export const getProductsPhuKienAsync = async (url, thunkAPI) => {
  try {
    const { data } = await httpRequest.get(url);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.response.data);
  }
};
